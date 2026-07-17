import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { getResumes } from "../../services/resumeService";
import { getAnalysisHistory } from "../../services/analysisService";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [resumeCount, setResumeCount] = useState(0);
    const [analysisCount, setAnalysisCount] = useState(0);
    const [averageATS, setAverageATS] = useState(0);

    const [recentAnalyses, setRecentAnalyses] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);

            const resumes = await getResumes();
            setResumeCount(resumes.length);

            const analyses = await getAnalysisHistory();

            setAnalysisCount(analyses.length);

            if (analyses.length > 0) {
                const total = analyses.reduce(
                    (sum, item) => sum + Number(item.ats_score),
                    0
                );

                setAverageATS((total / analyses.length).toFixed(1));
            }

            setRecentAnalyses(analyses.slice(0, 3));

        } catch (err) {
            console.log(err);

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2 style={{ padding: "40px" }}>Loading...</h2>;
    }

    return (
        <div className="dashboard">
            <Sidebar />

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <div>
                        <h1>Dashboard</h1>

                        <p>
                            Welcome back, <strong>{user?.username}</strong>
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/upload-resume")}
                    >
                        Upload Resume
                    </button>

                </div>

                <section className="stats">

                    <div className="stat-card">
                        <span>Total Resumes</span>
                        <h2>{resumeCount}</h2>
                    </div>

                    <div className="stat-card orange">
                        <span>Average ATS</span>
                        <h2>{averageATS}%</h2>
                    </div>

                    <div className="stat-card">
                        <span>Total Analyses</span>
                        <h2>{analysisCount}</h2>
                    </div>

                </section>

                <section className="quick-actions">

    <div
        className="action-card"
        onClick={() => navigate("/upload-resume")}
    >
        <h3> Upload Resume</h3>
        <p>Upload a new resume for ATS analysis.</p>
    </div>

    <div
        className="action-card"
        onClick={() => navigate("/analysis")}
    >
        <h3> Analyze Resume</h3>
        <p>Compare your resume with a job description.</p>
    </div>

    <div
        className="action-card"
        onClick={() => navigate("/resume-history")}
    >
        <h3> Resume History</h3>
        <p>View and manage uploaded resumes.</p>
    </div>
    <div
            className="action-card"
            onClick={() => navigate("/profile")}
        >
            <h3>Profile</h3>
            <p>View your account details.</p>
        </div>

</section>


                <section className="recent">

                    <h2>Recent Analyses</h2>

                    {recentAnalyses.length === 0 ? (

                        <div className="recent-card">
                            No analysis available.
                        </div>

                    ) : (

                        recentAnalyses.map((item) => (

                            <div
                                className="recent-card"
                                key={item.id}
                            >

                                <h3>{item.resume_title}</h3>

                                <div className="analysis-badge">
                                    ATS Score : {item.ats_score}%
                                </div>

                                <p className="analysis-date">
                                    {new Date(item.created_at).toLocaleString()}
                                </p>

                                <button
                                    className="view-report-btn"
                                    onClick={() => navigate(`/analysis/${item.id}`)}
                                >
                                    View Report
                                </button>

                            </div>

                        ))

                    )}

                </section>

            </main>

        </div>
    );
}