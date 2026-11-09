// Wave 2: programs outside Ontario, with the requirements expressed as the
// Ontario courses an Ontario applicant needs. Same format as data/programs.js.
// Averages are approximate ESTIMATES for Ontario applicants; null = not collected.
(function () {
  const ENGR = ["ENG4U", "MHF4U", "MCV4U", "SCH4U", "SPH4U"];
  const CS = ["ENG4U", "MHF4U", "MCV4U"];
  const ONE_MATH = [1, ["MHF4U", "MCV4U", "MDM4U"]];
  const NURSE = ["ENG4U", "SBI4U", "SCH4U"];
  const BIO = ["ENG4U", "MHF4U", "SBI4U", "SCH4U"];
  const SCI3 = ["SBI4U", "SCH4U", "SPH4U"];
  const FR = [1, ["FRA4U", "FIF4U", "FEF4U", "FSF4U"]];
  const FRENCH = { note: "Taught in French — you must be able to study in French." };

  function P(uni, name, degree, field, req, groups, avg, extra) {
    window.PROGRAMS.push(Object.assign({
      id: uni + "-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      uni, name, degree, field, req, groups: groups || [], avg: avg || null
    }, extra || {}));
  }

  // ---------------- UBC ----------------
  const UBC = { supp: "Personal Profile (required for all UBC applicants)" };
  P("ubc", "Applied Science (Engineering)", "BASc", "engineering", ENGR, [], [90, 95], UBC);
  P("ubc", "Science (incl. Computer Science)", "BSc", "physical_sci", ["ENG4U", "MHF4U", "MCV4U"], [[1, SCI3]], [88, 93], Object.assign({ note: "Computer Science at UBC is a specialization you enter from the Faculty of Science after first year." }, UBC));
  P("ubc", "Commerce (Sauder School of Business)", "BCom", "business", ["ENG4U", "MHF4U"], [], [90, 95], UBC);
  P("ubc", "Arts", "BA", "humanities", ["ENG4U"], [], [85, 90], UBC);
  P("ubc", "Kinesiology", "BKin", "kinesiology", ["ENG4U"], [ONE_MATH], [85, 90], UBC);
  P("ubc", "Forestry", "BSF", "env_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], [80, 85], UBC);
  P("ubc", "Land and Food Systems", "BSc", "agriculture", ["ENG4U", "MHF4U", "SCH4U"], [], [80, 85], UBC);
  P("ubc", "Science (UBC Okanagan)", "BSc", "life_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], [78, 84], UBC);
  P("ubc", "Engineering (UBC Okanagan)", "BASc", "engineering", ENGR, [], [80, 87], UBC);
  P("ubc", "Nursing (UBC Okanagan)", "BSN", "nursing", NURSE, [ONE_MATH], [85, 90], UBC);

  // ---------------- SFU ----------------
  P("sfu", "Computing Science", "BSc", "cs", CS, [], [88, 93]);
  P("sfu", "Engineering Science", "BASc", "engineering", ENGR, [], [87, 92]);
  P("sfu", "Business Administration (Beedie)", "BBA", "business", ["ENG4U", "MHF4U"], [], [85, 90]);
  P("sfu", "Communication", "BA", "communication", ["ENG4U"], [], [80, 85]);
  P("sfu", "Criminology", "BA", "law_society", ["ENG4U"], [], [80, 85]);
  P("sfu", "Health Sciences", "BSc", "health_sci", BIO, [], [85, 90]);
  P("sfu", "Interactive Arts and Technology", "BSc/BA", "fine_arts", ["ENG4U"], [], [80, 85]);

  // ---------------- UVic ----------------
  P("uvic", "Engineering", "BEng", "engineering", ENGR, [], [83, 88]);
  P("uvic", "Computer Science", "BSc", "cs", CS, [], [83, 88]);
  P("uvic", "Business (Gustavson)", "BCom", "business", ["ENG4U"], [ONE_MATH], null);
  P("uvic", "Biology", "BSc", "life_sci", BIO, [], [78, 84]);
  P("uvic", "Earth and Ocean Sciences", "BSc", "physical_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], [78, 84]);
  P("uvic", "Psychology", "BA", "psychology", ["ENG4U"], [], [78, 84]);

  // ---------------- UNBC ----------------
  P("unbc", "Environmental Science", "BSc", "env_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], null);
  P("unbc", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], null);
  P("unbc", "First Nations Studies", "BA", "social_sci", ["ENG4U"], [], null);

  // ---------------- University of Alberta ----------------
  P("ualberta", "Engineering", "BSc Eng", "engineering", ENGR, [], [85, 90]);
  P("ualberta", "Science (incl. Computing Science)", "BSc", "physical_sci", ["ENG4U", "MHF4U"], [[2, ["MCV4U", "SBI4U", "SCH4U", "SPH4U"]]], [80, 87]);
  P("ualberta", "Business", "BCom", "business", ["ENG4U", "MHF4U"], [], [82, 87]);
  P("ualberta", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [85, 90]);
  P("ualberta", "Kinesiology", "BKin", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], [78, 84]);
  P("ualberta", "Agriculture", "BSc", "agriculture", ["ENG4U", "MHF4U", "SCH4U"], [[1, ["SBI4U", "SPH4U"]]], null);
  P("ualberta", "Arts", "BA", "humanities", ["ENG4U"], [], [75, 82]);
  P("ualberta", "Education (Elementary/Secondary)", "BEd", "education", ["ENG4U"], [], [78, 84]);

  // ---------------- University of Calgary ----------------
  P("ucalgary", "Engineering (Schulich)", "BSc Eng", "engineering", ENGR, [], [85, 90]);
  P("ucalgary", "Computer Science", "BSc", "cs", CS, [], [85, 90]);
  P("ucalgary", "Business (Haskayne)", "BComm", "business", ["ENG4U", "MHF4U"], [], [82, 87]);
  P("ucalgary", "Kinesiology", "BKin", "kinesiology", ["ENG4U", "MHF4U", "SBI4U"], [], [82, 87]);
  P("ucalgary", "Health Sciences (Bachelor of Health Sciences)", "BHSc", "health_sci", ["ENG4U", "MHF4U", "SBI4U", "SCH4U"], [], [90, 95]);
  P("ucalgary", "Nursing", "BN", "nursing", NURSE, [ONE_MATH], [85, 90]);
  P("ucalgary", "Psychology", "BA/BSc", "psychology", ["ENG4U"], [], [78, 84]);

  // ---------------- MacEwan / Mount Royal / Lethbridge ----------------
  P("macewan", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], null);
  P("macewan", "Business Studies", "BCom", "business", ["ENG4U"], [ONE_MATH], null);
  P("macewan", "Arts", "BA", "humanities", ["ENG4U"], [], null);
  P("mru", "Nursing", "BN", "nursing", NURSE, [ONE_MATH], null);
  P("mru", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("mru", "Journalism and Digital Media", "BCMM", "communication", ["ENG4U"], [], null);
  P("uleth", "Neuroscience", "BSc", "life_sci", BIO, [], null);
  P("uleth", "Management", "BMgt", "business", ["ENG4U"], [ONE_MATH], null);
  P("uleth", "Fine Arts", "BFA", "fine_arts", ["ENG4U"], [], null, { supp: "Portfolio or audition" });

  // ---------------- Saskatchewan ----------------
  P("usask", "Engineering", "BE", "engineering", ENGR, [], [80, 87]);
  P("usask", "Agriculture and Bioresources", "BSA", "agriculture", ["ENG4U", "MHF4U", "SCH4U"], [[1, ["SBI4U", "SPH4U"]]], null);
  P("usask", "Nursing", "BSN", "nursing", NURSE, [ONE_MATH], null);
  P("usask", "Commerce (Edwards)", "BComm", "business", ["ENG4U", "MHF4U"], [], null);
  P("usask", "Kinesiology", "BSc Kin", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], null);
  P("uregina", "Engineering", "BASc", "engineering", ENGR, [], null);
  P("uregina", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("uregina", "Social Work", "BSW", "social_work", ["ENG4U"], [], null);
  P("uregina", "Journalism", "BAJ", "communication", ["ENG4U"], [], null);

  // ---------------- Manitoba ----------------
  P("umanitoba", "Engineering", "BSc Eng", "engineering", ENGR, [], [82, 87]);
  P("umanitoba", "Computer Science", "BSc", "cs", CS, [], null);
  P("umanitoba", "Commerce (Asper)", "BComm", "business", ["ENG4U", "MHF4U"], [], null);
  P("umanitoba", "Nursing", "BN", "nursing", NURSE, [ONE_MATH], null);
  P("umanitoba", "Agriculture", "BSc Agr", "agriculture", ["ENG4U", "MHF4U", "SCH4U"], [], null);
  P("uwinnipeg", "Environmental Studies", "BA/BSc", "env_sci", ["ENG4U"], [], null);
  P("uwinnipeg", "Kinesiology", "BKin", "kinesiology", ["ENG4U", "SBI4U"], [], null);
  P("uwinnipeg", "Education", "BEd", "education", ["ENG4U"], [], null);

  // ---------------- McGill ----------------
  P("mcgill", "Engineering", "BEng", "engineering", ENGR, [], [90, 95]);
  P("mcgill", "Science (incl. Computer Science)", "BSc", "physical_sci", ["ENG4U", "MHF4U", "MCV4U"], [[2, SCI3]], [90, 95]);
  P("mcgill", "Management (Desautels)", "BCom", "business", ["ENG4U", "MCV4U"], [], [90, 95]);
  P("mcgill", "Arts", "BA", "humanities", ["ENG4U"], [], [88, 93]);
  P("mcgill", "Arts and Science", "BA&Sc", "humanities", ["ENG4U", "MHF4U", "MCV4U"], [[2, SCI3]], [92, 96]);
  P("mcgill", "Kinesiology", "BSc", "kinesiology", ["ENG4U", "MCV4U", "SBI4U"], [[1, ["SCH4U", "SPH4U"]]], [88, 93]);
  P("mcgill", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [88, 93]);
  P("mcgill", "Music (Schulich School of Music)", "BMus", "fine_arts", ["ENG4U"], [], null, { supp: "Audition required" });
  P("mcgill", "Architecture", "BSc (Arch)", "architecture", ENGR, [], [90, 95], { supp: "Portfolio" });

  // ---------------- Concordia ----------------
  P("concordia", "Engineering (Gina Cody)", "BEng", "engineering", ENGR, [], [80, 87]);
  P("concordia", "Computer Science (Gina Cody)", "BCompSc", "cs", CS, [], [80, 87]);
  P("concordia", "Commerce (John Molson)", "BComm", "business", ["ENG4U", "MHF4U"], [], [82, 87]);
  P("concordia", "Film Production (Mel Hoppenheim)", "BFA", "fine_arts", ["ENG4U"], [], null, { supp: "Portfolio and letter of intent" });
  P("concordia", "Journalism", "BA", "communication", ["ENG4U"], [], null, { supp: "Supplementary application" });
  P("concordia", "Psychology", "BA/BSc", "psychology", ["ENG4U"], [], [78, 84]);

  // ---------------- Bishop's ----------------
  P("bishops", "Business Administration (Williams School)", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("bishops", "Education", "BEd", "education", ["ENG4U"], [], null);
  P("bishops", "Arts and Sciences", "BA/BSc", "general_arts", ["ENG4U"], [], null);

  // ---------------- Laval / UdeM ----------------
  P("ulaval", "Génie (Engineering)", "BIng", "engineering", ["MHF4U", "MCV4U", "SCH4U", "SPH4U"], [FR], null, FRENCH);
  P("ulaval", "Sciences infirmières (Nursing)", "BScInf", "nursing", ["SBI4U", "SCH4U"], [FR, ONE_MATH], null, FRENCH);
  P("ulaval", "Administration des affaires (Business)", "BAA", "business", [], [FR, ONE_MATH], null, FRENCH);
  P("umontreal", "Polytechnique Montréal — Génie (Engineering)", "BIng", "engineering", ["MHF4U", "MCV4U", "SCH4U", "SPH4U"], [FR], null, FRENCH);
  P("umontreal", "HEC Montréal — Administration des affaires (Business)", "BAA", "business", ["MHF4U"], [FR], null, FRENCH);
  P("umontreal", "Psychologie (Psychology)", "BSc", "psychology", [], [FR], null, FRENCH);

  // ---------------- New Brunswick ----------------
  P("unb", "Engineering", "BScE", "engineering", ENGR, [], null);
  P("unb", "Computer Science", "BCS", "cs", CS, [], null);
  P("unb", "Nursing", "BN", "nursing", NURSE, [ONE_MATH], null);
  P("unb", "Forestry", "BScF", "env_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], null);
  P("unb", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("mta", "Science", "BSc", "life_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], null);
  P("mta", "Commerce", "BComm", "business", ["ENG4U"], [ONE_MATH], null);
  P("mta", "Arts", "BA", "humanities", ["ENG4U"], [], null);
  P("umoncton", "Génie (Engineering)", "BIng", "engineering", ["MHF4U", "MCV4U", "SCH4U", "SPH4U"], [FR], null, FRENCH);
  P("umoncton", "Sciences infirmières (Nursing)", "BScInf", "nursing", ["SBI4U", "SCH4U"], [FR, ONE_MATH], null, FRENCH);

  // ---------------- Nova Scotia ----------------
  P("dal", "Engineering", "BEng", "engineering", ENGR, [], [80, 87]);
  P("dal", "Computer Science", "BCS", "cs", CS, [], [80, 87]);
  P("dal", "Science", "BSc", "life_sci", ["ENG4U", "MHF4U"], [[2, SCI3]], [78, 85]);
  P("dal", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], [85, 90]);
  P("dal", "Commerce (Co-op)", "BComm", "business", ["ENG4U", "MHF4U"], [], [78, 84]);
  P("dal", "Kinesiology", "BSc Kin", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH, [1, ["SCH4U", "SPH4U"]]], [78, 84]);
  P("dal", "Ocean Sciences", "BSc", "env_sci", ["ENG4U", "MHF4U"], [[2, SCI3]], null);
  P("acadia", "Kinesiology", "BKin", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], null);
  P("acadia", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("acadia", "Biology", "BSc", "life_sci", BIO, [], null);
  P("stfx", "Business Administration (Gerald Schwartz)", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("stfx", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], null);
  P("stfx", "Human Kinetics", "BSc HK", "kinesiology", ["ENG4U", "SBI4U"], [ONE_MATH], null);
  P("smu", "Commerce (Sobey)", "BComm", "business", ["ENG4U"], [ONE_MATH], null);
  P("smu", "Science", "BSc", "physical_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], null);

  // ---------------- PEI / Newfoundland ----------------
  P("upei", "Sustainable Design Engineering", "BScSDE", "engineering", ENGR, [], null);
  P("upei", "Nursing", "BScN", "nursing", NURSE, [ONE_MATH], null);
  P("upei", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("upei", "Biology (pre-veterinary route)", "BSc", "life_sci", BIO, [], null, { note: "UPEI is home to the Atlantic Veterinary College, which you apply to after pre-vet university courses." });
  P("mun", "Engineering", "BEng", "engineering", ENGR, [], null, { note: "Includes ocean and naval architectural engineering, which few Canadian schools offer." });
  P("mun", "Computer Science", "BSc", "cs", CS, [], null);
  P("mun", "Nursing", "BN", "nursing", NURSE, [ONE_MATH], null);
  P("mun", "Business Administration", "BBA", "business", ["ENG4U"], [ONE_MATH], null);
  P("mun", "Ocean Sciences", "BSc", "env_sci", ["ENG4U", "MHF4U"], [[1, SCI3]], null);
})();
