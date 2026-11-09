// Universities. Wave 1 = Ontario. Other provinces are added in later waves.
// Enrolment figures are approximate full-time undergraduate counts, rounded.
// "life" summarizes things that affect how student-friendly a school feels
// (size, setting, housing, co-op, support). It is descriptive, not a ranking.
window.UNIVERSITIES = [
  {
    id: "uoft", name: "University of Toronto", province: "ON",
    city: "Toronto (St. George), Mississauga (UTM), Scarborough (UTSC)", founded: 1827, size: "~75,000 undergrads across three campuses",
    setting: "Big city — downtown St. George campus plus two suburban campuses",
    about: "Canada's largest and most research-intensive university, consistently ranked first in Canada. The St. George campus is downtown Toronto; UTM and UTSC are smaller suburban campuses with their own programs and co-op options.",
    life: ["Huge choice of courses, clubs (1,000+) and research opportunities", "Known for a demanding academic culture and tough grading, especially in first year", "First-year residence guarantee for students who apply on time (varies by college/campus)", "College system at St. George gives you a smaller community inside a big school", "Toronto is expensive to live in, but transit-connected and full of internships"],
    website: "https://www.utoronto.ca", admissions: "https://future.utoronto.ca"
  },
  {
    id: "waterloo", name: "University of Waterloo", province: "ON",
    city: "Waterloo", founded: 1957, size: "~36,000 undergrads",
    setting: "Mid-size tech city (Kitchener-Waterloo)",
    about: "Famous for engineering, computer science and mathematics, and for running one of the largest co-op programs in the world, where students alternate study terms with paid work terms.",
    life: ["Co-op gives up to two years of paid work experience before graduation", "Heavy, fast-paced workload in math, CS and engineering", "Strong startup and tech culture (Velocity incubator, Hack the North)", "First-year residence guarantee for those who meet the deadline", "Campus life is quieter than larger cities; students move a lot because of co-op"],
    website: "https://uwaterloo.ca", admissions: "https://uwaterloo.ca/future-students"
  },
  {
    id: "mcmaster", name: "McMaster University", province: "ON",
    city: "Hamilton", founded: 1887, size: "~31,000 undergrads",
    setting: "Mid-size city, compact walkable campus",
    about: "A research-intensive university known for health sciences, medicine, engineering and its problem-based learning approach (which McMaster's medical school helped pioneer).",
    life: ["Compact, green campus with a strong school spirit", "Health Sciences and iSci are famous inquiry-based programs", "First-year residence guarantee for eligible applicants", "Hamilton is cheaper than Toronto with a GO train link", "Large hospital network nearby for health-related volunteering and research"],
    website: "https://www.mcmaster.ca", admissions: "https://future.mcmaster.ca"
  },
  {
    id: "western", name: "Western University", province: "ON",
    city: "London", founded: 1878, size: "~33,000 undergrads (including affiliated colleges)",
    setting: "Mid-size city, large traditional campus",
    about: "Known for the Ivey Business School, medicine, kinesiology and a very strong residential student experience. Affiliated colleges (Huron, King's) offer smaller class sizes.",
    life: ["Often described as having one of the most social, spirited student experiences in Canada", "Big, beautiful campus with lots of residences", "First-year residence guarantee for eligible applicants", "Ivey HBA (business) is entered after two years via Advanced Entry Opportunity (AEO)", "London is affordable compared to Toronto"],
    website: "https://www.uwo.ca", admissions: "https://welcome.uwo.ca"
  },
  {
    id: "queens", name: "Queen's University", province: "ON",
    city: "Kingston", founded: 1841, size: "~24,000 undergrads",
    setting: "Small city, historic campus by Lake Ontario",
    about: "One of Canada's oldest universities, known for Commerce (Smith School of Business), engineering, health sciences and a tight-knit, tradition-heavy student culture.",
    life: ["Very strong school spirit and traditions; most students live in the 'student village' near campus", "Smaller city means campus is the centre of social life", "First-year residence guarantee for eligible applicants", "Many programs ask for a Personal Statement of Experience (PSE)", "Kingston is far from big cities (about 2.5 hours from Toronto)"],
    website: "https://www.queensu.ca", admissions: "https://www.queensu.ca/admission"
  },
  {
    id: "uottawa", name: "University of Ottawa", province: "ON",
    city: "Ottawa", founded: 1848, size: "~40,000 undergrads",
    setting: "Downtown capital city",
    about: "The largest bilingual (English-French) university in the world, located in downtown Ottawa next to Parliament. Strong in law, health sciences, political science and public policy.",
    life: ["Many programs can be taken in English, French or both; French immersion stream available", "Downtown location close to government jobs and internships", "Co-op available in many programs", "First-year residence guarantee for eligible students", "Large and urban, so you build your own community through clubs"],
    website: "https://www.uottawa.ca", admissions: "https://www.uottawa.ca/study"
  },
  {
    id: "carleton", name: "Carleton University", province: "ON",
    city: "Ottawa", founded: 1942, size: "~27,000 undergrads",
    setting: "Capital city, campus between the Rideau River and Canal",
    about: "Known for journalism, public affairs, aerospace engineering, computer science and international affairs.",
    life: ["Tunnel system connects campus buildings (useful in Ottawa winters)", "Strong co-op and government internship connections", "Supportive academic advising and a large disability-support centre (Paul Menton Centre)", "First-year residence guarantee for eligible students"],
    website: "https://carleton.ca", admissions: "https://admissions.carleton.ca"
  },
  {
    id: "york", name: "York University", province: "ON",
    city: "Toronto (Keele, Glendon, Markham)", founded: 1959, size: "~45,000 undergrads",
    setting: "Big city — large suburban campus with subway access",
    about: "Canada's third-largest university, home to the Schulich School of Business, Lassonde School of Engineering, Osgoode Hall Law School and the bilingual Glendon campus.",
    life: ["Huge range of programs and a very diverse student body", "Mostly commuter campus, so community comes from clubs and programs", "Subway line connects Keele campus to downtown Toronto", "Schulich BBA is one of Canada's top undergraduate business programs"],
    website: "https://www.yorku.ca", admissions: "https://futurestudents.yorku.ca"
  },
  {
    id: "tmu", name: "Toronto Metropolitan University", province: "ON",
    city: "Toronto (downtown)", founded: 1948, size: "~45,000 undergrads",
    setting: "Downtown Toronto, beside Yonge-Dundas Square",
    about: "Formerly Ryerson University. Known for career-focused programs in business, engineering, media, journalism, nursing and design, plus the DMZ startup incubator.",
    life: ["Right downtown — internships and part-time jobs are easy to reach", "Applied, hands-on teaching style", "Mostly commuter school; limited residence space", "Strong entrepreneurship ecosystem (DMZ, zones)"],
    website: "https://www.torontomu.ca", admissions: "https://www.torontomu.ca/admissions"
  },
  {
    id: "laurier", name: "Wilfrid Laurier University", province: "ON",
    city: "Waterloo (also Brantford and Milton)", founded: 1911, size: "~19,000 undergrads",
    setting: "Mid-size city, compact campus",
    about: "Known for the Lazaridis School of Business (BBA), music, economics and a friendly, community-oriented campus. Offers double degrees with the University of Waterloo.",
    life: ["Smaller, close-knit campus right next to the University of Waterloo", "BBA co-op is one of the largest business co-ops in Canada", "Strong school spirit (purple and gold)", "First-year residence guarantee for eligible students"],
    website: "https://www.wlu.ca", admissions: "https://www.wlu.ca/future-students"
  },
  {
    id: "guelph", name: "University of Guelph", province: "ON",
    city: "Guelph", founded: 1964, size: "~28,000 undergrads",
    setting: "Small city, large green campus",
    about: "Known for life sciences, biomedical science, agriculture, veterinary medicine (Ontario Veterinary College), food science and environmental sciences.",
    life: ["Frequently praised for friendly, supportive campus culture", "Beautiful campus with an arboretum", "Strong science and pre-vet/pre-med pathways", "First-year residence guarantee for eligible students", "About an hour from Toronto"],
    website: "https://www.uoguelph.ca", admissions: "https://www.uoguelph.ca/admission"
  },
  {
    id: "brock", name: "Brock University", province: "ON",
    city: "St. Catharines", founded: 1964, size: "~18,000 undergrads",
    setting: "Small city in the Niagara region",
    about: "Known for concurrent education, kinesiology, sport management, accounting co-op and oenology (wine science).",
    life: ["Mid-size school with smaller classes than big-city universities", "Strong co-op options (especially accounting and business)", "Niagara region offers outdoor life and lower cost of living", "First-year residence guarantee for eligible students"],
    website: "https://brocku.ca", admissions: "https://brocku.ca/admissions"
  },
  {
    id: "windsor", name: "University of Windsor", province: "ON",
    city: "Windsor", founded: 1857, size: "~12,000 undergrads",
    setting: "Border city across from Detroit",
    about: "Known for engineering (especially automotive), law, nursing and business. Close ties to the automotive industry.",
    life: ["Smaller classes and approachable professors", "Low cost of living", "Automotive engineering connections and co-op", "Diverse, international student body"],
    website: "https://www.uwindsor.ca", admissions: "https://www.uwindsor.ca/future-students"
  },
  {
    id: "ontariotech", name: "Ontario Tech University", province: "ON",
    city: "Oshawa", founded: 2002, size: "~10,000 undergrads",
    setting: "Suburban Durham Region, east of Toronto",
    about: "A young, technology-focused university with programs in engineering, computer science, health sciences, nuclear engineering and business/IT.",
    life: ["Small, modern campus with a career-focused approach", "Smaller class sizes than large universities", "Close to Toronto by GO transit", "Hands-on labs and industry partnerships"],
    website: "https://ontariotechu.ca", admissions: "https://ontariotechu.ca/future-students"
  },
  {
    id: "trent", name: "Trent University", province: "ON",
    city: "Peterborough (also Durham GTA)", founded: 1964, size: "~12,000 undergrads",
    setting: "Small city, riverside campus",
    about: "A liberal-arts-and-science university known for environmental science, Indigenous studies, forensic science and a college system with small classes.",
    life: ["Small seminars and close contact with professors", "Very scenic campus on the Otonabee River", "Collegiate system builds community", "Strong environmental and Indigenous studies focus"],
    website: "https://www.trentu.ca", admissions: "https://www.trentu.ca/futurestudents"
  },
  {
    id: "lakehead", name: "Lakehead University", province: "ON",
    city: "Thunder Bay (also Orillia)", founded: 1965, size: "~8,000 undergrads",
    setting: "Northern Ontario city by Lake Superior",
    about: "Known for engineering, nursing, forestry, outdoor recreation and a strong connection to Northern Ontario and Indigenous communities.",
    life: ["Small classes and accessible professors", "Outdoor recreation right on campus's doorstep", "Lower cost of living", "Far from southern Ontario cities"],
    website: "https://www.lakeheadu.ca", admissions: "https://www.lakeheadu.ca/future-students"
  },
  {
    id: "laurentian", name: "Laurentian University", province: "ON",
    city: "Sudbury", founded: 1960, size: "~7,000 undergrads",
    setting: "Northern city, lakeside campus",
    about: "A bilingual university known for mining engineering, earth sciences, sports administration and nursing.",
    life: ["Bilingual (English/French) programs", "Campus surrounded by lakes and trails", "Small, personal learning environment", "Went through restructuring in 2021; program list changed, so check current offerings"],
    website: "https://laurentian.ca", admissions: "https://laurentian.ca/future-students"
  },
  {
    id: "nipissing", name: "Nipissing University", province: "ON",
    city: "North Bay", founded: 1992, size: "~4,000 undergrads",
    setting: "Small northern city",
    about: "A small university best known for its education (teacher) programs, plus nursing, criminal justice and liberal arts.",
    life: ["Very small classes and personal attention", "Strong teacher-education reputation", "Outdoor setting with trails on campus"],
    website: "https://www.nipissingu.ca", admissions: "https://www.nipissingu.ca/future-students"
  },
  {
    id: "algoma", name: "Algoma University", province: "ON",
    city: "Sault Ste. Marie (also Brampton and Timmins)", founded: 2008, size: "~6,000 undergrads",
    setting: "Small northern city plus a GTA campus",
    about: "A small university with a special mission to cross-cultural learning with Anishinaabe communities; programs in computer science, business, psychology and more.",
    life: ["Small classes", "Campuses in both the north and the GTA", "Strong Indigenous partnership on the site of a former residential school (Shingwauk)"],
    website: "https://algomau.ca", admissions: "https://algomau.ca/future-students"
  },
  {
    id: "ocadu", name: "OCAD University", province: "ON",
    city: "Toronto (downtown)", founded: 1876, size: "~5,000 undergrads",
    setting: "Downtown Toronto arts district",
    about: "Canada's largest art and design university, offering fine arts, design, digital media and illustration programs. Admission is portfolio-based.",
    life: ["Studio-based learning in small classes", "Right downtown near the Art Gallery of Ontario", "Strong creative community", "Limited residence options"],
    website: "https://www.ocadu.ca", admissions: "https://www.ocadu.ca/admissions"
  },
  {
    id: "uof", name: "Université de l'Ontario français", province: "ON",
    city: "Toronto", founded: 2021, size: "Under 1,000 students",
    setting: "Downtown Toronto waterfront",
    about: "A small, French-language university in Toronto with interdisciplinary programs (digital cultures, urban environments, economics and innovation, plurality studies).",
    life: ["Fully French-language studies in a big English city", "Very small cohorts and project-based learning", "New, modern facilities"],
    website: "https://uonta.ca", admissions: "https://uonta.ca/admission"
  }
];
