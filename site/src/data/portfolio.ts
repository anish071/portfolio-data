/** Central portfolio content, based on Anish Kumar Tiwari's two supplied resumes. */
export type Palette = { from: string; via: string; to: string; accent: string };
const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const profile = {
  fullName: 'Anish Kumar Tiwari', displayName: 'Anish Tiwari', firstName: 'ANISH', seriesTag: 'THE SERIES',
  originalLabel: 'ANISH TIWARI ORIGINAL', role: 'Data Analyst | Data Science | AI/ML Engineer',
  tagline: ['Data Analytics', 'Data Science', 'AI / ML'],
  intro: 'B.Tech Computer Science and Engineering graduate with hands-on experience in Python, SQL, data analysis and machine learning. Experienced in data cleaning, EDA, feature engineering, dashboards and predictive modelling through retail, telecom and ML audit projects.',
  location: 'Ranchi, Jharkhand, India', email: 'at4344958@gmail.com', phone: '7762953029',
  links: { linkedin: 'https://www.linkedin.com/in/anish-kumar-tiwari-90412a2b6/', github: 'https://github.com/anish071', portfolio: 'https://anish071.github.io/portfolio2.0/' },
  resumePdf: '/assets/Anish_Data_Analyst_Resume.pdf',
  resumes: [
    { label: 'Data Analyst Resume', file: '/assets/Anish_Data_Analyst_Resume.pdf', download: 'Anish_Data_Analyst_Resume.pdf', description: 'SQL, Python, Power BI, Tableau, Excel and analytics projects.' },
    { label: 'AI / ML Resume', file: '/assets/Anish_AI_ML_Resume.pdf', download: 'Anish_AI_ML_Resume.pdf', description: 'Data Science, machine learning, deep learning and AI/ML projects.' },
  ],
  portrait: { src: '/assets/anish-portrait-1086.webp', srcSet: '/assets/anish-portrait-420.webp 420w, /assets/anish-portrait-720.webp 720w, /assets/anish-portrait-1086.webp 1086w', alt: 'Anish Kumar Tiwari, Data Analyst and AI/ML Engineer' },
  interests: ['Data Analytics', 'Machine Learning', 'Deep Learning', 'Business Intelligence'],
};

export const education = [
  { school: 'Usha Martin University', place: 'Ranchi', degree: 'B.Tech — Computer Science and Engineering', period: '2022 – 2026', score: 'Graduated' },
  { school: 'Digichrome Academy', place: 'India', degree: 'Data Science and AI/ML', period: 'Feb 2026 – Jan 2027', score: 'Currently Pursuing' },
  { school: 'NPTEL, IIT Kharagpur', place: 'Online', degree: 'Cloud Computing', period: 'Jan 2026 – Apr 2026', score: 'Completed' },
];
export const experience = [
  { company: 'NextHike IT Solutions', role: 'Data Science and AI/ML Intern', place: 'India', period: 'May 2026 – Present', points: ['Apply Python, SQL, data analysis and machine learning to assigned data science and AI/ML project tasks.', 'Gain practical industry experience through real-world project tasks and collaboration with cross-functional teams.'] },
  { company: 'Tata Steel, West Bokaro', role: 'Full Stack Development Trainee', place: 'West Bokaro', period: 'Jul 2025 – Sep 2025', points: ['Developed and maintained web applications and REST APIs with cross-functional engineering teams.', 'Integrated database systems and participated in code reviews and software testing.'] },
];
export type Metric = { value: string; label: string };
export type Project = { id: string; title: string; year: string; genre: string; logline: string; stack: string[]; build: string[]; features: string[]; metrics: Metric[]; github?: string; palette: Palette; motif: 'shield' | 'flow' | 'tenants' };
export const projects: Project[] = [
  { id: 'rossmann-sales-forecasting', title: 'Rossmann Sales Forecasting', year: '2026', genre: 'Retail Analytics • Forecasting', logline: 'A retail forecasting workflow using store-level sales, promotions, holidays and customer data.', stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Data Visualization'], build: ['Analyzed more than one million retail training records with store-level information.', 'Performed data cleaning, exploratory data analysis and feature engineering on promotions, holidays, stores and customer behavior.', 'Developed a sales forecasting workflow and prepared predictions and visualizations for retail business forecasting.'], features: ['Retail sales EDA', 'Promotion and holiday analysis', 'Feature engineering', 'Sales prediction workflow', 'Forecast visualizations'], metrics: [{ value: '1M+', label: 'training records' }, { value: '2013–15', label: 'training date range' }, { value: '41K+', label: 'test records' }], github: 'https://github.com/anish071/Rossmann_AI_Forecasting', palette: crimson, motif: 'flow' },
  { id: 'telecom-user-analytics', title: 'User Analytics in the Telecommunication Industry', year: '2026', genre: 'Data Analytics • Customer Insights', logline: 'Telecom xDR analysis across user overview, engagement, experience and satisfaction.', stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'MySQL', 'Dashboard'], build: ['Analyzed telecom xDR data to identify customer behavior and business insights.', 'Performed data cleaning, EDA, correlation analysis, PCA, K-means clustering and engagement/experience scoring.', 'Built satisfaction analysis with regression, exported final user scores to MySQL and prepared a web-based dashboard/report for decision-making.'], features: ['Data cleaning and EDA', 'Correlation analysis', 'PCA and K-means clustering', 'Engagement and experience scoring', 'MySQL export and dashboard/report'], metrics: [{ value: 'xDR', label: 'telecom data analysis' }, { value: 'PCA', label: 'dimensionality reduction' }, { value: 'SQL', label: 'user scores exported' }], github: 'https://github.com/anish071/test', palette: ocean, motif: 'tenants' },
  { id: 'model-doctor', title: 'Model Doctor — Automated ML Audit Toolkit', year: '2026', genre: 'Machine Learning • Model Auditing', logline: 'A Python toolkit that detects common machine-learning pipeline issues and produces structured audit reports.', stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'], build: ['Built a Python-based ML auditing toolkit to detect data leakage, train/test contamination, misleading metrics and overfitting signals.', 'Designed structured audit reports explaining the issue, why it matters and suggested fixes, with deliberately flawed pipelines used as test fixtures.', 'Designed the auditor to support arbitrary tabular datasets and multiple model types rather than a single hardcoded demo.'], features: ['Leakage detection', 'Train/test contamination checks', 'Metrics and overfitting checks', 'Data-quality and class-imbalance checks', 'Structured audit report'], metrics: [{ value: '6', label: 'audit detectors' }, { value: '6/6', label: 'tests passed in project checks' }, { value: 'HTML', label: 'audit report' }], github: 'https://github.com/anish071/model-doctor', palette: violet, motif: 'shield' },
  { id: 'property-price-prediction', title: 'Capstone — Predicting Property Prices', year: '2026', genre: 'Machine Learning • Regression', logline: 'A real-estate modelling project comparing regression algorithms to estimate property prices.', stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'], build: ['Collected and cleaned real-estate data and engineered features including area, location, BHK, bathrooms and amenities.', 'Handled outliers and compared Linear Regression, Random Forest and XGBoost models to generate pricing insights.'], features: ['Data cleaning', 'Feature engineering', 'Outlier handling', 'Model comparison', 'Pricing insights'], metrics: [{ value: '3', label: 'models compared' }, { value: 'BHK', label: 'property feature' }, { value: 'XGBoost', label: 'model evaluated' }], palette: jade, motif: 'flow' },
  { id: 'cropguard-ai', title: 'CropGuard AI — Crop Disease Detection Platform', year: '2026', genre: 'AI • Deep Learning • Web App', logline: 'A crop disease detection platform combining a CNN model with an application and analytics dashboard.', stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'CNN'], build: ['Built a full-stack crop disease detection platform using a CNN image classification model, achieving approximately 92% accuracy on offline inference.', 'Developed REST APIs with FastAPI, integrated PostgreSQL and designed an analytics dashboard for prediction reports and recommendations.'], features: ['CNN image classification', 'FastAPI REST APIs', 'PostgreSQL integration', 'Prediction reports', 'Recommendations dashboard'], metrics: [{ value: '~92%', label: 'offline inference accuracy' }, { value: 'CNN', label: 'image classification' }, { value: 'API', label: 'FastAPI backend' }], github: 'https://github.com/anish071/Ai-Crop', palette: amber, motif: 'shield' },
];
export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export const achievements: Achievement[] = [
  { id: 'btech', title: 'B.Tech Graduate', org: 'Usha Martin University', detail: 'Completed a Bachelor of Technology in Computer Science and Engineering in 2026.', laurel: 'Education' },
  { id: 'internship', title: 'AI/ML Intern', org: 'NextHike IT Solutions', detail: 'Working on assigned data science, analytics and machine-learning project tasks.', laurel: 'Experience' },
  { id: 'project-work', title: 'Hands-on Projects', org: 'Analytics & AI/ML', detail: 'Portfolio projects cover retail forecasting, telecom user analytics, ML auditing, property prices and crop disease detection.', laurel: 'Project Work' },
];
export type Certification = { issuer: string; name: string; link: string };
export const certifications: Certification[] = [
  { issuer: 'NPTEL · IIT Kharagpur', name: 'Cloud Computing (Jan 2026 – Apr 2026)', link: 'https://nptel.ac.in/' },
  { issuer: 'Digichrome Academy', name: 'Data Science and AI/ML — Currently Pursuing', link: 'https://www.linkedin.com/in/anish-kumar-tiwari-90412a2b6/' },
];
export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
const skills = (items: string[]) => items.map(name => ({ name, mono: name.split(/[^A-Za-z0-9]/)[0].slice(0, 2) || name.slice(0, 2) }));
export const skillCategories: SkillCategory[] = [
  { id: 'languages', title: 'Programming', subtitle: 'Programming languages', skills: skills(['Python', 'SQL', 'C++', 'C', 'JavaScript', 'HTML', 'CSS', 'Kotlin']) },
  { id: 'analysis', title: 'Data Analysis', subtitle: 'Data preparation and analysis', skills: skills(['Pandas', 'NumPy', 'Excel (Advanced)', 'EDA', 'Data Cleaning', 'Feature Engineering', 'Data Transformation']) },
  { id: 'visualization', title: 'Visualization & BI', subtitle: 'Dashboards and reporting', skills: skills(['Power BI', 'Tableau', 'Excel Charts', 'Pivot Tables', 'Dashboards', 'Matplotlib', 'Seaborn']) },
  { id: 'databases', title: 'Databases', subtitle: 'Querying and data storage', skills: skills(['MySQL', 'PostgreSQL', 'SQL', 'Room']) },
  { id: 'ml', title: 'Statistics & ML', subtitle: 'Modelling and statistical analysis', skills: skills(['Descriptive Statistics', 'Hypothesis Testing', 'Correlation Analysis', 'Regression', 'Classification', 'Scikit-learn', 'Random Forest', 'XGBoost', 'PCA', 'K-Means']) },
  { id: 'ai', title: 'Deep Learning & AI', subtitle: 'AI application development', skills: skills(['CNN', 'LSTM', 'Transfer Learning', 'Fine-Tuning', 'LangChain', 'Multi-Agent Systems', 'Prompt Engineering']) },
  { id: 'tools', title: 'Tools', subtitle: 'Development and analysis tools', skills: skills(['Jupyter Notebook', 'Google Colab', 'VS Code', 'Git', 'GitHub', 'FastAPI', 'React']) },
];
export const skillEvidence: Record<string, string[]> = { Python: ['Rossmann Sales Forecasting', 'Model Doctor', 'Telecom User Analytics'], SQL: ['Telecom User Analytics', 'MySQL'], Excel: ['Data Analyst resume'], 'Power BI': ['Data Analyst resume'], Tableau: ['Data Analyst resume'], 'Scikit-learn': ['Model Doctor', 'Property Price Prediction', 'Rossmann Sales Forecasting'] };
export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
export const seasons: Season[] = [
  { number: 1, title: 'The Foundation', period: '2022 – 2026', synopsis: 'B.Tech in Computer Science and Engineering at Usha Martin University, Ranchi.', episodes: [{ code: 'S01 E01', title: 'Computer Science Graduate', description: 'Completed B.Tech in Computer Science and Engineering in 2026.', tags: ['B.Tech', 'CSE'], runtime: '2022 – 2026', palette: violet }] },
  { number: 2, title: 'Into Data Science', period: '2026 – 2027', synopsis: 'Currently pursuing Data Science and AI/ML at Digichrome Academy.', episodes: [{ code: 'S02 E01', title: 'The Analyst', description: 'Building practical skills across Python, SQL, data cleaning, EDA and visualisation.', tags: ['Python', 'SQL', 'EDA'], runtime: 'Feb 2026 – Jan 2027', palette: ocean }, { code: 'S02 E02', title: 'The ML Learner', description: 'Exploring predictive modelling, classification, regression and deep-learning workflows.', tags: ['Scikit-learn', 'CNN', 'LSTM'], runtime: 'Currently pursuing', palette: jade }] },
  { number: 3, title: 'Industry Experience', period: '2025 – Present', synopsis: 'Internship experience in data science and AI/ML alongside prior full-stack training.', episodes: [{ code: 'S03 E01', title: 'The Intern', description: 'Data Science and AI/ML Intern at NextHike IT Solutions.', tags: ['Data Science', 'AI/ML'], runtime: 'May 2026 – Present', palette: crimson }, { code: 'S03 E02', title: 'The Trainee', description: 'Full Stack Development Trainee at Tata Steel, West Bokaro; worked with web applications, REST APIs and databases.', tags: ['REST APIs', 'Databases', 'Testing'], runtime: 'Jul 2025 – Sep 2025', palette: amber }] },
  { number: 4, title: 'Building with Data', period: '2026', synopsis: 'Projects applying analytics and machine learning to retail, telecom, property and crop-health use cases.', episodes: [{ code: 'S04 E01', title: 'Retail Forecasting', description: 'Rossmann sales forecasting using more than one million training records.', tags: ['Retail', 'Forecasting'], runtime: '2026', palette: crimson }, { code: 'S04 E02', title: 'Telecom Insights', description: 'User engagement, experience and satisfaction analysis with Python, clustering and MySQL.', tags: ['EDA', 'PCA', 'K-Means'], runtime: '2026', palette: ocean }, { code: 'S04 E03', title: 'Model Doctor', description: 'Automated checks for data leakage, contamination, metrics and overfitting signals.', tags: ['Auditing', 'Scikit-learn'], runtime: '2026', palette: violet }] },
];
export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export const topPicks: TopPick[] = [
  { label: 'Retail analytics', title: 'Rossmann', detail: '1M+ training records • Sales forecasting', palette: crimson },
  { label: 'Automated ML audits', title: 'Model Doctor', detail: 'Leakage • Contamination • Overfitting', palette: violet },
  { label: 'Customer insights', title: 'Telecom', detail: 'Engagement • Experience • Satisfaction', palette: ocean },
  { label: 'Deep learning', title: 'CropGuard AI', detail: 'CNN crop disease detection • ~92% offline accuracy', palette: jade },
  { label: 'Regression', title: 'Property Prices', detail: 'Linear Regression • Random Forest • XGBoost', palette: amber },
  { label: 'Data wrangling', title: 'Pandas', detail: 'Cleaning • Transformation • EDA', palette: ocean },
  { label: 'Querying', title: 'SQL', detail: 'MySQL • PostgreSQL', palette: violet },
  { label: 'Dashboards', title: 'Power BI', detail: 'Reporting • Business insights', palette: crimson },
  { label: 'Visualization', title: 'Tableau', detail: 'Data visualization and dashboards', palette: jade },
  { label: 'Current focus', title: 'AI / ML', detail: 'Data Science and Machine Learning', palette: amber },
];
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };
export const introSlides: IntroSlide[] = [
  { kicker: 'Education', title: 'B.Tech · CSE', lines: ['Usha Martin University, Ranchi', '2022 – 2026'], chips: ['Graduated'] },
  { kicker: 'Skills', title: 'Data first.', lines: ['Python, SQL, Pandas, NumPy, Excel', 'Power BI, Tableau, Scikit-learn, CNN, LSTM'], chips: ['Python', 'SQL', 'Power BI', 'Tableau'] },
  { kicker: 'Experience', title: 'Learning in industry', lines: ['Data Science and AI/ML Intern · NextHike IT Solutions', 'Full Stack Development Trainee · Tata Steel, West Bokaro'] },
  { kicker: 'Projects', title: 'Analytics to AI', lines: ['Rossmann Sales Forecasting · Telecom User Analytics', 'Model Doctor · Property Price Prediction · CropGuard AI'] },
  { kicker: 'Current learning', title: 'The next chapter', lines: ['Data Science and AI/ML · Digichrome Academy', 'Cloud Computing · NPTEL, IIT Kharagpur'] },
];
export type ProfileId = 'anish' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';
export const viewerProfiles: { id: ProfileId; name: string; blurb: string; color: string; order: SectionId[] }[] = [
  { id: 'anish', name: 'Anish', blurb: 'The full portfolio, in order', color: '#e5132b', order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'] },
  { id: 'recruiter', name: 'Recruiter', blurb: 'Resumes, experience & skills first', color: '#4cc9ff', order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'] },
  { id: 'developer', name: 'Developer', blurb: 'Projects, stack & GitHub first', color: '#46e3a8', order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'] },
  { id: 'creative', name: 'Creative', blurb: 'The story arc & highlights first', color: '#ffb547', order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'] },
];
export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & training', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Projects', card: 'My Projects', meta: `${projects.length} Projects • 2026`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Key skills and projects', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Highlights', card: 'Highlights', meta: `${achievements.length} Highlights • ${certifications.length} Learning credentials`, palette: crimson },
  story: { nav: 'Resumes', card: 'My Resumes', meta: 'Data Analyst and AI/ML resumes', palette: violet },
};
