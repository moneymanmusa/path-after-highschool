# Path After High School

A free website for confused Ontario high school students: pick the courses you've taken, and see every university program you can apply to, grouped by major. Click a program for details on the university, the program, the jobs it leads to, typical admission averages, and extracurricular ideas.

## Run it

It's a plain static site with no build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Project layout

| Path | What it holds |
| --- | --- |
| `data/courses.js` | Ontario secondary course catalogue (Ministry course codes) |
| `data/universities.js` | University profiles (location, size, student life) |
| `data/programs.js` | Programs and their high school prerequisites, plus estimated admission ranges |
| `data/fields.js` | Field/major descriptions, career paths and general extracurricular ideas |
| `data/community.js` | Student-reported marks and extracurriculars, each with a source link |
| `app.js`, `styles.css`, `index.html` | The website |

## Coverage

- **Wave 1 (current):** Ontario universities and their main undergraduate programs.
- **Next waves:** British Columbia, Alberta, Quebec, the Prairies and Atlantic Canada, then niche programs.

## Data sources and honesty rules

- Prerequisites change every year. Every program page links to the university's official admissions site, which is the final authority.
- Admission averages in `programs.js` are **approximate estimates** and are labelled as such on the site.
- Student-reported data goes only in `data/community.js` and **must** include a link to the original post. Nothing is attributed to students without a source.
- Extracurricular ideas in `fields.js` are general guidance, not quotes.

Found an error? Open an issue.
