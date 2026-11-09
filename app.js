(function () {
  "use strict";

  // ================= Data =================
  const COURSES = window.COURSES.map(([code, title, grade, subject]) => ({ code, title, grade, subject }));
  const COURSE_BY_CODE = Object.fromEntries(COURSES.map(c => [c.code, c]));
  const UNI_BY_ID = Object.fromEntries(window.UNIVERSITIES.map(u => [u.id, u]));
  const FIELDS = window.FIELDS;
  const PROGRAMS = window.PROGRAMS;
  const PROGRAM_BY_ID = Object.fromEntries(PROGRAMS.map(p => [p.id, p]));
  const COMMUNITY = window.COMMUNITY || {};
  const SUBJECTS = [...new Set(COURSES.map(c => c.subject))].sort();
  const PROVINCES = { ON: "Ontario", BC: "British Columbia", AB: "Alberta", SK: "Saskatchewan", MB: "Manitoba", QC: "Quebec", NB: "New Brunswick", NS: "Nova Scotia", PE: "Prince Edward Island", NL: "Newfoundland and Labrador" };
  const PROVINCES_PRESENT = Object.keys(PROVINCES).filter(k => window.UNIVERSITIES.some(u => u.province === k));
  const UNIS_SORTED = [...window.UNIVERSITIES].sort((a, b) => a.name.localeCompare(b.name));
  // The Grade 12 courses that show up most often as university prerequisites.
  const QUICK_PICKS = ["ENG4U", "MHF4U", "MCV4U", "MDM4U", "SBI4U", "SCH4U", "SPH4U", "ICS4U"];

  const app = document.getElementById("app");
  const Auth = window.Auth;

  // ================= Storage helpers =================
  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ } }
  };

  // ================= Selected courses =================
  let selected = new Set((store.get("pahs.selected", []) || []).filter(c => COURSE_BY_CODE[c]));
  let saveTimer = null;
  function saveSelected() {
    store.set("pahs.selected", [...selected]);
    if (Auth.enabled && Auth.current()) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => Auth.saveCourses([...selected]).catch(() => {}), 600);
    }
  }

  // ================= Theme =================
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("pahs.theme", t); } catch { /* ignore */ }
    syncThemeButtons();
  }
  function syncThemeButtons() {
    const t = document.documentElement.getAttribute("data-theme");
    document.querySelectorAll("[data-theme-btn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.themeBtn === t)));
  }
  document.querySelectorAll("[data-theme-btn]").forEach(b => b.addEventListener("click", () => setTheme(b.dataset.themeBtn)));
  syncThemeButtons();

  // ================= Helpers =================
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const courseLabel = code => COURSE_BY_CODE[code] ? `${code} – ${COURSE_BY_CODE[code].title}` : code;
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

  function check(program, have) {
    const missing = [];
    for (const code of program.req) if (!have.has(code)) missing.push(courseLabel(code));
    for (const [need, from] of program.groups) {
      const got = from.filter(c => have.has(c)).length;
      if (got < need) missing.push(`${need - got} more of: ${from.join(", ")}`);
    }
    return { eligible: missing.length === 0, missing };
  }
  const avgText = p => p.avg ? `${p.avg[0]}–${p.avg[1]}%` : "No estimate yet";
  // Only allow http(s) links in data-driven hrefs (blocks javascript: and similar).
  const safeUrl = url => {
    try { const u = new URL(url); return (u.protocol === "https:" || u.protocol === "http:") ? esc(u.href) : "#"; }
    catch { return "#"; }
  };

  // ================= Views =================
  function viewHome() {
    const uniCount = new Set(PROGRAMS.map(p => p.uni)).size;
    app.innerHTML = `
      <section class="landing-hero">
        <div>
          <span class="eyebrow">Free for Ontario students</span>
          <h1>Find the university programs your courses open up.</h1>
          <p class="lead">Pick the high school courses you're taking. We'll show every program in Canada you can apply to, with typical averages, what each program is like, and tips to strengthen your application.</p>
          <div class="hero-actions">
            <a class="btn primary" href="#/courses">Get started</a>
            <a class="btn" href="#/signup">Create an account</a>
          </div>
        </div>
        ${heroArt()}
      </section>

      <section class="stats" aria-label="What's covered">
        <div class="stat"><strong>${PROGRAMS.length}</strong><span>programs</span></div>
        <div class="stat"><strong>${uniCount}</strong><span>universities</span></div>
        <div class="stat"><strong>${PROVINCES_PRESENT.length}</strong><span>provinces</span></div>
      </section>

      <h2>How it works</h2>
      <section class="steps">
        <div class="step"><div class="num">1</div><h3>Pick your courses</h3><p>Search or tap the common Grade 12 courses you've taken or are taking.</p></div>
        <div class="step"><div class="num">2</div><h3>See your options</h3><p>Get every program you meet the prerequisites for, sorted by major.</p></div>
        <div class="step"><div class="num">3</div><h3>Compare programs</h3><p>Check averages, careers, campus life and extracurricular ideas.</p></div>
      </section>

      <section class="cta">
        <a class="btn primary" href="#/courses">Choose my courses</a>
      </section>`;
  }

  function heroArt() {
    return `
      <svg class="hero-art" viewBox="0 0 400 300" role="img" aria-label="A path leading from a high school to a university">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--accent-soft)"/>
            <stop offset="1" stop-color="var(--surface)"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="300" rx="24" fill="url(#sky)" stroke="var(--border)"/>
        <circle cx="320" cy="62" r="26" fill="var(--accent)" opacity=".18"/>
        <circle cx="70" cy="50" r="3" fill="var(--accent)" opacity=".5"/>
        <circle cx="120" cy="80" r="2" fill="var(--accent)" opacity=".5"/>
        <circle cx="250" cy="40" r="2.5" fill="var(--accent)" opacity=".5"/>
        <path d="M0 230 Q 100 190 200 220 T 400 205 V300 H0z" fill="var(--accent)" opacity=".10"/>
        <path d="M60 268 C 120 250, 110 200, 180 196 S 260 170, 300 130" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 22" opacity=".9"/>
        <!-- high school -->
        <g transform="translate(22 205)">
          <rect x="0" y="22" width="76" height="48" rx="4" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>
          <path d="M-4 24 L38 0 L80 24z" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5" stroke-linejoin="round"/>
          <rect x="30" y="44" width="16" height="26" fill="var(--accent)" opacity=".75"/>
          <rect x="10" y="34" width="12" height="10" fill="var(--accent-soft)" stroke="var(--text)" stroke-width="1.5"/>
          <rect x="54" y="34" width="12" height="10" fill="var(--accent-soft)" stroke="var(--text)" stroke-width="1.5"/>
        </g>
        <!-- university -->
        <g transform="translate(262 60)">
          <path d="M0 40 L54 12 L108 40z" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5" stroke-linejoin="round"/>
          <rect x="4" y="40" width="100" height="8" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>
          <g fill="var(--surface)" stroke="var(--text)" stroke-width="2.5">
            <rect x="12" y="48" width="10" height="40"/><rect x="34" y="48" width="10" height="40"/>
            <rect x="64" y="48" width="10" height="40"/><rect x="86" y="48" width="10" height="40"/>
          </g>
          <rect x="0" y="88" width="108" height="10" rx="2" fill="var(--surface)" stroke="var(--text)" stroke-width="2.5"/>
        </g>
        <!-- grad cap -->
        <g transform="translate(150 150) rotate(-12)">
          <path d="M0 14 L30 0 L60 14 L30 28z" fill="var(--text)"/>
          <path d="M14 20 v10 c0 5 32 5 32 0 v-10 l-16 8z" fill="var(--text)" opacity=".85"/>
          <path d="M56 16 v16" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>
          <circle cx="56" cy="34" r="4" fill="var(--accent)"/>
        </g>
      </svg>`;
  }

  function viewCourses() {
    let q = "", grade = "12", subject = "all";

    app.innerHTML = `
      <section class="page-head">
        <h1>Your courses</h1>
        <p>Select every course you've taken or are taking. University prerequisites are almost always Grade 12 courses ending in 4U or 4M.</p>
      </section>
      <p class="quick-label">Most common prerequisites — tap to add:</p>
      <div class="quick" id="quick"></div>
      <div class="search-row">
        <label class="visually-hidden" for="q">Search courses</label>
        <input id="q" type="search" placeholder="Search, e.g. Biology or SBI4U" autocomplete="off" enterkeyhint="search">
        <div class="filter-row">
          <select id="grade" aria-label="Grade">
            <option value="12">Grade 12</option><option value="11">Grade 11</option>
            <option value="10">Grade 10</option><option value="9">Grade 9</option>
            <option value="all">All grades</option>
          </select>
          <select id="subject" aria-label="Subject">
            <option value="all">All subjects</option>
            ${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div id="list" class="course-list"></div>
      <div class="tray">
        <div class="tray-inner">
          <div class="tray-info">
            <div class="tray-count" id="count"></div>
            <div class="chips" id="chips"></div>
          </div>
          <button id="go" class="btn primary">See programs</button>
        </div>
      </div>`;

    const list = app.querySelector("#list");
    const chips = app.querySelector("#chips");
    const quick = app.querySelector("#quick");

    function renderQuick() {
      quick.innerHTML = QUICK_PICKS.map(code =>
        `<button class="pill" data-code="${code}" aria-pressed="${selected.has(code)}" title="${esc(courseLabel(code))}">${code}</button>`).join("");
    }
    function renderList() {
      const term = q.trim().toLowerCase();
      const rows = COURSES.filter(c =>
        (term ? true : (grade === "all" || String(c.grade) === grade)) &&
        (subject === "all" || c.subject === subject) &&
        (!term || c.code.toLowerCase().includes(term) || c.title.toLowerCase().includes(term) || c.subject.toLowerCase().includes(term))
      ).sort((a, b) => b.grade - a.grade || a.subject.localeCompare(b.subject) || a.code.localeCompare(b.code));

      list.innerHTML = rows.length ? rows.map(c => `
        <label class="course ${selected.has(c.code) ? "on" : ""}">
          <input type="checkbox" value="${c.code}" ${selected.has(c.code) ? "checked" : ""}>
          <span class="txt">
            <span class="title"><span class="code">${c.code}</span> · ${esc(c.title)}</span>
            <span class="meta">Grade ${c.grade} · ${esc(c.subject)}</span>
          </span>
        </label>`).join("") : `<p class="empty">No courses match that search.</p>`;
    }
    function renderTray() {
      app.querySelector("#count").textContent = selected.size ? plural(selected.size, "course") + " selected" : "No courses selected yet";
      chips.innerHTML = [...selected].sort().map(code =>
        `<button class="chip" data-code="${code}" aria-label="Remove ${esc(courseLabel(code))}">${code} ✕</button>`).join("");
      app.querySelector("#go").disabled = selected.size === 0;
    }
    function toggle(code, on) {
      on ? selected.add(code) : selected.delete(code);
      saveSelected(); renderTray(); renderQuick();
    }

    list.addEventListener("change", e => {
      const box = e.target;
      if (box.type !== "checkbox") return;
      box.closest(".course").classList.toggle("on", box.checked);
      toggle(box.value, box.checked);
    });
    quick.addEventListener("click", e => {
      const code = e.target.closest("[data-code]")?.dataset.code;
      if (!code) return;
      toggle(code, !selected.has(code)); renderList();
    });
    chips.addEventListener("click", e => {
      const code = e.target.closest("[data-code]")?.dataset.code;
      if (!code) return;
      toggle(code, false); renderList();
    });
    app.querySelector("#q").addEventListener("input", e => { q = e.target.value; renderList(); });
    app.querySelector("#grade").addEventListener("change", e => { grade = e.target.value; renderList(); });
    app.querySelector("#subject").addEventListener("change", e => { subject = e.target.value; renderList(); });
    app.querySelector("#go").addEventListener("click", () => { location.hash = "#/results"; });

    renderQuick(); renderList(); renderTray();
  }

  function viewResults() {
    if (selected.size === 0) {
      app.innerHTML = `
        <section class="page-head">
          <h1>No courses yet</h1>
          <p>Pick your courses first and we'll show which programs you can apply to.</p>
          <a class="btn primary" href="#/courses">Choose my courses</a>
        </section>`;
      return;
    }
    const results = PROGRAMS.map(p => ({ p, r: check(p, selected) }));
    const eligible = results.filter(x => x.r.eligible);
    const close = results.filter(x => !x.r.eligible && x.r.missing.length === 1);
    let fieldFilter = "all", uniFilter = "all", provFilter = "all", q = "", showClose = false;

    app.innerHTML = `
      <section class="page-head">
        <h1>You can apply to ${plural(eligible.length, "program")}</h1>
        <p>Based on ${plural(selected.size, "course")} · <a href="#/courses">Edit courses</a></p>
      </section>
      <div class="results-bar">
        <label class="visually-hidden" for="q">Search programs</label>
        <input id="q" type="search" placeholder="Search programs or schools" enterkeyhint="search">
      </div>
      <details class="filters">
        <summary class="btn">Filters</summary>
        <div class="filter-grid">
          <select id="field" aria-label="Major">
            <option value="all">All majors</option>
            ${Object.entries(FIELDS).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([k, f]) => `<option value="${k}">${esc(f.name)}</option>`).join("")}
          </select>
          <select id="prov" aria-label="Province">
            <option value="all">All provinces</option>
            ${PROVINCES_PRESENT.map(k => `<option value="${k}">${esc(PROVINCES[k])}</option>`).join("")}
          </select>
          <select id="uni" aria-label="University">
            <option value="all">All universities</option>
            ${UNIS_SORTED.map(u => `<option value="${u.id}">${esc(u.name)}</option>`).join("")}
          </select>
        </div>
        <label class="toggle"><input id="close" type="checkbox"> Also show programs I'm one course away from (${close.length})</label>
      </details>
      <p class="small muted">Having the courses means you can apply. Getting in also depends on your marks and, for some programs, a supplementary application.</p>
      <div id="out"></div>`;

    const out = app.querySelector("#out");
    function render() {
      const term = q.trim().toLowerCase();
      const pool = showClose ? eligible.concat(close) : eligible;
      const rows = pool.filter(({ p }) => {
        const u = UNI_BY_ID[p.uni];
        return (fieldFilter === "all" || p.field === fieldFilter) &&
          (uniFilter === "all" || p.uni === uniFilter) &&
          (provFilter === "all" || u.province === provFilter) &&
          (!term || p.name.toLowerCase().includes(term) || u.name.toLowerCase().includes(term) || FIELDS[p.field].name.toLowerCase().includes(term));
      });
      if (!rows.length) { out.innerHTML = `<p class="empty">No programs match these filters.</p>`; return; }

      const byField = {};
      for (const row of rows) (byField[row.p.field] ||= []).push(row);
      out.innerHTML = Object.keys(byField).sort((a, b) => FIELDS[a].name.localeCompare(FIELDS[b].name)).map(f => `
        <section class="field-group">
          <h2>${esc(FIELDS[f].name)} <span class="small muted">${byField[f].length}</span></h2>
          <div class="cards">
            ${byField[f].sort((a, b) => UNI_BY_ID[a.p.uni].name.localeCompare(UNI_BY_ID[b.p.uni].name)).map(({ p, r }) => `
              <a class="card ${r.eligible ? "" : "almost"}" href="#/program/${p.id}">
                <span class="uni">${esc(UNI_BY_ID[p.uni].name)} · ${UNI_BY_ID[p.uni].province}</span>
                <span class="pname">${esc(p.name)}</span>
                <span class="meta">${esc(p.degree)} · ${p.avg ? "Avg. est. " + avgText(p) : "No average estimate yet"}</span>
                ${p.supp ? `<span><span class="badge">Extra application</span></span>` : ""}
                ${r.eligible ? "" : `<span class="missing">Missing: ${esc(r.missing[0])}</span>`}
              </a>`).join("")}
          </div>
        </section>`).join("");
    }

    app.querySelector("#q").addEventListener("input", e => { q = e.target.value; render(); });
    app.querySelector("#field").addEventListener("change", e => { fieldFilter = e.target.value; render(); });
    app.querySelector("#uni").addEventListener("change", e => { uniFilter = e.target.value; render(); });
    app.querySelector("#prov").addEventListener("change", e => { provFilter = e.target.value; render(); });
    app.querySelector("#close").addEventListener("change", e => { showClose = e.target.checked; render(); });
    render();
  }

  function viewProgram(id) {
    const p = PROGRAM_BY_ID[id];
    if (!p) { app.innerHTML = `<section class="page-head"><h1>Program not found</h1><a href="#/results">Back to my programs</a></section>`; return; }
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
      <a class="back" href="#/results">← My programs</a>
      <section class="page-head program-head">
        <div class="uni">${esc(u.name)} · ${esc(u.city)}</div>
        <h1>${esc(p.name)}</h1>
        <p class="muted">${esc(p.degree)} · ${esc(f.name)}</p>
        <div class="status ${r.eligible ? "ok" : "no"}">${r.eligible ? "✓ You have the required courses" : "✗ Missing: " + esc(r.missing.join("; "))}</div>
      </section>

      <div class="grid">
        <section class="panel">
          <h2>Admission average</h2>
          <p class="avg">${avgText(p)}</p>
          <p class="small muted">${p.avg ? "Estimated typical top-6 average of admitted students. Not an official cutoff — it changes every year." : "We don't have an estimate for this program yet."}</p>
          <h3>Marks reported by students</h3>
          ${comm.averages.length ? `<ul>${comm.averages.map(a => `<li><strong>${esc(a.value)}</strong>${a.outcome ? " · " + esc(a.outcome) : ""}${a.year ? " · " + esc(a.year) : ""} · <a href="${safeUrl(a.source)}" target="_blank" rel="noopener noreferrer">source</a></li>`).join("")}</ul>`
            : `<p class="small">None collected yet. See what students posted on <a href="${redditSearch}" target="_blank" rel="noopener noreferrer">r/OntarioGrade12s</a>.</p>`}
          ${p.supp ? `<h3>Extra application</h3><p>${esc(p.supp)}</p>` : ""}
        </section>
        <section class="panel">
          <h2>Required courses</h2>
          <ul class="reqs">${reqRows}</ul>
          <p class="small muted mt">You'll also need six Grade 12 U/M courses in total. <a href="${safeUrl(u.admissions)}" target="_blank" rel="noopener noreferrer">Confirm on the official site</a>.</p>
        </section>
      </div>

      <section class="panel">
        <h2>About this program</h2>
        <p>${esc(f.about)}</p>
        ${p.note ? `<p>${esc(p.note)}</p>` : ""}
        <h3>Where it can lead</h3>
        <ul class="tags">${f.jobs.map(j => `<li>${esc(j)}</li>`).join("")}</ul>
      </section>

      <section class="panel">
        <h2>About ${esc(u.name)}</h2>
        <dl class="facts">
          <dt>Location</dt><dd>${esc(u.city)}, ${esc(PROVINCES[u.province] || u.province)}</dd>
          <dt>Setting</dt><dd>${esc(u.setting)}</dd>
          <dt>Size</dt><dd>${esc(u.size)}</dd>
          <dt>Founded</dt><dd>${u.founded}</dd>
        </dl>
        <p>${esc(u.about)}</p>
        <h3>Student life</h3>
        <ul>${u.life.map(l => `<li>${esc(l)}</li>`).join("")}</ul>
        <p class="small mt"><a href="${safeUrl(u.website)}" target="_blank" rel="noopener noreferrer">Visit the official website</a></p>
      </section>

      <section class="panel">
        <button id="ecBtn" class="btn primary block" aria-expanded="false" aria-controls="ecs">Best supplementary extracurriculars</button>
        <div id="ecs" hidden>
          <h3>What admitted students listed</h3>
          ${comm.ecs.length ? `<ul>${comm.ecs.map(e => `<li>${esc(e.text)}${e.outcome ? " <em>(" + esc(e.outcome) + ")</em>" : ""} · <a href="${safeUrl(e.source)}" target="_blank" rel="noopener noreferrer">source</a></li>`).join("")}</ul>`
            : `<p class="small">No student examples collected for this program yet. See what students shared on <a href="${redditSearch}" target="_blank" rel="noopener noreferrer">r/OntarioGrade12s</a>.</p>`}
          <h3>Ideas that help ${esc(f.name)} applications</h3>
          <ul>${f.ecs.map(e => `<li>${esc(e)}</li>`).join("")}</ul>
          <p class="small muted mt">A few activities you stuck with, led, or built something in usually count more than a long list.${p.supp ? " This program has an extra application, which is where these activities are reviewed." : ""}</p>
        </div>
      </section>`;

    const btn = app.querySelector("#ecBtn");
    btn.addEventListener("click", () => {
      const box = app.querySelector("#ecs");
      box.hidden = !box.hidden;
      btn.setAttribute("aria-expanded", String(!box.hidden));
    });
  }

  // ---------- Auth views ----------
  const notEnabled = `<div class="notice">Accounts aren't switched on yet. You can still use everything — your courses are saved on this device.</div>`;

  function authForm(kind) {
    const isSignup = kind === "signup";
    app.innerHTML = `
      <div class="auth-wrap">
        <form class="auth-card" id="authForm" novalidate>
          <h1>${isSignup ? "Create your account" : "Welcome back"}</h1>
          <p class="muted">${isSignup ? "Save your courses and see them on any device." : "Log in to see your saved courses."}</p>
          ${Auth.enabled ? "" : notEnabled}
          ${isSignup ? `<div class="field"><label for="name">First name</label><input id="name" type="text" autocomplete="given-name" required></div>` : ""}
          <div class="field"><label for="email">Email</label><input id="email" type="email" autocomplete="email" inputmode="email" required></div>
          <div class="field"><label for="pw">Password</label><input id="pw" type="password" autocomplete="${isSignup ? "new-password" : "current-password"}" minlength="6" required>
            ${isSignup ? `<span class="small muted">At least 6 characters.</span>` : ""}</div>
          ${isSignup ? `<label class="check"><input type="checkbox" id="agree" required> <span>I agree to the <a href="#/terms" target="_blank">Terms</a> and <a href="#/privacy" target="_blank">Privacy Policy</a>, and I'm 13 or older (or have a parent's permission).</span></label>` : ""}
          <p class="error" id="err" role="alert"></p>
          <button class="btn primary block" type="submit" ${Auth.enabled ? "" : "disabled"}>${isSignup ? "Sign up" : "Log in"}</button>
          ${isSignup ? "" : `<p class="switch-auth"><button type="button" class="link-btn" id="forgot" ${Auth.enabled ? "" : "disabled"}>Forgot password?</button></p>`}
          <p class="switch-auth">${isSignup ? `Already have an account? <a href="#/login">Log in</a>` : `New here? <a href="#/signup">Create an account</a>`}</p>
        </form>
      </div>`;

    const form = app.querySelector("#authForm");
    const err = app.querySelector("#err");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      err.textContent = "";
      const email = form.querySelector("#email").value.trim();
      const pw = form.querySelector("#pw").value;
      if (!email || !pw) { err.textContent = "Please fill in your email and password."; return; }
      if (isSignup && !form.querySelector("#agree").checked) { err.textContent = "Please agree to the Terms and Privacy Policy to continue."; return; }
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      try {
        if (isSignup) await Auth.signUp(form.querySelector("#name").value.trim(), email, pw);
        else await Auth.logIn(email, pw);
        await syncFromCloud();
        location.hash = "#/account";
      } catch (ex) {
        err.textContent = Auth.friendly(ex);
        btn.disabled = false;
      }
    });
    const forgot = app.querySelector("#forgot");
    if (forgot) forgot.addEventListener("click", async () => {
      const email = form.querySelector("#email").value.trim();
      if (!email) { err.textContent = "Type your email above first."; return; }
      try { await Auth.resetPassword(email); err.textContent = "Check your email for a reset link."; }
      catch (ex) { err.textContent = Auth.friendly(ex); }
    });
  }

  function viewAccount() {
    const user = Auth.enabled && Auth.current();
    if (!user) { authForm("login"); return; }
    app.innerHTML = `
      <div class="auth-wrap">
        <div class="auth-card">
          <h1>Hi${user.displayName ? ", " + esc(user.displayName) : ""}</h1>
          <p class="muted">${esc(user.email)}</p>
          <p>Your ${plural(selected.size, "course")} are saved to your account.</p>
          <a class="btn primary block" href="#/results">See my programs</a>
          <p class="switch-auth"><button class="link-btn" id="logout">Log out</button></p>
          <p class="switch-auth"><button class="link-btn danger" id="delete">Delete my account and data</button></p>
          <p class="error" id="err" role="alert"></p>
        </div>
      </div>`;
    app.querySelector("#logout").addEventListener("click", async () => { await Auth.logOut(); location.hash = "#/login"; });
    const del = app.querySelector("#delete");
    del.addEventListener("click", async () => {
      const err = app.querySelector("#err");
      if (del.dataset.confirm !== "1") {
        del.dataset.confirm = "1";
        del.textContent = "Tap again to permanently delete your account";
        return;
      }
      try {
        await Auth.deleteAccount();
        location.hash = "#/";
      } catch (ex) {
        err.textContent = ex && ex.code === "auth/requires-recent-login"
          ? "For your security, log out, log back in, then try again."
          : Auth.friendly(ex);
      }
    });
  }

  async function syncFromCloud() {
    if (!Auth.enabled || !Auth.current()) return;
    try {
      const cloud = await Auth.loadCourses();
      if (cloud) cloud.filter(c => COURSE_BY_CODE[c]).forEach(c => selected.add(c));
      saveSelected();
    } catch { /* offline or rules not set; keep local copy */ }
  }

  function viewAbout() {
    const uniCount = new Set(PROGRAMS.map(p => p.uni)).size;
    app.innerHTML = `
      <section class="page-head"><h1>About the data</h1></section>
      <section class="panel">
        <p>This site covers <strong>${PROGRAMS.length} programs</strong> at <strong>${uniCount} universities</strong> in ${PROVINCES_PRESENT.length} provinces, and <strong>${COURSES.length} Ontario high school courses</strong>. It focuses on the main programs at each school.</p>
        <h3>Where it comes from</h3>
        <ul>
          <li><strong>Courses:</strong> Ontario Ministry of Education course codes.</li>
          <li><strong>Prerequisites:</strong> compiled from university admissions information and shown as Ontario courses. Every program page links to the official site.</li>
          <li><strong>Averages:</strong> approximate estimates, not official cutoffs.</li>
          <li><strong>Student reports:</strong> only shown with a link to the original post.</li>
          <li><strong>Extracurricular ideas:</strong> general guidance for each field.</li>
        </ul>
      </section>`;
  }

  function viewTerms() {
    app.innerHTML = `
      <section class="page-head"><h1>Terms of use &amp; disclaimer</h1><p>Last updated: November 2026</p></section>
      <section class="panel legal">
        <h2>Information only, not advice</h2>
        <p>Path After High School is a free planning tool. Everything on this site is general information to help you explore options. It is not academic, admissions, career or professional advice, and it is not a guarantee of admission to any program.</p>
        <h2>Accuracy</h2>
        <p>Admission requirements, prerequisites, averages, deadlines and program offerings change every year and can differ by applicant. We try to keep information accurate but make no promises that it is complete, current or error-free. Admission averages shown are estimates, not official cutoffs. <strong>Always confirm details on each university's official website and with your guidance counsellor before making decisions or applying.</strong></p>
        <h2>No affiliation</h2>
        <p>This site is independent. It is not affiliated with, endorsed by or sponsored by any university, college, the Ontario Universities' Application Centre (OUAC), the Ontario Ministry of Education, Reddit or any other organization mentioned. University names and course codes are used only to identify them. All trademarks belong to their respective owners.</p>
        <h2>Links to other sites</h2>
        <p>We link to official university websites and public discussion forums for convenience. We don't control those sites and aren't responsible for their content.</p>
        <h2>Accounts</h2>
        <p>Accounts are optional. You must be 13 or older to create one, or have permission from a parent or guardian. Keep your password private. Don't misuse the site, try to access other people's data, or interfere with how it works. We may remove accounts that break these terms.</p>
        <h2>Limitation of liability</h2>
        <p>The site is provided "as is", without warranties of any kind. To the fullest extent allowed by law, the site's operators are not liable for any decisions made or losses arising from use of the site or reliance on its information.</p>
        <h2>Changes</h2>
        <p>We may update these terms. Continuing to use the site after an update means you accept the new terms.</p>
      </section>`;
  }

  function viewPrivacy() {
    app.innerHTML = `
      <section class="page-head"><h1>Privacy policy</h1><p>Last updated: November 2026</p></section>
      <section class="panel legal">
        <h2>Short version</h2>
        <p>You can use the whole site without an account. If you make one, we store only what's needed to save your courses. We don't sell your data, show ads or use tracking analytics.</p>
        <h2>What we store</h2>
        <ul>
          <li><strong>Without an account:</strong> your selected courses and theme choice are saved in your own browser (local storage). They never leave your device.</li>
          <li><strong>With an account:</strong> your email address, the first name you enter, and your selected courses.</li>
        </ul>
        <h2>Where it's stored</h2>
        <p>Accounts and saved courses are stored with Google Firebase (Authentication and Cloud Firestore), which may process data outside Canada. Security rules mean only you can read or change your saved courses. The site is hosted by a web hosting provider that may keep standard technical logs (such as IP addresses) for security.</p>
        <h2>How we use it</h2>
        <p>Only to let you log in, save your courses, and send account emails you request (such as a password reset). We don't share it with anyone else except as required by law.</p>
        <h2>Your choices</h2>
        <ul>
          <li>Delete your account and saved data any time from the Account page ("Delete my account and data").</li>
          <li>Clear the data saved in your browser by clearing this site's data in your browser settings.</li>
        </ul>
        <h2>Children</h2>
        <p>Accounts are for people 13 and older, or younger students with a parent or guardian's permission.</p>
        <h2>Changes</h2>
        <p>If we change this policy, we'll update the date at the top of this page.</p>
      </section>`;
  }

  // ================= Router =================
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [page, arg] = h.split("/");
    if (page === "courses") viewCourses();
    else if (page === "results") viewResults();
    else if (page === "program") viewProgram(decodeURIComponent(arg || ""));
    else if (page === "about") viewAbout();
    else if (page === "terms") viewTerms();
    else if (page === "privacy") viewPrivacy();
    else if (page === "signup") (Auth.enabled && Auth.current()) ? viewAccount() : authForm("signup");
    else if (page === "login" || page === "account") viewAccount();
    else viewHome();

    const active = page === "program" ? "results" : (page === "signup" || page === "account") ? "login" : (page || "");
    document.querySelectorAll("[data-route]").forEach(a => a.classList.toggle("active", a.dataset.route === active));
    const loggedIn = Auth.enabled && Auth.current();
    document.querySelectorAll('.top-nav [data-route="login"]').forEach(a => { a.textContent = loggedIn ? "Account" : "Log in"; });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  Auth.ready.then(syncFromCloud).catch(() => {}).finally(route);
  if (Auth.enabled) Auth.onChange(() => route());
  route();
})();
