import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import MetricCard from "../../components/MetricCard/MetricCard";
import { homeData } from "../../data/systemData";
import "./Home.css";

function Home() {
    return (
        <div className="system-page home-page">
        <section className="home-hero">
            <div className="home-hero__copy">
            <p className="system-kicker">{homeData.eyebrow}</p>
            <h1>
                {homeData.title.split("\n").map((line) => (
                <span key={line}>{line}</span>
                ))}
            </h1>
            <p>{homeData.description}</p>
            <div className="home-hero__actions">
                <Button to="/upload-resume">
                Upload CV <span aria-hidden="true">→</span>
                </Button>
                <Button to="/analysis-report" variant="quiet">
                View report
                </Button>
            </div>
            </div>
            <div className="home-metrics">
            {homeData.metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
            ))}
            </div>
        </section>
        <section className="home-method">
            <p className="system-kicker">02. Method</p>
            <h2>THREE PASSES. ONE READABLE RESULT.</h2>
            <div className="method-grid">
            {homeData.method.map((step) => (
                <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                </article>
            ))}
            </div>
        </section>
        <section className="home-cta">
            <h2>
            START WITH THE CV YOU
            <br />
            HAVE.
            </h2>
            <div>
            <p>
                No redesign theater. Just measurable
                <br />
                hiring-system clarity.
            </p>
            <Link to="/upload-resume">
                Analyse now <span aria-hidden="true">→</span>
            </Link>
            </div>
        </section>
        </div>
    );
}

export default Home;
