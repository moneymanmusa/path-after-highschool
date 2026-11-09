(function () {
  "use strict";

  // ---------- data ----------
  const COURSES = window.COURSES.map(([code, title, grade, subject]) => ({ code, title, grade, subject }));
  const COURSE_BY_CODE = Object.fromEntries(COURSES.map(c => [c.code, c]));
  const UNI_BY_ID = Object.fromEntries(window.UNIVERSITIES.map(u => [u.id, u]));
  const FIELDS = window.FIELDS;
  const PROGRAMS = window.PROGRAMS;
  const PROGRAM_BY_ID = Object.fromEntries(PROGRAMS.map(p => [p.id, p]));
  const COMMUNITY = window.COMMUNITY || {};
  const SUBJECTS = [...new Set(COURSES.map(c => c.subject))];

  const app = document.getElementById("app");
  const STORE_KEY = "pahs.selected";

  // ---------- state ----------
  let selected = new Set(load());
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]").filter(c => COURSE_BY_CODE[c]); }
    catch { return []; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify([...selected])); } catch { /* storage unavailable */ }
  }

  // ---------- helpers ----------
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const courseLabel = code => COURSE_BY_CODE[code] ? `${code} – ${COURSE_BY_CODE[code].title}` : code;

  // Returns { eligible, missing: [descriptions] } for a program and a set of course codes.
  function check(program, have) {
    const missing = [];
    for (const code of program.req) if (!have.has(code)) missing.push(courseLabel(code));
    for (const [need, from] of program.groups) {
      const got = from.filter(c => have.has(c)).length;
      if (got < need) missing.push(`${need - got} more of: ${from.join(", ")}`);
    }
    return { eligible: missing.length === 0, missing };
  }

  function avgText(p) {
    return p.avg ? `${p.avg[0]}–${p.avg[1]}%` : "Not collected yet";
  }

  // ---------- views ----------
  function viewCourses() {
    let q = "", grade = "all", subject = "all";

    app.innerHTML = `
      <section class="hero">
        <h1>Which university programs can you apply to?</h1>
        <p>Search for the Ontario high school courses you've taken or are taking, select them all, then press <strong>Show my programs</strong>.</p>
      </section>
      <section class="picker">
        <div class="controls">
          <input id="q" type="search" placeholder="Search by course code or name, e.g. MHF4U or Biology" autocomplete="off" aria-label="Search courses">
          <select id="grade" aria-label="Grade">
            <option value="all">All grades</option>
            <option value="12">Grade 12</option><option value="11">Grade 11</option>
            <option value="10">Grade 10</option><option value="9">Grade 9</option>
          </select>
          <select id="subject" aria-label="Subject">
            <option value="all">All subjects</option>
            ${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join("")}
          </select>
        </div>
        <div class="hint">Tip: university prerequisites are almost always Grade 12 U or M courses (codes ending in 4U or 4M).</div>
        <div id="list" class="course-list" role="list"></div>
      </section>
      <aside class="tray">
        <div class="tray-head"><strong id="count"></strong> <button id="clear" class="link">Clear all</button></div>
        <div id="chips" class="chips"></div>
        <button id="go" class="primary">Show my programs →</button>
      </aside>`;

    const list = app.querySelector("#list");
    const chips = app.querySelector("#chips");

    function renderList() {
      const term = q.trim().toLowerCase();
      const rows = COURSES.filter(c =>
        (grade === "all" || String(c.grade) === grade) &&
        (subject === "all" || c.subject === subject) &&
        (!term || c.code.toLowerCase().includes(term) || c.title.toLowerCase().includes(term) || c.subject.toLowerCase().includes(term))
      ).sort((a, b) => b.grade - a.grade || a.subject.localeCompare(b.subject) || a.code.localeCompare(b.code));

      list.innerHTML = rows.length ? rows.map(c => `
        <label class="course ${selected.has(c.code) ? "on" : ""}" role="listitem">
          <input type="checkbox" value="${c.code}" ${selected.has(c.code) ? "checked" : ""}>
          <span class="code">${c.code}</span>
          <span class="title">${esc(c.title)}</span>
          <span class="meta">Gr ${c.grade} · ${esc(c.subject)}</span>
        </label>`).join("") : `<p class="empty">No courses match that search.</p>`;
    }

    function renderTray() {
      app.querySelector("#count").textContent = `${selected.size} course${selected.size === 1 ? "" : "s"} selected`;
      chips.innerHTML = [...selected].sort().map(code =>
        `<button class="chip" data-code="${code}" title="Remove ${esc(courseLabel(code))}">${code} ✕</button>`).join("");
      app.querySelector("#go").disabled = selected.size === 0;
    }

    list.addEventListener("change", e => {
      const box = e.target;
      if (box.type !== "checkbox") return;
      box.checked ? selected.add(box.value) : selected.delete(box.value);
      box.closest(".course").classList.toggle("on", box.checked);
      save(); renderTray();
    });
    chips.addEventListener("click", e => {
      const code = e.target.dataset.code;
      if (!code) return;
      selected.delete(code); save(); renderTray(); renderList();
    });
    app.querySelector("#q").addEventListener("input", e => { q = e.target.value; renderList(); });
    app.querySelector("#grade").addEventListener("change", e => { grade = e.target.value; renderList(); });
    app.querySelector("#subject").addEventListener("change", e => { subject = e.target.value; renderList(); });
    app.querySelector("#clear").addEventListener("click", () => { selected.clear(); save(); renderTray(); renderList(); });
    app.querySelector("#go").addEventListener("click", () => { location.hash = "#/results"; });

    renderList(); renderTray();
    app.querySelector("#q").focus();
  }

  function viewResults() {
    if (selected.size === 0) {
      app.innerHTML = `<section class="hero"><h1>No courses selected yet</h1><p><a href="#/">Pick your courses first →</a></p></section>`;
      return;
    }
    const results = PROGRAMS.map(p => ({ p, r: check(p, selected) }));
    const eligible = results.filter(x => x.r.eligible);
    const close = results.filter(x => !x.r.eligible && x.r.missing.length === 1);

    let fieldFilter = "all", uniFilter = "all", q = "", showClose = false;

    app.innerHTML = `
      <section class="hero">
        <h1>You can apply to <span class="big">${eligible.length}</span> program${eligible.length === 1 ? "" : "s"}</h1>
        <p>Based on ${selected.size} selected course${selected.size === 1 ? "" : "s"} · <a href="#/">edit courses</a>.
        Meeting prerequisites means you <em>can apply</em> — admission also depends on your marks and, for some programs, a supplementary application.</p>
      </section>
      <div class="controls">
        <input id="q" type="search" placeholder="Search programs or universities" aria-label="Search programs">
        <select id="field" aria-label="Major / field">
          <option value="all">All majors</option>
          ${Object.entries(FIELDS).map(([k, f]) => `<option value="${k}">${esc(f.name)}</option>`).join("")}
        </select>
        <select id="uni" aria-label="University">
          <option value="all">All universities</option>
          ${window.UNIVERSITIES.map(u => `<option value="${u.id}">${esc(u.name)}</option>`).join("")}
        </select>
        <label class="toggle"><input id="close" type="checkbox"> Also show programs I'm 1 course away from (${close.length})</label>
      </div>
      <div id="out"></div>`;

    const out = app.querySelector("#out");
    function render() {
      const term = q.trim().toLowerCase();
      const pool = showClose ? eligible.concat(close) : eligible;
      const rows = pool.filter(({ p }) =>
        (fieldFilter === "all" || p.field === fieldFilter) &&
        (uniFilter === "all" || p.uni === uniFilter) &&
        (!term || p.name.toLowerCase().includes(term) || UNI_BY_ID[p.uni].name.toLowerCase().includes(term) || FIELDS[p.field].name.toLowerCase().includes(term)));
      if (!rows.length) { out.innerHTML = `<p class="empty">No programs match these filters.</p>`; return; }

      const byField = {};
      for (const row of rows) (byField[row.p.field] ||= []).push(row);
      out.innerHTML = Object.keys(byField).sort((a, b) => FIELDS[a].name.localeCompare(FIELDS[b].name)).map(f => `
        <section class="field-group">
          <h2>${esc(FIELDS[f].name)} <span class="muted">(${byField[f].length})</span></h2>
          <div class="cards">
            ${byField[f].sort((a, b) => UNI_BY_ID[a.p.uni].name.localeCompare(UNI_BY_ID[b.p.uni].name)).map(({ p, r }) => `
              <a class="card ${r.eligible ? "" : "almost"}" href="#/program/${p.id}">
                <span class="uni">${esc(UNI_BY_ID[p.uni].name)}</span>
                <span class="pname">${esc(p.name)}</span>
                <span class="meta">${esc(p.degree)} · Est. average ${avgText(p)}${p.supp ? " · Supplementary app" : ""}</span>
                ${r.eligible ? "" : `<span class="missing">Missing: ${esc(r.missing[0])}</span>`}
              </a>`).join("")}
          </div>
        </section>`).join("");
    }

    app.querySelector("#q").addEventListener("input", e => { q = e.target.value; render(); });
    app.querySelector("#field").addEventListener("change", e => { fieldFilter = e.target.value; render(); });
    app.querySelector("#uni").addEventListener("change", e => { uniFilter = e.target.value; render(); });
    app.querySelector("#close").addEventListener("change", e => { showClose = e.target.checked; render(); });
    render();
  }

  function viewProgram(id) {
    const p = PROGRAM_BY_ID[id];
    if (!p) { app.innerHTML = `<section class="hero"><h1>Program not found</h1><p><a href="#/results">Back to results</a></p></section>`; return; }
    const u = UNI_BY_ID[p.uni];
    const f = FIELDS[p.field];
    const r = check(p, selected);
    const comm = COMMUNITY[p.id] || { averages: [], ecs: [] };
    const redditSearch = "https://www.reddit.com/r/OntarioGrade12s/search/?q=" + encodeURIComponent(`${u.name} ${p.name}`);

    const reqRows = [
      ...p.req.map(code => `<li class="${selected.has(code) ? "ok" : "no"}">${selected.has(code) ? "✓" : "✗"} ${esc(courseLabel(code))}</li>`),
      ...p.groups.map(([need, from]) => {
        const got = from.filter(c => selected.has(c)).length;
        return `<li class="${got >= need ? "ok" : "no"}">${got >= need ? "✓" : "✗"} ${need} of: ${from.map(c => `<span title="${esc(courseLabel(c))}" class="${selected.has(c) ? "have" : ""}">${c}</span>`).join(", ")}</li>`;
      })
    ].join("") || "<li>No specific course prerequisites listed.</li>";

    app.innerHTML = `
      <p><a href="#/results">← Back to my programs</a></p>
      <section class="hero program-hero">
        <span class="uni">${esc(u.name)}</span>
        <h1>${esc(p.name)}</h1>
        <p class="muted">${esc(p.degree)} · ${esc(f.name)} · ${esc(u.city)}</p>
        <p class="status ${r.eligible ? "ok" : "no"}">${r.eligible ? "✓ You have the prerequisite courses for this program." : "✗ You're missing: " + esc(r.missing.join("; "))}</p>
      </section>

      <div class="grid">
        <section class="panel">
          <h2>Admission average</h2>
          <p class="avg">${avgText(p)}</p>
          <p class="small muted">${p.avg ? "Approximate typical range of admitted students' top-6 averages. This is an estimate, not an official cutoff — ranges move every year and competitive programs often admit above it." : "No estimate collected yet for this program."}</p>
          <h3>Student-reported marks</h3>
          ${comm.averages.length ? `<ul class="reports">${comm.averages.map(a => `<li><strong>${esc(a.value)}</strong> ${a.outcome ? "· " + esc(a.outcome) : ""} ${a.year ? "· " + esc(a.year) : ""} · <a href="${esc(a.source)}" target="_blank" rel="noopener">source</a></li>`).join("")}</ul>`
            : `<p class="small">None collected yet. You can browse what students have posted for this program on <a href="${redditSearch}" target="_blank" rel="noopener">r/OntarioGrade12s</a>.</p>`}
          ${p.supp ? `<h3>Supplementary application</h3><p>${esc(p.supp)}</p>` : ""}
        </section>

        <section class="panel">
          <h2>Required high school courses</h2>
          <ul class="reqs">${reqRows}</ul>
          <p class="small muted">Most programs also need six Grade 12 U/M courses in total. <a href="${esc(u.admissions)}" target="_blank" rel="noopener">Confirm on ${esc(u.name)}'s admissions site</a>.</p>
        </section>
      </div>

      <section class="panel">
        <h2>About the program</h2>
        <p>${esc(f.about)}</p>
        ${p.note ? `<p>${esc(p.note)}</p>` : ""}
        <h3>Jobs this can lead to</h3>
        <ul class="tags">${f.jobs.map(j => `<li>${esc(j)}</li>`).join("")}</ul>
      </section>

      <section class="panel">
        <h2>About ${esc(u.name)}</h2>
        <dl class="facts">
          <dt>Location</dt><dd>${esc(u.city)}, ${esc(u.province)}</dd>
          <dt>Setting</dt><dd>${esc(u.setting)}</dd>
          <dt>Size</dt><dd>${esc(u.size)}</dd>
          <dt>Founded</dt><dd>${u.founded}</dd>
        </dl>
        <p>${esc(u.about)}</p>
        <h3>How student-friendly is it?</h3>
        <ul>${u.life.map(l => `<li>${esc(l)}</li>`).join("")}</ul>
        <p class="small"><a href="${esc(u.website)}" target="_blank" rel="noopener">Official website</a></p>
      </section>

      <section class="panel">
        <button id="ecBtn" class="primary" aria-expanded="false" aria-controls="ecs">Best supplementary extracurriculars</button>
        <div id="ecs" hidden>
          <h3>What admitted students listed</h3>
          ${comm.ecs.length ? `<ul class="reports">${comm.ecs.map(e => `<li>${esc(e.text)} ${e.outcome ? "<em>(" + esc(e.outcome) + ")</em>" : ""} · <a href="${esc(e.source)}" target="_blank" rel="noopener">source</a></li>`).join("")}</ul>`
            : `<p class="small">No sourced student examples collected for this program yet. See what students have shared on <a href="${redditSearch}" target="_blank" rel="noopener">r/OntarioGrade12s</a>.</p>`}
          <h3>Extracurriculars that commonly strengthen ${esc(f.name)} applications</h3>
          <ul>${f.ecs.map(e => `<li>${esc(e)}</li>`).join("")}</ul>
          <p class="small muted">Quality beats quantity: a few activities you stuck with, led, or built something in usually count more than a long list. ${p.supp ? "This program has a supplementary application, which is where these activities are reviewed." : ""}</p>
        </div>
      </section>`;

    const btn = app.querySelector("#ecBtn");
    btn.addEventListener("click", () => {
      const box = app.querySelector("#ecs");
      box.hidden = !box.hidden;
      btn.setAttribute("aria-expanded", String(!box.hidden));
    });
  }

  function viewAbout() {
    const uniCount = new Set(PROGRAMS.map(p => p.uni)).size;
    app.innerHTML = `
      <section class="hero"><h1>About the data</h1></section>
      <section class="panel">
        <p>This site currently covers <strong>${PROGRAMS.length} programs</strong> at <strong>${uniCount} Ontario universities</strong> and <strong>${COURSES.length} Ontario high school courses</strong>. Universities in other provinces will be added in later updates.</p>
        <h3>Where it comes from</h3>
        <ul>
          <li><strong>High school courses:</strong> Ontario Ministry of Education course codes.</li>
          <li><strong>Prerequisites:</strong> compiled from university admissions information. Requirements change yearly, so every program page links to the official site.</li>
          <li><strong>Admission averages:</strong> approximate estimates, clearly labelled. They are not official cutoffs.</li>
          <li><strong>Student reports:</strong> marks and extracurriculars shared by students, each with a link to the original post. This section is still being collected.</li>
          <li><strong>Extracurricular ideas:</strong> general guidance for each field, not quotes from specific students.</li>
        </ul>
        <p>Spot a mistake? Open an issue on the project's GitHub repository.</p>
      </section>`;
  }

  // ---------- router ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [page, arg] = h.split("/");
    if (page === "results") viewResults();
    else if (page === "program") viewProgram(decodeURIComponent(arg || ""));
    else if (page === "about") viewAbout();
    else viewCourses();
    document.querySelectorAll(".site-header nav a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#/" + (page || "")));
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
