import Button from '../../components/Button/Button'
import MetricCard from '../../components/MetricCard/MetricCard'
import { dashboardData } from '../../data/systemData'
import '../SystemPages.css'

function Dashboard() { 
    return <section className="system-content">
        <div className="system-heading">
            <div><p className="system-kicker">{dashboardData.eyebrow}</p>
            <h1>{dashboardData.title}</h1></div>
            
            <Button to="/upload-resume">Upload new CV <span aria-hidden="true">→</span></Button>
        </div>
        <div className="dashboard-metrics">{dashboardData.metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div>
        <div className="dashboard-lower">
            <section className="recent-panel">
                <h2>Recent analyses</h2>{dashboardData.analyses.map((analysis) => <div className="recent-row" key={analysis.name}>
                    <span>{analysis.name}</span><b>{analysis.score}</b></div>)}</section>
                    <aside className="next-action">
                        <span>Next action</span><h2>{dashboardData.action.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
                        <Button to="/analysis-report">Open analysis <span aria-hidden="true">→</span></Button>
                    </aside>
                    </div>
            </section>
            }

export default Dashboard