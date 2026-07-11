import { reportData } from '../../data/systemData'
import '../SystemPages.css'

function AnalysisReport() { return <section className="system-content"><div className="system-heading"><div><p className="system-kicker">{reportData.eyebrow}</p><h1>{reportData.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1></div></div><div className="report-score"><div className="report-score__value"><span>ATS score</span><strong>{reportData.score}</strong></div><div className="report-categories"><h2>Category breakdown</h2>{reportData.categories.map((category) => <div key={category.label}><span>{category.label}</span><b>{category.score}</b></div>)}</div></div><div className="report-findings">{reportData.findings.map((finding) => <article className={`report-finding${finding.inverse ? ' report-finding--inverse' : ''}`} key={finding.label}><span>{finding.label}</span><p>{finding.text}</p></article>)}</div></section> }

export default AnalysisReport