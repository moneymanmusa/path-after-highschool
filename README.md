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

## Accounts (optional)

Sign-up and login use Firebase Authentication, and saved courses are stored in Firestore. Until `auth-config.js` has a Firebase config, the account pages show a notice and everything else works without an account. Setup steps are in `auth-config.js`. Use these Firestore rules so each student can only read and write their own data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Coverage

- **Wave 1:** Ontario universities and their main undergraduate programs (`universities.js`, `programs.js`).
- **Wave 2:** Main programs at major universities in every other province (`universities-canada.js`, `programs-canada.js`), with requirements shown as the Ontario courses an Ontario applicant needs.
- **Next:** more programs per school, smaller universities, and sourced student-reported data.

## Data sources and honesty rules

- Prerequisites change every year. Every program page links to the university's official admissions site, which is the final authority.
- Admission averages in `programs.js` are **approximate estimates** and are labelled as such on the site.
- Student-reported data goes only in `data/community.js` and **must** include a link to the original post. Nothing is attributed to students without a source.
- Extracurricular ideas in `fields.js` are general guidance, not quotes.

## Security

- Content Security Policy (meta tag plus `vercel.json` headers) limits scripts to this site and the Firebase SDK.
- All data shown on pages is HTML-escaped, and data-driven links only allow `http`/`https`.
- Firestore rules restrict each user to their own document. Users can delete their account and data from the Account page.
