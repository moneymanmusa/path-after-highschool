// University programs and their Ontario high school prerequisites.
//
// P(university, name, degree, field, required, groups, avg, extra)
//   required: course codes the student must have taken (all of them)
//   groups:   [[n, [codes...]], ...] — student needs at least n courses from each list
//   avg:      [low, high] approximate typical admission average (%). These are ESTIMATES
//             compiled for wave 1 and are shown with a warning; null = not collected yet.
//   extra:    { supp: "supplementary application", note: "program-specific note" }
//
// Every program page links to the university's official admissions site, which is the
// final authority. Requirements change yearly — verify before applying.
(function () {
  const ENGR = ["ENG4U", "MHF4U", "MCV4U", "SCH4U", "SPH4U"];
  const CS = ["ENG4U", "MHF4U", "MCV4U"];
  const MATH4 = ["MHF4U", "MCV4U", "MDM4U"];
  const ONE_MATH = [1, MATH4];
  const NURSE = ["ENG4U", "SBI4U", "SCH4U"];
  const SCI4 = ["SBI4U", "SCH4U", "SPH4U", "SES4U"];
  const FR = [1, ["FRA4U", "FIF4U", "FEF4U", "FSF4U"]];

  const list = [];
  let n = 0;
  function P(uni, name, degree, field, req, groups, avg, extra) {
    n += 1;
    list.push(Object.assign({
      id: uni + "-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      uni, name, degree, field, req, groups: groups || [], avg: avg || null
    }, extra || {}));
  }

  // ---------------- University of Toronto ----------------
  for (const d of ["Chemical", "Civil", "Electrical", "Computer", "Industrial", "Mechanical", "Mineral", "Materials", "Engineering Science"]) {
    P("uoft", d === "Engineering Science" ? "Engineering Science" : d + " Engineering", "BASc", "engineering", ENGR, [],
      d === "Engineering Science" ? [93, 97] : [89, 94], { supp: "Online Student Profile (required)" });
  }
  P("uoft", "Track One (Undeclared) Engineering", "BASc", "engineering", ENGR, [], [89, 94], { supp: "Online Student Profile (required)" });
  P("uoft", "Computer Science (St. George)", "BSc", "cs", CS, [], [93, 98]);
  P("uoft", "Rotman Commerce", "BCom", "business", ["ENG4U", "MCV4U"], [], [88, 93], { supp: "Rotman Commerce supplementary application" });
  P("uoft", "Life Sciences (St. George)", "BSc", "life_sci", ["ENG4U", "MCV4U", "SBI4U", "SCH4U"], [], [85, 90]);
  P("uoft", "Physical and Mathematical Sciences (St. George)", "BSc", "physical_sci", ["ENG4U", "MHF4U", "MCV4U"], [], [85, 90]);
  P("uoft", "Humanities (St. George)", "BA", "humanities", ["ENG4U"], [], [84, 88]);
  P("uoft", "Social Sciences (St. George)", "BA", "social_sci", ["ENG4U"], [], [84, 88]);
  P("uoft", "Psychology / Social Sciences (St. George)", "BA", "psychology", ["ENG4U"], [], [84, 88]);
  P("uoft", "Economics (Social Sciences, St. George)", "BA", "economics", ["ENG4U", "MCV4U"], [], [85, 89]);
  P("uoft", "Kinesiology and Physical Education", "BKin", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [82, 87]);
  P("uoft", "Architectural Studies", "BA", "architecture", ["ENG4U"], [], [82, 87]);
  P("uoft", "Music (Performance / Composition)", "MusBac", "fine_arts", ["ENG4U"], [], null, { supp: "Audition required" });
  P("uoft", "Computer Science Co-op (Scarborough)", "BSc", "cs", CS, [], [88, 93]);
  P("uoft", "Management Co-op (Scarborough)", "BBA", "business", ["ENG4U", "MCV4U"], [], [86, 90]);
  P("uoft", "Life Sciences (Scarborough)", "BSc", "life_sci", ["ENG4U", "MHF4U", "SBI4U", "SCH4U"], [], [80, 85]);
  P("uoft", "Commerce (Mississauga)", "BCom", "business", ["ENG4U", "MCV4U"], [], [82, 87]);
  P("uoft", "Computer Science (Mississauga)", "BSc", "cs", CS, [], [84, 89]);
  P("uoft", "Life Sciences (Mississauga)", "BSc", "life_sci", ["ENG4U", "MHF4U", "SBI4U", "SCH4U"], [], [78, 83]);

  // ---------------- University of Waterloo ----------------
  const AIF = { supp: "Admission Information Form (AIF)" };
  P("waterloo", "Computer Science", "BCS", "cs", CS, [], [95, 99], { supp: "Admission Information Form (AIF); Euclid contest strongly recommended" });
  P("waterloo", "Software Engineering", "BSE", "software", ENGR, [], [95, 99], AIF);
  for (const d of ["Mechanical", "Mechatronics", "Electrical", "Computer", "Systems Design", "Civil", "Chemical", "Nanotechnology", "Biomedical", "Management", "Environmental", "Geological", "Architectural"]) {
    P("waterloo", d + " Engineering", "BASc", "engineering", ENGR, [], (d === "Computer" || d === "Systems Design" || d === "Mechatronics") ? [92, 97] : [88, 94], AIF);
  }
  P("waterloo", "Mathematics", "BMath", "math", CS, [], [88, 93], AIF);
  P("waterloo", "Data Science", "BMath", "math", CS, [], [90, 95], AIF);
  P("waterloo", "Accounting and Financial Management", "BAFM", "accounting", ["ENG4U", "MHF4U", "MCV4U"], [], [88, 93], AIF);
  P("waterloo", "Computing and Financial Management", "BCFM", "accounting", CS, [], [92, 96], AIF);
  P("waterloo", "Health Sciences", "BSc", "health_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [80, 85]);
  P("waterloo", "Kinesiology", "BSc", "kinesiology", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [80, 85]);
  P("waterloo", "Life Sciences", "BSc", "life_sci", ["ENG4U", "MHF4U", "SBI4U", "SCH4U"], [[1, ["MCV4U", "MDM4U", "SPH4U"]]], [83, 88]);
  P("waterloo", "Honours Science", "BSc", "physical_sci", ["ENG4U", "MHF4U"], [[2, ["SBI4U", "SCH4U", "SPH4U", "MCV4U", "SES4U"]]], [82, 87]);
  P("waterloo", "Pharmacy", "PharmD", "pharmacy", ["ENG4U", "MHF4U", "MCV4U", "SBI4U", "SCH4U"], [], [85, 90], { supp: "Admission Information Form; interview/assessment", note: "Waterloo's pharmacy program admits students directly from high school." });
  P("waterloo", "Architecture", "BAS", "architecture", ["ENG4U"], [[1, ["MHF4U", "MCV4U"]]], [85, 90], { supp: "Admission Information Form plus portfolio/interview" });
  P("waterloo", "Honours Arts", "BA", "general_arts", ["ENG4U"], [], [78, 83]);
  P("waterloo", "Environment and Business", "BES", "env_sci", ["ENG4U"], [ONE_MATH], [80, 85]);
  P("waterloo", "Global Business and Digital Arts", "BGBDA", "business", ["ENG4U"], [], [82, 87]);

  // ---------------- McMaster University ----------------
  P("mcmaster", "Engineering I", "BEng", "engineering", ENGR, [], [90, 94], { supp: "Online Supplementary Application (required)" });
  P("mcmaster", "Health Sciences (BHSc)", "BHSc", "health_sci", ["ENG4U", "SBI4U", "SCH4U"], [], [93, 98], { supp: "Supplementary application (heavily weighted)", note: "A highly competitive program; the supplementary application is a major part of the decision." });
  P("mcmaster", "Life Sciences (Science I)", "BSc", "life_sci", ["ENG4U", "MCV4U", "SBI4U", "SCH4U"], [], [87, 92]);
  P("mcmaster", "Science I (Gateway)", "BSc", "physical_sci", ["ENG4U", "MCV4U"], [[2, SCI4]], [86, 91]);
  P("mcmaster", "Integrated Science (iSci)", "BSc", "life_sci", ["ENG4U", "MCV4U", "SBI4U", "SCH4U", "SPH4U"], [], [90, 95], { supp: "Supplementary application (required)" });
  P("mcmaster", "Computer Science I", "BASc", "cs", CS, [], [87, 92]);
  P("mcmaster", "Business I (Commerce)", "BCom", "business", ["ENG4U", "MHF4U"], [[1, ["MCV4U", "MDM4U"]]], [85, 90]);
  P("mcmaster", "Kinesiology", "BSc", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH, [1, ["SCH4U", "SPH4U"]]], [88, 92]);
  P("mcmaster", "Nursing (BScN)", "BScN", "nursing", NURSE, [ONE_MATH], [88, 92]);
  P("mcmaster", "Humanities I", "BA", "humanities", ["ENG4U"], [], [80, 85]);
  P("mcmaster", "Social Sciences I", "BA", "social_sci", ["ENG4U"], [], [82, 86]);
  P("mcmaster", "Psychology, Neuroscience and Behaviour", "BSc", "psychology", ["ENG4U", "MCV4U", "SBI4U", "SCH4U"], [], [85, 90]);

  // ---------------- Western University ----------------
  P("western", "Engineering", "BESc", "engineering", ENGR, [], [88, 92]);
  P("western", "Medical Sciences", "BMSc", "life_sci", ["ENG4U", "MHF4U", "MCV4U", "SBI4U", "SCH4U"], [], [90, 95]);
  P("western", "Health Sciences", "BHSc", "health_sci", ["ENG4U", "SBI4U"], [ONE_MATH], [87, 92]);
  P("western", "Kinesiology", "BA/BSc", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [85, 90]);
  P("western", "Science", "BSc", "physical_sci", ["ENG4U", "MHF4U", "MCV4U"], [[2, ["SBI4U", "SCH4U", "SPH4U"]]], [85, 90]);
  P("western", "Social Science (Ivey AEO pathway)", "BA", "social_sci", ["ENG4U"], [], [82, 87], { note: "Ivey HBA students do two years in another program, then enter Ivey. High-school applicants can apply for Advanced Entry Opportunity (AEO) status for a guaranteed spot if they meet the Year 2 requirements." });
  P("western", "Management and Organizational Studies (MOS)", "BMOS", "business", ["ENG4U"], [ONE_MATH], [85, 90]);
  P("western", "Computer Science", "BSc", "cs", CS, [], [85, 90]);
  P("western", "Arts and Humanities", "BA", "humanities", ["ENG4U"], [], [80, 85]);
  P("western", "Nursing (BScN)", "BScN", "nursing", NURSE, [ONE_MATH], [88, 93]);
  P("western", "Media, Information and Technoculture", "BA", "communication", ["ENG4U"], [], [80, 85]);
  P("western", "Music", "BMus", "fine_arts", ["ENG4U"], [], null, { supp: "Audition required" });

  // ---------------- Queen's University ----------------
  const PSE = { supp: "Personal Statement of Experience (PSE)" };
  P("queens", "Engineering (Smith Engineering)", "BASc", "engineering", ENGR, [], [88, 92], PSE);
  P("queens", "Commerce (Smith School of Business)", "BCom", "business", ["ENG4U", "MCV4U"], [[1, ["MHF4U", "MDM4U"]]], [90, 95], PSE);
  P("queens", "Health Sciences", "BHSc", "health_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [90, 95], PSE);
  P("queens", "Life Sciences / Science", "BSc", "life_sci", ["ENG4U", "MCV4U"], [[2, ["SBI4U", "SCH4U", "SPH4U"]]], [87, 91]);
  P("queens", "Computing", "BComp", "cs", CS, [], [88, 92]);
  P("queens", "Arts", "BA", "humanities", ["ENG4U"], [], [85, 88]);
  P("queens", "Kinesiology", "BSc", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH, [1, ["SCH4U", "SPH4U"]]], [85, 90]);
  P("queens", "Nursing", "BNSc", "nursing", NURSE, [ONE_MATH], [90, 95], PSE);
  P("queens", "Concurrent Education", "BA/BSc + BEd", "education", ["ENG4U"], [], [85, 88], Object.assign({ note: "You also need the prerequisites of the subject degree you pair it with." }, PSE));

  // ---------------- University of Ottawa ----------------
  P("uottawa", "Engineering", "BASc", "engineering", ENGR, [], [85, 90]);
  P("uottawa", "Computer Science", "BSc", "cs", CS, [], [83, 88]);
  P("uottawa", "Health Sciences", "BHSc", "health_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [85, 90]);
  P("uottawa", "Biomedical Science", "BSc", "life_sci", ["ENG4U", "MHF4U", "MCV4U", "SBI4U", "SCH4U"], [], [87, 92]);
  P("uottawa", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [85, 90]);
  P("uottawa", "Commerce (Telfer)", "BCom", "business", ["ENG4U", "MHF4U"], [[1, ["MCV4U", "MDM4U"]]], [82, 87]);
  P("uottawa", "Political Science", "BSocSc", "social_sci", ["ENG4U"], [], [78, 83]);
  P("uottawa", "Criminology", "BSocSc", "law_society", ["ENG4U"], [], [78, 83]);
  P("uottawa", "Psychology", "BA", "psychology", ["ENG4U"], [], [80, 85]);

  // ---------------- Carleton University ----------------
  for (const d of ["Aerospace", "Civil", "Electrical", "Mechanical", "Software", "Biomedical and Electrical"]) {
    P("carleton", d + " Engineering", "BEng", d === "Software" ? "software" : "engineering", ENGR, [], d === "Aerospace" ? [85, 90] : [80, 87]);
  }
  P("carleton", "Computer Science", "BCS", "cs", CS, [], [80, 87]);
  P("carleton", "Journalism", "BJ", "communication", ["ENG4U"], [], [85, 90]);
  P("carleton", "Public Affairs and Policy Management", "BPAPM", "social_sci", ["ENG4U"], [], [80, 86]);
  P("carleton", "Commerce", "BCom", "business", ["ENG4U"], [[1, ["MHF4U", "MCV4U"]]], [78, 84]);
  P("carleton", "Neuroscience", "BSc", "life_sci", ["ENG4U", "MHF4U", "SBI4U", "SCH4U"], [], [80, 86]);
  P("carleton", "Architectural Studies", "BAS", "architecture", ["ENG4U", "MHF4U"], [], [80, 86]);
  P("carleton", "Psychology", "BA", "psychology", ["ENG4U"], [], [75, 80]);

  // ---------------- York University ----------------
  P("york", "Business Administration (Schulich BBA)", "BBA", "business", ["ENG4U", "MHF4U"], [[1, ["MCV4U", "MDM4U"]]], [90, 95], { supp: "Supplementary application and video interview" });
  P("york", "Engineering (Lassonde)", "BEng", "engineering", ENGR, [], [82, 87]);
  P("york", "Computer Science (Lassonde)", "BSc", "cs", CS, [], [82, 87]);
  P("york", "Kinesiology and Health Science", "BSc", "kinesiology", ["ENG4U", "MHF4U", "SBI4U"], [[1, ["SCH4U", "SPH4U"]]], [78, 84]);
  P("york", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [85, 90]);
  P("york", "Psychology", "BA", "psychology", ["ENG4U"], [], [75, 80]);
  P("york", "Criminology", "BA", "law_society", ["ENG4U"], [], [75, 80]);
  P("york", "Commerce", "BCom", "business", ["ENG4U"], [ONE_MATH], [75, 80]);
  P("york", "International Studies (Glendon)", "BA", "social_sci", ["ENG4U"], [], [75, 80]);

  // ---------------- Toronto Metropolitan University ----------------
  for (const d of ["Aerospace", "Biomedical", "Chemical", "Civil", "Computer", "Electrical", "Industrial", "Mechanical"]) {
    P("tmu", d + " Engineering", "BEng", "engineering", ENGR, [], [80, 88]);
  }
  P("tmu", "Computer Science", "BSc", "cs", CS, [], [85, 90]);
  P("tmu", "Business Management (Ted Rogers)", "BComm", "business", ["ENG4U"], [ONE_MATH], [78, 84]);
  P("tmu", "Accounting and Finance (Ted Rogers)", "BComm", "accounting", ["ENG4U"], [[1, ["MHF4U", "MCV4U"]]], [80, 85]);
  P("tmu", "Nursing (Collaborative BScN)", "BScN", "nursing", NURSE, [ONE_MATH], [85, 90]);
  P("tmu", "Journalism", "BJ", "communication", ["ENG4U"], [], null, { supp: "Supplementary application" });
  P("tmu", "Media Production (RTA)", "BA", "communication", ["ENG4U"], [], null, { supp: "Supplementary application" });
  P("tmu", "Criminology", "BA", "law_society", ["ENG4U"], [], [75, 80]);
  P("tmu", "Architectural Science", "BArchSc", "architecture", ["ENG4U", "MHF4U"], [], [78, 84]);
  P("tmu", "Psychology", "BA", "psychology", ["ENG4U"], [], [78, 83]);
  P("tmu", "Interior Design", "BDes", "fine_arts", ["ENG4U"], [], null, { supp: "Portfolio / supplementary application" });

  // ---------------- Wilfrid Laurier University ----------------
  P("laurier", "Business Administration (BBA)", "BBA", "business", ["ENG4U"], [ONE_MATH], [85, 90]);
  P("laurier", "Business Administration (Laurier) and Computer Science (Waterloo) Double Degree", "BBA + BCS", "cs", CS, [], [93, 97], { supp: "Supplementary application" });
  P("laurier", "Business Administration (Laurier) and Mathematics (Waterloo) Double Degree", "BBA + BMath", "math", CS, [], [90, 95], { supp: "Supplementary application" });
  P("laurier", "Economics", "BA", "economics", ["ENG4U"], [ONE_MATH], [78, 83]);
  P("laurier", "Computer Science", "BSc", "cs", CS, [], [78, 83]);
  P("laurier", "Kinesiology and Physical Education", "BSc", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [78, 83]);
  P("laurier", "Psychology", "BA", "psychology", ["ENG4U"], [], [75, 80]);
  P("laurier", "Music", "BMus", "fine_arts", ["ENG4U"], [], null, { supp: "Audition required" });
  P("laurier", "Criminology (Brantford)", "BA", "law_society", ["ENG4U"], [], [70, 76]);

  // ---------------- University of Guelph ----------------
  P("guelph", "Biomedical Science", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [[1, ["MHF4U", "MCV4U"]]], [85, 90]);
  P("guelph", "Biological Science", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [[1, ["MHF4U", "MCV4U"]]], [80, 85]);
  P("guelph", "Animal Biology", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [[1, ["MHF4U", "MCV4U"]]], [80, 85], { note: "A popular pre-veterinary route toward the Ontario Veterinary College (DVM)." });
  P("guelph", "Engineering", "BEng", "engineering", ENGR, [], [80, 86]);
  P("guelph", "Commerce", "BComm", "business", ["ENG4U"], [ONE_MATH], [78, 83]);
  P("guelph", "Computer Science", "BComp", "cs", CS, [], [78, 84]);
  P("guelph", "Agriculture", "BSc(Agr)", "agriculture", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [75, 80]);
  P("guelph", "Environmental Sciences", "BSc(Env)", "env_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [75, 80]);
  P("guelph", "Food Science", "BSc", "agriculture", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [75, 80]);
  P("guelph", "Psychology", "BA", "psychology", ["ENG4U"], [], [78, 83]);

  // ---------------- Brock University ----------------
  P("brock", "Concurrent Education (Primary/Junior)", "BA + BEd", "education", ["ENG4U"], [], [80, 85], { supp: "Supplementary application" });
  P("brock", "Kinesiology", "BSc", "kinesiology", ["ENG4U", "SBI4U"], [], [75, 80]);
  P("brock", "Sport Management", "BSM", "business", ["ENG4U"], [], [75, 80]);
  P("brock", "Accounting (Co-op)", "BAcc", "accounting", ["ENG4U"], [ONE_MATH], [78, 83]);
  P("brock", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], [75, 80]);
  P("brock", "Psychology", "BA", "psychology", ["ENG4U"], [], [72, 78]);
  P("brock", "Biological Sciences", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [72, 78]);
  P("brock", "Oenology and Viticulture", "BSc", "agriculture", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], null);
  P("brock", "Computer Science", "BSc", "cs", ["ENG4U", "MHF4U"], [], [72, 78]);
  P("brock", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [82, 87]);

  // ---------------- University of Windsor ----------------
  P("windsor", "Engineering (incl. Automotive)", "BASc", "engineering", ENGR, [], [75, 82]);
  P("windsor", "Computer Science", "BSc", "cs", CS, [], [72, 78]);
  P("windsor", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [82, 87]);
  P("windsor", "Business Administration (Odette)", "BComm", "business", ["ENG4U"], [ONE_MATH], [72, 78]);
  P("windsor", "Kinesiology", "BHK", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [72, 78]);
  P("windsor", "Criminology", "BA", "law_society", ["ENG4U"], [], [70, 75]);
  P("windsor", "Biological Sciences", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [72, 78]);
  P("windsor", "Psychology", "BA", "psychology", ["ENG4U"], [], [70, 75]);

  // ---------------- Ontario Tech University ----------------
  for (const d of ["Mechanical", "Electrical", "Software", "Nuclear", "Mechatronics", "Automotive"]) {
    P("ontariotech", d + " Engineering", "BEng", d === "Software" ? "software" : "engineering", ENGR, [], [75, 82]);
  }
  P("ontariotech", "Computer Science", "BSc", "cs", CS, [], [75, 80]);
  P("ontariotech", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [82, 87]);
  P("ontariotech", "Kinesiology", "BHSc", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [72, 78]);
  P("ontariotech", "Commerce", "BCom", "business", ["ENG4U"], [ONE_MATH], [70, 76]);
  P("ontariotech", "Forensic Science", "BSc", "life_sci", ["ENG4U", "MHF4U", "SBI4U", "SCH4U"], [], [75, 82]);
  P("ontariotech", "Criminology and Justice", "BA", "law_society", ["ENG4U"], [], [70, 75]);
  P("ontariotech", "Game Development and Interactive Media", "BIT", "cs", ["ENG4U", "MHF4U"], [], [72, 78]);

  // ---------------- Trent University ----------------
  P("trent", "Forensic Science", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [78, 84]);
  P("trent", "Environmental and Resource Science", "BSc", "env_sci", ["ENG4U"], [[1, SCI4], ONE_MATH], [70, 76]);
  P("trent", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [80, 85]);
  P("trent", "Psychology", "BA", "psychology", ["ENG4U"], [], [70, 75]);
  P("trent", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], [70, 75]);
  P("trent", "Indigenous Studies", "BA", "social_sci", ["ENG4U"], [], [70, 75]);
  P("trent", "Biology", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [70, 76]);

  // ---------------- Lakehead University ----------------
  P("lakehead", "Engineering", "BEng", "engineering", ENGR, [], [70, 78]);
  P("lakehead", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [78, 84]);
  P("lakehead", "Outdoor Recreation, Parks and Tourism", "HBOR", "env_sci", ["ENG4U"], [], [70, 75]);
  P("lakehead", "Forestry", "HBScF", "env_sci", ["ENG4U", "SBI4U"], [ONE_MATH], [70, 75]);
  P("lakehead", "Kinesiology", "HBK", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [72, 78]);
  P("lakehead", "Business Administration", "HBComm", "business", ["ENG4U"], [ONE_MATH], [70, 75]);
  P("lakehead", "Computer Science", "HBSc", "cs", CS, [], [70, 76]);

  // ---------------- Laurentian University ----------------
  P("laurentian", "Mining Engineering", "BEng", "engineering", ENGR, [], [70, 78]);
  P("laurentian", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [78, 84]);
  P("laurentian", "Sports Administration", "BSA", "business", ["ENG4U"], [], [70, 75]);
  P("laurentian", "Earth Sciences", "BSc", "physical_sci", ["ENG4U", "MHF4U", "SCH4U"], [[1, ["SBI4U", "SPH4U", "SES4U"]]], [70, 75]);
  P("laurentian", "Psychology", "BA", "psychology", ["ENG4U"], [], [70, 75]);
  P("laurentian", "Commerce", "BCom", "business", ["ENG4U"], [ONE_MATH], [70, 75]);

  // ---------------- Nipissing University ----------------
  P("nipissing", "Concurrent Education", "BA/BSc + BEd", "education", ["ENG4U"], [], [75, 80]);
  P("nipissing", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [78, 84]);
  P("nipissing", "Criminal Justice", "BA", "law_society", ["ENG4U"], [], [70, 75]);
  P("nipissing", "Psychology", "BA", "psychology", ["ENG4U"], [], [70, 75]);
  P("nipissing", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], [70, 75]);
  P("nipissing", "Computer Science", "BSc", "cs", ["ENG4U", "MHF4U"], [[1, ["MCV4U", "MDM4U"]]], [70, 75]);

  // ---------------- Algoma University ----------------
  P("algoma", "Computer Science", "BCS", "cs", ["ENG4U", "MHF4U"], [], [70, 75]);
  P("algoma", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], [65, 72]);
  P("algoma", "Psychology", "BA", "psychology", ["ENG4U"], [], [65, 72]);
  P("algoma", "Social Work", "BSW", "social_work", ["ENG4U"], [], [70, 75]);
  P("algoma", "Biology", "BSc", "life_sci", ["ENG4U", "SBI4U", "SCH4U"], [ONE_MATH], [65, 72]);

  // ---------------- OCAD University ----------------
  for (const d of ["Graphic Design", "Illustration", "Industrial Design", "Environmental Design", "Digital Futures"]) {
    P("ocadu", d, "BDes", "fine_arts", ["ENG4U"], [], null, { supp: "Portfolio (main admission factor)" });
  }
  for (const d of ["Drawing and Painting", "Photography", "Integrated Media", "Sculpture/Installation"]) {
    P("ocadu", d, "BFA", "fine_arts", ["ENG4U"], [], null, { supp: "Portfolio (main admission factor)" });
  }

  // ---------------- Université de l'Ontario français ----------------
  P("uof", "Cultures numériques (Digital Cultures)", "BA", "communication", [], [FR], null, { note: "Taught in French." });
  P("uof", "Économie et innovation sociale", "BA", "economics", [], [FR, ONE_MATH], null, { note: "Taught in French." });
  P("uof", "Environnements urbains durables", "BA", "env_sci", [], [FR], null, { note: "Taught in French." });
  P("uof", "Pluralité humaine", "BA", "social_sci", [], [FR], null, { note: "Taught in French." });

  window.PROGRAMS = list;
})();
