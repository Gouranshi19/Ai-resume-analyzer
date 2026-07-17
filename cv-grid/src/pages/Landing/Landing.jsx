import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";

export default function Landing() {
    const navigate = useNavigate();

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

                <button
                className="primary-btn"
                onClick={() => navigate("/upload-resume")}
                >
                UPLOAD CV →
                </button>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/view-report")}
                >
                    VIEW REPORT
                </button>

                </div>

            </div>

            {/* RIGHT */}

            <div className="hero-right">

                <div className="landing-score-card landing-orange">

                <span>ATS</span>

                <h2>92</h2>

                </div>

                <div className="landing-score-card">

                <span>KEYWORD MATCH</span>

                <h2>78%</h2>

                </div>

                <div className="landing-score-card">

                <span>PARSING</span>

                <h2>CLEAN</h2>

                </div>

                <div className="landing-score-card landing-black">

                <span>RISK FLAGS</span>

                <h2>03</h2>

                </div>

            </div>

            </div>

            <section className="landing-method">

            <div className="container">

                <p className="section-tag">
                02. METHOD
                </p>

                <h2 className="landing-method-heading">
                THREE PASSES.
                <br />
                ONE READABLE RESULT.
                </h2>

                <div className="landing-method-grid">

                <div className="landing-method-card">

                    <span>01</span>

                    <h3>UPLOAD</h3>

                    <p>
                    Upload your resume in PDF or DOCX format.
                    Our parser extracts every section instantly.
                    </p>

                </div>

                <div className="landing-method-card landing-orange-card">

                    <span>02</span>

                    <h3>SCORE</h3>

                    <p>
                    AI evaluates ATS compatibility,
                    keywords, formatting and recruiter readability.
                    </p>

                </div>

                <div className="landing-method-card">

                    <span>03</span>

                    <h3>REWRITE</h3>

                    <p>
                    Receive actionable suggestions and
                    improve your resume before applying.
                    </p>

                </div>

                </div>

            </div>

            </section>

            {/* ================= CTA ================= */}

            <section className="cta">

            <div className="container cta-content">

                <div>

                <p className="section-tag">
                    READY?
                </p>

                <h2>
                    START WITH
                    <br />
                    THE CV
                    <br />
                    YOU HAVE.
                </h2>

                </div>

                <button
                onClick={() => navigate("/upload-resume")}
                >
                ANALYZE NOW →
                </button>

            </div>

            </section>

            <footer className="footer">

            <div className="container footer-content">

                <h3>CV-INSIGHT-AI</h3>

                <p>
                AI Resume Analyzer • ATS Optimizer • 2026
                </p>

            </div>

            </footer>

        </section>

        </>
    );
}