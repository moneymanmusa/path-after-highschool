// Wave 2: universities outside Ontario. Same shape as data/universities.js.
// Enrolment figures are approximate and rounded.
window.UNIVERSITIES.push(
  // ---------------- British Columbia ----------------
  {
    id: "ubc", name: "University of British Columbia", province: "BC",
    city: "Vancouver (also Kelowna – UBC Okanagan)", founded: 1908, size: "~60,000 undergrads across two campuses",
    setting: "Big city — huge campus on a forested peninsula by the ocean",
    about: "One of Canada's top three research universities, known for science, engineering, forestry, the Sauder School of Business and a stunning oceanside campus. UBC Okanagan in Kelowna is a smaller campus with its own programs.",
    life: ["Massive campus with beaches, forest trails and its own neighbourhood", "Holistic admissions: every applicant writes Personal Profile responses", "Large first-year courses; community comes from residence and clubs", "Vancouver is one of the most expensive cities in Canada for housing", "First-year residence is guaranteed for eligible students who apply by the deadline"],
    website: "https://www.ubc.ca", admissions: "https://you.ubc.ca"
  },
  {
    id: "sfu", name: "Simon Fraser University", province: "BC",
    city: "Burnaby (also Vancouver and Surrey)", founded: 1965, size: "~30,000 undergrads",
    setting: "Suburban mountaintop campus in Metro Vancouver",
    about: "A comprehensive university known for computing science, communication, criminology, business (Beedie) and one of the largest co-op programs in Western Canada.",
    life: ["Trimester system — you can study year-round", "Strong co-op program across most faculties", "Burnaby Mountain campus is foggy and quiet; Surrey and Vancouver campuses are urban", "Mostly commuter culture"],
    website: "https://www.sfu.ca", admissions: "https://www.sfu.ca/students/admission.html"
  },
  {
    id: "uvic", name: "University of Victoria", province: "BC",
    city: "Victoria", founded: 1963, size: "~18,000 undergrads",
    setting: "Mid-size coastal capital city",
    about: "Known for ocean and earth sciences, engineering and computer science co-op, law, and a relaxed West Coast campus.",
    life: ["Mild climate and outdoor lifestyle", "Co-op available in many programs", "Mid-size campus with a friendly, laid-back feel", "Housing in Victoria can be tight"],
    website: "https://www.uvic.ca", admissions: "https://www.uvic.ca/admissions"
  },
  {
    id: "unbc", name: "University of Northern British Columbia", province: "BC",
    city: "Prince George", founded: 1990, size: "~3,000 undergrads",
    setting: "Small northern city",
    about: "A small research university focused on environmental science, natural resources, nursing, First Nations studies and northern communities.",
    life: ["Very small classes", "Outdoor access and wilderness research", "Strong ties with northern and Indigenous communities"],
    website: "https://www.unbc.ca", admissions: "https://www.unbc.ca/apply"
  },
  // ---------------- Alberta ----------------
  {
    id: "ualberta", name: "University of Alberta", province: "AB",
    city: "Edmonton", founded: 1908, size: "~33,000 undergrads",
    setting: "Big city, large riverside campus",
    about: "A top-five Canadian research university known for engineering, medicine, AI research (Amii), agriculture and life sciences.",
    life: ["Large campus connected by LRT", "Lower tuition and cost of living than Toronto or Vancouver", "Big-school feel with lots of clubs and research jobs", "Cold winters; pedways connect many buildings"],
    website: "https://www.ualberta.ca", admissions: "https://www.ualberta.ca/admissions"
  },
  {
    id: "ucalgary", name: "University of Calgary", province: "AB",
    city: "Calgary", founded: 1966, size: "~28,000 undergrads",
    setting: "Big city, suburban campus near the Rockies",
    about: "Known for engineering (especially energy), the Haskayne School of Business, kinesiology and health sciences, with quick access to the Rocky Mountains.",
    life: ["Close to Banff and outdoor recreation", "Large, modern campus on the C-Train line", "Strong energy and engineering industry ties", "Lower cost of living than Toronto or Vancouver"],
    website: "https://www.ucalgary.ca", admissions: "https://www.ucalgary.ca/future-students"
  },
  {
    id: "macewan", name: "MacEwan University", province: "AB",
    city: "Edmonton (downtown)", founded: 1971, size: "~18,000 students",
    setting: "Downtown city campus",
    about: "A teaching-focused undergraduate university with small classes, known for nursing, business, arts and communication programs.",
    life: ["Small classes taught by professors, not TAs", "Downtown location near the arena district", "Mostly commuter students"],
    website: "https://www.macewan.ca", admissions: "https://www.macewan.ca/admissions"
  },
  {
    id: "mru", name: "Mount Royal University", province: "AB",
    city: "Calgary", founded: 1910, size: "~13,000 students",
    setting: "Suburban city campus",
    about: "An undergraduate-focused university known for nursing, business, journalism, child studies and small classes.",
    life: ["Small class sizes and approachable instructors", "Practical, career-focused programs", "Close to the mountains"],
    website: "https://www.mtroyal.ca", admissions: "https://www.mtroyal.ca/admission"
  },
  {
    id: "uleth", name: "University of Lethbridge", province: "AB",
    city: "Lethbridge", founded: 1967, size: "~8,000 students",
    setting: "Small prairie city, campus on the coulees",
    about: "A liberal-education university known for neuroscience, education, management and fine arts.",
    life: ["Small and friendly", "Low cost of living", "Distinctive architecture on the river valley"],
    website: "https://www.ulethbridge.ca", admissions: "https://www.ulethbridge.ca/future-student"
  },
  // ---------------- Saskatchewan ----------------
  {
    id: "usask", name: "University of Saskatchewan", province: "SK",
    city: "Saskatoon", founded: 1907, size: "~22,000 undergrads",
    setting: "Mid-size city, riverside campus",
    about: "A research university known for agriculture, veterinary medicine (WCVM), engineering, nursing and the Canadian Light Source synchrotron.",
    life: ["Beautiful riverside campus", "Low cost of living", "Strong Indigenous student community and supports"],
    website: "https://www.usask.ca", admissions: "https://admissions.usask.ca"
  },
  {
    id: "uregina", name: "University of Regina", province: "SK",
    city: "Regina", founded: 1974, size: "~15,000 students",
    setting: "Capital city, campus by Wascana Lake",
    about: "Known for co-op programs, engineering, business, social work and journalism; home to the First Nations University of Canada federated college.",
    life: ["Co-op across many programs", "Small-city affordability", "Federated colleges create smaller communities"],
    website: "https://www.uregina.ca", admissions: "https://www.uregina.ca/admissions"
  },
  // ---------------- Manitoba ----------------
  {
    id: "umanitoba", name: "University of Manitoba", province: "MB",
    city: "Winnipeg", founded: 1877, size: "~25,000 undergrads",
    setting: "Big city, suburban riverside campus",
    about: "Western Canada's first university, known for agriculture, engineering, nursing, the Asper School of Business and health sciences.",
    life: ["Low tuition and cost of living", "Many students start in University 1, a flexible first year", "Tunnels connect campus buildings for the winter"],
    website: "https://umanitoba.ca", admissions: "https://umanitoba.ca/admissions"
  },
  {
    id: "uwinnipeg", name: "University of Winnipeg", province: "MB",
    city: "Winnipeg (downtown)", founded: 1967, size: "~9,000 students",
    setting: "Downtown city campus",
    about: "A smaller downtown university known for environmental studies, kinesiology, education and a strong focus on Indigenous inclusion.",
    life: ["Small classes", "Downtown location", "Indigenous course requirement for all students"],
    website: "https://www.uwinnipeg.ca", admissions: "https://www.uwinnipeg.ca/future-student"
  },
  // ---------------- Quebec ----------------
  {
    id: "mcgill", name: "McGill University", province: "QC",
    city: "Montreal", founded: 1821, size: "~27,000 undergrads",
    setting: "Downtown Montreal at the foot of Mount Royal",
    about: "One of Canada's most famous universities, English-language, known for medicine, science, engineering, law, arts and the Desautels Faculty of Management. Admission for Ontario students is mostly based on top-6 averages.",
    life: ["Downtown Montreal campus with a big international community", "Montreal is affordable for a major city and very lively", "Students mostly live off campus after first year", "Academically demanding with a self-directed culture", "Out-of-province students pay higher tuition than Quebec residents"],
    website: "https://www.mcgill.ca", admissions: "https://www.mcgill.ca/undergraduate-admissions"
  },
  {
    id: "concordia", name: "Concordia University", province: "QC",
    city: "Montreal", founded: 1974, size: "~38,000 undergrads",
    setting: "Downtown Montreal (plus Loyola campus in NDG)",
    about: "A large English-language university known for fine arts, film, engineering and computer science (Gina Cody School), and the John Molson School of Business.",
    life: ["Urban campus with metro access", "Very strong arts, film and design scene", "Co-op available in many programs", "Out-of-province tuition applies"],
    website: "https://www.concordia.ca", admissions: "https://www.concordia.ca/admissions"
  },
  {
    id: "bishops", name: "Bishop's University", province: "QC",
    city: "Sherbrooke (Lennoxville)", founded: 1843, size: "~3,000 students",
    setting: "Small town in Quebec's Eastern Townships",
    about: "A small English-language liberal arts university with tiny classes, a close-knit residential campus and strong business and education programs.",
    life: ["Very small classes and a tight community", "Most students live on or near campus", "Strong school spirit around Gaiters sports"],
    website: "https://www.ubishops.ca", admissions: "https://www.ubishops.ca/future-students"
  },
  {
    id: "ulaval", name: "Université Laval", province: "QC",
    city: "Quebec City", founded: 1852, size: "~30,000 undergrads",
    setting: "Big city, large suburban campus",
    about: "The oldest French-language university in North America, offering programs in almost every field. Teaching is in French.",
    life: ["Fully French-language environment", "Large campus connected by underground tunnels", "Quebec City is historic and affordable"],
    website: "https://www.ulaval.ca", admissions: "https://www.ulaval.ca/admission"
  },
  {
    id: "umontreal", name: "Université de Montréal", province: "QC",
    city: "Montreal", founded: 1878, size: "~35,000 undergrads",
    setting: "Big city, campus on Mount Royal",
    about: "A major French-language research university with affiliated schools Polytechnique Montréal (engineering) and HEC Montréal (business).",
    life: ["Teaching in French", "Large research university in a bilingual city", "Out-of-province tuition applies"],
    website: "https://www.umontreal.ca", admissions: "https://admission.umontreal.ca"
  },
  // ---------------- New Brunswick ----------------
  {
    id: "unb", name: "University of New Brunswick", province: "NB",
    city: "Fredericton (also Saint John)", founded: 1785, size: "~8,000 students",
    setting: "Small capital city, hillside campus",
    about: "One of North America's oldest public universities, known for engineering, computer science, forestry, nursing and cybersecurity research.",
    life: ["Small city with an easy-going pace", "Low cost of living", "Smaller classes than big-city schools"],
    website: "https://www.unb.ca", admissions: "https://www.unb.ca/admissions"
  },
  {
    id: "mta", name: "Mount Allison University", province: "NB",
    city: "Sackville", founded: 1839, size: "~2,300 students",
    setting: "Small town",
    about: "A small, highly rated undergraduate liberal arts and sciences university known for small classes and close mentoring.",
    life: ["Very small classes; professors know your name", "Most students live on campus", "Quiet small-town life"],
    website: "https://mta.ca", admissions: "https://mta.ca/future-students"
  },
  {
    id: "umoncton", name: "Université de Moncton", province: "NB",
    city: "Moncton (also Edmundston and Shippagan)", founded: 1963, size: "~4,000 students",
    setting: "Mid-size bilingual city",
    about: "The largest French-language university in Canada outside Quebec, serving Acadian communities. Teaching is in French.",
    life: ["French-language studies in a bilingual city", "Small classes", "Strong Acadian culture"],
    website: "https://www.umoncton.ca", admissions: "https://www.umoncton.ca/futursetudiants"
  },
  // ---------------- Nova Scotia ----------------
  {
    id: "dal", name: "Dalhousie University", province: "NS",
    city: "Halifax", founded: 1818, size: "~16,000 undergrads",
    setting: "Small coastal city, urban campus",
    about: "Atlantic Canada's largest research university, known for ocean sciences, health professions, engineering, computer science and law.",
    life: ["Halifax is a lively, walkable university city", "Large student population across several local universities", "Co-op available in engineering, CS and management", "Housing in Halifax has become tight"],
    website: "https://www.dal.ca", admissions: "https://www.dal.ca/admissions.html"
  },
  {
    id: "acadia", name: "Acadia University", province: "NS",
    city: "Wolfville", founded: 1838, size: "~3,500 students",
    setting: "Small town in the Annapolis Valley",
    about: "A small, residential undergraduate university known for small classes, kinesiology, business, biology and environmental science.",
    life: ["Close-knit residential campus", "Small classes", "Beautiful small-town setting"],
    website: "https://www2.acadiau.ca", admissions: "https://www2.acadiau.ca/future-students.html"
  },
  {
    id: "stfx", name: "St. Francis Xavier University", province: "NS",
    city: "Antigonish", founded: 1853, size: "~4,000 students",
    setting: "Small town",
    about: "A small undergraduate university famous for its tight-knit community, the X-Ring, and strong business, nursing and science programs.",
    life: ["Very strong school spirit and alumni network", "Most students live on campus", "Small classes"],
    website: "https://www.stfx.ca", admissions: "https://www.stfx.ca/admissions"
  },
  {
    id: "smu", name: "Saint Mary's University", province: "NS",
    city: "Halifax", founded: 1802, size: "~6,000 students",
    setting: "Small coastal city, compact campus",
    about: "Known for the Sobey School of Business, astronomy and a diverse international student body.",
    life: ["Compact campus in Halifax's south end", "Small classes", "Large international community"],
    website: "https://www.smu.ca", admissions: "https://www.smu.ca/admissions"
  },
  // ---------------- Prince Edward Island ----------------
  {
    id: "upei", name: "University of Prince Edward Island", province: "PE",
    city: "Charlottetown", founded: 1969, size: "~5,000 students",
    setting: "Small capital city",
    about: "The island's only university, known for the Atlantic Veterinary College, nursing, sustainable design engineering and business.",
    life: ["Small and friendly", "Island lifestyle and low cost of living", "Home of one of Canada's five veterinary colleges"],
    website: "https://www.upei.ca", admissions: "https://www.upei.ca/future-students"
  },
  // ---------------- Newfoundland and Labrador ----------------
  {
    id: "mun", name: "Memorial University of Newfoundland", province: "NL",
    city: "St. John's (also Corner Brook)", founded: 1925, size: "~14,000 undergrads",
    setting: "Small coastal capital city",
    about: "Atlantic Canada's largest university, known for ocean and marine engineering, the Marine Institute, medicine and some of the lowest tuition in Canada.",
    life: ["Low tuition compared to most of Canada", "Friendly, distinctive city culture", "Strong ocean-industry co-op and research"],
    website: "https://www.mun.ca", admissions: "https://www.mun.ca/undergrad"
  }
);
