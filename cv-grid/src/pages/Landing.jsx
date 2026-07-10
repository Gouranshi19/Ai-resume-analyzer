import Navbar from "../components/Navbar";
import "./Landing.css";

export default function Landing() {
    return (
        <>
        <Navbar />

        <section className="hero">

            <div className="container hero-grid">

            {/* LEFT */}

            <div className="hero-left">

                <p className="section-tag">
                01. AI CV ANALYSER
                </p>

                <h1>
                MAKE YOUR
                <br />
                CV MACHINE-
                <br />
                READABLE.
                </h1>

                <p className="hero-text">
                CV/GRID audits your resume against ATS parsing logic,
                job keywords, section clarity and recruiter scan
                patterns — then returns a precise correction map.
                </p>

                <div className="hero-buttons">

                <button className="primary-btn">
                    UPLOAD CV →
                </button>

                <button className="secondary-btn">
                    VIEW REPORT
                </button>

                </div>

            </div>

            {/* RIGHT */}

            <div className="hero-right">

                <div className="score-card orange">

                <span>ATS</span>

                <h2>92</h2>

                </div>

                <div className="score-card">

                <span>KEYWORD MATCH</span>

                <h2>78%</h2>

                </div>

                <div className="score-card">

                <span>PARSING</span>

                <h2>CLEAN</h2>

                </div>

                <div className="score-card black">

                <span>RISK FLAGS</span>

                <h2>03</h2>

                </div>

            </div>

            </div>

        </section>

        </>
    );
}