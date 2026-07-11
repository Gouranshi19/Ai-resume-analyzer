export const homeData = {
  eyebrow: '01. AI CV ANALYSER',
  title: 'MAKE YOUR\nCV MACHINE-\nREADABLE.',
  description: 'CV/GRID audits your resume against ATS parsing logic, job keywords, section clarity, and recruiter scan patterns — then returns a precise correction map.',
  metrics: [
    { label: 'ATS', value: '92', accent: true },
    { label: 'Keyword match', value: '78%' },
    { label: 'Parsing', value: 'Clean' },
    { label: 'Risk flags', value: '03', inverse: true },
  ],
  method: [
    { number: '01', title: 'Upload', description: 'Drop a PDF or DOCX. The parser checks structure before the AI reads content.' },
    { number: '02', title: 'Score', description: 'ATS compatibility, keyword coverage, section weight, and readability are measured separately.' },
    { number: '03', title: 'Rewrite', description: 'Receive exact bullet, keyword, and formatting recommendations ranked by score impact.' },
  ],
}

export const dashboardData = {
  eyebrow: '01. Dashboard',
  title: 'CV INTELLIGENCE BOARD.',
  metrics: [
    { label: 'ATS score', value: '86', accent: true },
    { label: 'Ready roles', value: '12' },
    { label: 'Open fixes', value: '07', muted: true },
    { label: 'Keywords', value: '64%', inverse: true },
  ],
  analyses: [{ name: 'Product_Manager_CV.pdf', score: '86' }, { name: 'Frontend_Engineer.docx', score: '79' }],
  action: 'ADD ROLE-SPECIFIC\nKEYWORDS BEFORE\nREAPPLYING.',
}

export const uploadData = {
  eyebrow: '01. Upload CV',
  title: 'FEED THE PARSER\nA CLEAN\nDOCUMENT.',
  description: 'PDF and DOCX files are accepted. The first pass checks machine-readability before scoring content, keywords, and structure.',
  options: [{ label: 'Target role', value: 'Product' }, { label: 'Depth', value: 'Detailed' }, { label: 'Output', value: 'ATS + AI' }],
}

export const reportData = {
  eyebrow: '01. Detailed analysis',
  title: 'ATS REPORT / PRODUCT\nMANAGER CV.',
  score: '86',
  categories: [{ label: 'Parsing clarity', score: '94' }, { label: 'Keyword coverage', score: '78' }, { label: 'Impact language', score: '82' }],
  findings: [
    { label: '01. Keyword gaps', text: 'Add roadmap, stakeholder, lifecycle, and experimentation language to match senior product roles.' },
    { label: '02. Bullets', text: 'Rewrite three achievement bullets with metric-first phrasing and clearer ownership verbs.' },
    { label: '03. Format', text: 'Keep section titles standard. Remove icons and two-column skill clusters that parsing tools flatten incorrectly.', inverse: true },
  ],
}