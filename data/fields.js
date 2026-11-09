// Fields of study. Each university program points at one field.
// "about" and "jobs" describe the field in general; program pages add program-specific notes.
// "ecs" are extracurricular ideas that commonly strengthen applications in this field.
// They are general guidance, NOT quotes from specific students; sourced student examples
// go in data/community.js once collected (see README "Data sources").
window.FIELDS = {
  engineering: {
    name: "Engineering",
    about: "Engineering programs teach you to design, build and test real systems using math and physics. First year is usually a common core (calculus, linear algebra, physics, chemistry, programming, design), then you specialize. Programs are accredited by Engineers Canada, which is the first step to becoming a licensed Professional Engineer (P.Eng.).",
    jobs: ["Professional Engineer (P.Eng.)", "Design / project engineer", "Manufacturing or process engineer", "Systems or controls engineer", "Technical consultant", "Product manager", "Engineering researcher (with grad school)"],
    ecs: ["Robotics teams (FIRST Robotics, VEX) — especially leadership or a specific build role", "Personal engineering projects: Arduino/Raspberry Pi builds, 3D-printed designs, a documented project on GitHub or a blog", "Math and physics contests (Euclid, CEMC contests, Physics Olympiad, OAPT)", "Science fairs (regional fair, Canada-Wide Science Fair)", "STEM clubs you started or lead; tutoring math/physics", "Part-time jobs showing responsibility, especially technical ones (repair shop, IT help)", "Hackathons and summer programs (e.g. SHAD, Waterloo/Queen's engineering camps)"]
  },
  software: {
    name: "Software Engineering",
    about: "Software engineering combines computer science with engineering practice: building large, reliable software systems, working in teams, testing, and project management. It is an accredited engineering degree, so you also take engineering science courses.",
    jobs: ["Software engineer / developer", "Backend, frontend or mobile developer", "DevOps / site reliability engineer", "Embedded software engineer", "Technical lead or engineering manager", "Founder of a software startup"],
    ecs: ["Shipped software projects (apps, websites, games) on GitHub", "Competitive programming (CCC, USACO, DMOJ)", "Hackathons (Hack the North, local high-school hackathons)", "Robotics programming lead", "Starting or running a coding club, teaching younger students to code", "Freelance or part-time tech jobs, building a website for a local business"]
  },
  cs: {
    name: "Computer Science",
    about: "Computer science studies how computation works and how to use it: programming, algorithms, data structures, theory, systems, AI and machine learning. Most programs let you pair CS with math, business or another subject, and many offer co-op.",
    jobs: ["Software developer", "Data scientist / machine learning engineer", "Cybersecurity analyst", "Game developer", "Quantitative developer", "Researcher (with grad school)", "IT consultant"],
    ecs: ["Canadian Computing Competition (CCC) and other programming contests", "Personal coding projects on GitHub (apps, games, bots, websites)", "Hackathons", "CEMC math contests (Euclid is used by Waterloo)", "Coding club leadership, tutoring, teaching Scratch/Python to kids", "Tech-related part-time jobs or volunteering"]
  },
  math: {
    name: "Mathematics & Statistics",
    about: "Math programs cover pure math (proofs, algebra, analysis), applied math, statistics, actuarial science and combinatorics. They are excellent preparation for finance, data, tech and research careers.",
    jobs: ["Actuary", "Statistician / data analyst", "Quantitative analyst (finance)", "Data scientist", "Teacher (with B.Ed.)", "Operations research analyst", "Cryptographer / researcher"],
    ecs: ["Math contests (Euclid, CSMC, CIMC, COMC, Canadian Math Olympiad)", "Math club leadership, tutoring", "Data or coding projects", "Summer math camps (e.g. Canada/USA Mathcamp, CEMC workshops)", "Part-time jobs involving numbers (cashier, bookkeeping help)"]
  },
  business: {
    name: "Business & Commerce",
    about: "Business programs (BBA, BCom) teach accounting, finance, marketing, management, operations, economics and strategy. Many include case competitions, co-op or internships, and let you specialize in later years.",
    jobs: ["Accountant (CPA)", "Financial analyst", "Investment banking / consulting analyst", "Marketing or brand manager", "Human resources specialist", "Entrepreneur", "Supply chain / operations manager"],
    ecs: ["DECA, FBLA/BPA or other business case competitions", "Starting a small business or side hustle (reselling, tutoring business, services)", "Junior Achievement (JA) company program", "Student council / club executive roles with budgets and events", "Part-time jobs (retail, food service) — they show work ethic and customer skills", "Investment or finance clubs, stock market challenges", "Volunteering in leadership roles (organizing fundraisers)"]
  },
  accounting: {
    name: "Accounting & Finance",
    about: "Accounting and financial management programs focus on financial reporting, auditing, tax, corporate finance and analytics, and are often designed to meet CPA education requirements. Several include paid co-op terms.",
    jobs: ["Chartered Professional Accountant (CPA)", "Auditor", "Tax specialist", "Financial analyst", "Controller / CFO (later career)", "Forensic accountant"],
    ecs: ["DECA (finance and accounting events)", "Treasurer role in a club or student council", "Part-time job handling cash or bookkeeping", "Investment club / stock challenges", "Math contests", "Small business you run with real revenue and expenses"]
  },
  economics: {
    name: "Economics",
    about: "Economics studies how people, firms and governments make choices about scarce resources. You learn micro- and macroeconomics, econometrics (statistics with data) and policy analysis.",
    jobs: ["Economist or policy analyst", "Financial analyst", "Data analyst", "Consultant", "Banking", "Law (after law school)", "Government research officer"],
    ecs: ["Economics or business clubs, case competitions", "Model UN / debate", "Investment challenges", "Writing about economic issues (school paper, blog)", "Part-time jobs"]
  },
  life_sci: {
    name: "Life Sciences & Biology",
    about: "Life science programs study living systems: cell and molecular biology, genetics, physiology, biochemistry, ecology and neuroscience. They are a common route to medicine, dentistry, pharmacy and research.",
    jobs: ["Research technician / scientist", "Doctor, dentist or optometrist (after professional school)", "Pharmacist (after pharmacy school)", "Lab technologist", "Biotech or pharmaceutical industry roles", "Public health officer", "Science teacher (with B.Ed.)"],
    ecs: ["Science fairs and biology olympiads (Canadian Biology Olympiad / CBO)", "Hospital, long-term care or clinic volunteering", "Research or lab summer programs", "Science club leadership, tutoring", "St. John Ambulance / first-aid certification, lifeguarding", "Part-time jobs (any) — consistency matters"]
  },
  health_sci: {
    name: "Health Sciences",
    about: "Health sciences programs look at health from biological, social and population perspectives: anatomy, physiology, epidemiology, health policy, research methods and inquiry-based learning. Many students use them as a path to medicine or other health professions.",
    jobs: ["Physician, dentist, physiotherapist, OT (after professional school)", "Health policy analyst", "Epidemiologist / public health", "Clinical research coordinator", "Health promotion specialist", "Healthcare administrator"],
    ecs: ["Hospital or community health volunteering", "Starting a health-awareness or mental-health initiative at school", "Research projects or science fairs", "Leadership in clubs (HOSA, Red Cross, Best Buddies)", "Work or volunteering with seniors or people with disabilities", "Sports coaching or refereeing"]
  },
  nursing: {
    name: "Nursing",
    about: "BScN nursing programs prepare you to become a Registered Nurse. You study anatomy, pharmacology, health assessment and nursing theory, and do clinical placements in hospitals and community settings. Graduates write the NCLEX-RN licensing exam.",
    jobs: ["Registered Nurse (hospital, community, long-term care)", "Public health nurse", "Nurse practitioner (with a master's)", "Nurse educator", "Clinical research nurse"],
    ecs: ["Volunteering in hospitals, long-term care homes or clinics", "Caregiving experience (family or paid)", "First aid / CPR certification", "Health-related clubs (HOSA)", "Part-time jobs working with people (PSW, camp counsellor)"]
  },
  kinesiology: {
    name: "Kinesiology & Health",
    about: "Kinesiology studies human movement: anatomy, exercise physiology, biomechanics, motor learning, sport psychology and health promotion. It leads to many health careers and to professional programs like physiotherapy.",
    jobs: ["Kinesiologist", "Physiotherapist or chiropractor (after grad/professional school)", "Strength and conditioning coach", "Ergonomist", "Health and wellness coordinator", "Physical education teacher (with B.Ed.)"],
    ecs: ["Varsity or club sports (especially leadership/captain roles)", "Coaching, refereeing or lifeguarding (NLS)", "Physio or rehab clinic volunteering", "Personal trainer certification or gym work", "Organizing school sports events"]
  },
  physical_sci: {
    name: "Physical Sciences",
    about: "Physical science programs cover physics, chemistry, earth sciences and astronomy. You build strong math and lab skills and can move into research, industry or teaching.",
    jobs: ["Physicist / chemist (research or industry)", "Lab or quality-control scientist", "Geoscientist", "Materials scientist", "Data analyst", "Teacher (with B.Ed.)"],
    ecs: ["Physics and chemistry olympiads/contests (CAP, Chem 13 News, SIN/Avogadro)", "Science fairs", "Astronomy club, building telescopes", "Research summer programs", "Tutoring science"]
  },
  env_sci: {
    name: "Environmental Science & Sustainability",
    about: "Environmental programs study ecosystems, climate, water, resources and sustainability from scientific, policy and social angles. Fieldwork is common.",
    jobs: ["Environmental consultant", "Conservation officer / ecologist", "Sustainability coordinator", "Climate policy analyst", "GIS analyst", "Environmental assessment specialist"],
    ecs: ["Environmental or eco club leadership (EcoSchools)", "Conservation volunteering (tree planting, shoreline clean-ups)", "Envirothon competition", "Science fairs on environmental topics", "Outdoor jobs (camp counsellor, parks)"]
  },
  psychology: {
    name: "Psychology",
    about: "Psychology studies behaviour and the mind: development, cognition, social psychology, mental health, neuroscience and research methods. A BA leans toward social science; a BSc leans toward biology and neuroscience.",
    jobs: ["Psychologist (after a PhD/master's)", "Counsellor or therapist (after a master's)", "Human resources", "User experience (UX) researcher", "Social services worker", "Research assistant"],
    ecs: ["Peer support / mentorship programs", "Volunteering with kids, seniors or mental-health organizations", "Psychology or mental-health awareness club", "Research-type projects or science fairs on behaviour", "Part-time work with people (camp, tutoring)"]
  },
  social_sci: {
    name: "Social Sciences",
    about: "Social sciences study societies and people: sociology, political science, criminology, anthropology, geography and more. You build research, writing and critical-thinking skills.",
    jobs: ["Policy analyst", "Social worker (with BSW/MSW)", "Police, corrections or justice roles", "Lawyer (after law school)", "Researcher", "Community or non-profit coordinator", "Teacher (with B.Ed.)"],
    ecs: ["Model UN, debate, mock trial", "Student council or advocacy groups", "Community volunteering (food banks, shelters)", "Writing for the school paper", "Part-time jobs"]
  },
  humanities: {
    name: "Humanities & Arts",
    about: "Humanities programs study human culture and ideas: English, history, philosophy, languages, religion and classics. They build strong writing, argument and analysis skills valued in many careers.",
    jobs: ["Writer, editor or communications specialist", "Lawyer (after law school)", "Teacher (with B.Ed.)", "Policy or research analyst", "Museum, library or archives roles", "Marketing and content strategy"],
    ecs: ["Writing contests, school paper or literary magazine", "Debate and public speaking", "Book clubs, history clubs", "Language learning and exchanges", "Volunteering and part-time jobs"]
  },
  communication: {
    name: "Communication, Media & Journalism",
    about: "Media and journalism programs teach reporting, writing, digital media production, public relations and media studies, often with hands-on labs and internships.",
    jobs: ["Journalist / reporter", "Public relations or communications specialist", "Social media manager", "Content creator / producer", "Marketing coordinator", "Video or podcast producer"],
    ecs: ["School newspaper, yearbook or radio", "Running a YouTube channel, blog or podcast", "Photography or videography projects", "Social media for a club or local business", "Writing contests"]
  },
  law_society: {
    name: "Law, Justice & Criminology",
    about: "Undergraduate law and criminology programs study the legal system, justice, crime and policy. In Canada, becoming a lawyer requires an undergraduate degree followed by a 3-year JD at law school.",
    jobs: ["Lawyer (after law school)", "Paralegal / law clerk", "Police officer", "Probation or corrections officer", "Policy analyst", "Victim services or court roles"],
    ecs: ["Mock trial, debate, Model UN", "Volunteering in legal clinics or community organizations", "Student council / advocacy", "Writing for the school paper"]
  },
  education: {
    name: "Education (Teaching)",
    about: "Concurrent education programs let you earn a subject degree and a Bachelor of Education together, leading to certification with the Ontario College of Teachers.",
    jobs: ["Elementary or secondary teacher", "Early childhood educator", "Educational assistant / tutor", "Curriculum developer", "School administrator (later career)"],
    ecs: ["Tutoring and peer mentoring", "Camp counsellor, coaching or swim instruction", "Volunteering in classrooms or after-school programs", "Leadership in clubs"]
  },
  fine_arts: {
    name: "Fine Arts, Music & Design",
    about: "Arts programs develop your creative practice in visual art, design, music, theatre, dance or film, along with art history and theory. Most require a portfolio or audition.",
    jobs: ["Artist, musician or performer", "Graphic or UX/UI designer", "Animator / illustrator", "Art teacher (with B.Ed.)", "Arts administrator", "Film and media production"],
    ecs: ["A strong portfolio — your best recent work matters most", "School plays, bands, choirs, art shows", "Private lessons, RCM exams", "Commissions or freelance design work", "Art competitions and exhibitions"]
  },
  architecture: {
    name: "Architecture & Planning",
    about: "Architecture and planning programs teach design studio, building technology, history and urban planning. Architecture programs usually require a portfolio or design exercise.",
    jobs: ["Architect (after an accredited M.Arch)", "Urban planner", "Interior or landscape designer", "Design technologist", "Real estate development"],
    ecs: ["Drawing, model-making and design portfolio", "CAD / 3D modelling projects", "Art and design competitions", "Volunteering with Habitat for Humanity"]
  },
  pharmacy: {
    name: "Pharmacy",
    about: "PharmD programs train pharmacists in pharmacology, medicinal chemistry, patient care and pharmacy practice, with experiential placements.",
    jobs: ["Community or hospital pharmacist", "Pharmaceutical industry roles", "Clinical research", "Regulatory affairs"],
    ecs: ["Pharmacy or healthcare volunteering", "Part-time work as a pharmacy assistant", "Science contests and fairs", "Leadership roles"]
  },
  social_work: {
    name: "Social Work",
    about: "BSW programs prepare you to support individuals, families and communities facing challenges, through social policy, counselling skills and field placements.",
    jobs: ["Social worker", "Child protection worker", "Community outreach worker", "Mental health and addictions worker", "Policy analyst"],
    ecs: ["Volunteering at shelters, food banks or youth programs", "Peer support roles", "Advocacy and equity clubs", "Caregiving responsibilities"]
  },
  aviation: {
    name: "Aviation",
    about: "Aviation programs combine a university degree with flight training toward a commercial pilot licence.",
    jobs: ["Commercial or airline pilot", "Flight instructor", "Aviation operations / management"],
    ecs: ["Air Cadets", "Flying lessons or ground school", "Aviation club"]
  },
  agriculture: {
    name: "Agriculture & Food",
    about: "Agriculture and food science programs study crops, animals, soil, food production and agri-business.",
    jobs: ["Agronomist", "Food scientist", "Agri-business manager", "Animal care / veterinary (after DVM)"],
    ecs: ["4-H clubs", "Farm work", "Science fairs", "Food bank or community garden volunteering"]
  },
  general_arts: {
    name: "General Arts & Social Science",
    about: "General arts and social science entries let you explore several subjects in first year before declaring a major.",
    jobs: ["Depends on your chosen major — see related fields"],
    ecs: ["Any sustained activity you care about", "Part-time jobs and volunteering"]
  }
};
