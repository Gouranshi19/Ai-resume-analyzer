import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalysisDetail } from "../../services/analysisService";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AnalysisResult.css";

function AnalysisResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      const data = await getAnalysisDetail(id);
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load analysis.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="analysis-result-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="analysis-result-container">

        <div className="page-header">
          <div>
            <p className="page-kicker">AI ANALYSIS REPORT</p>
            <h1>Resume Analysis Result</h1>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/analysis")}
          >
            Analyze Another Resume
          </button>
        </div>

        <div className="analysis-score-card">
          <p>ATS SCORE</p>
          <h2>{analysis.ats_score.toFixed(2)}%</h2>
        </div>

        <div className="keyword-grid">

          <div className="keyword-card">
            <h3>Matched Keywords</h3>

            <ul>
              {analysis.matched_keywords.length === 0 ? (
                <li>No matched keywords.</li>
              ) : (
                analysis.matched_keywords.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))
              )}
            </ul>

          </div>

          <div className="keyword-card">
            <h3>Missing Keywords</h3>

            <ul>
              {analysis.missing_keywords.length === 0 ? (
                <li>No missing keywords.</li>
              ) : (
                analysis.missing_keywords.map((item, index) => (
                  <li key={index}>❌ {item}</li>
                ))
              )}
            </ul>

          </div>

        </div>

        <div className="ai-card">
          <h3>AI Suggestions</h3>

          <p>{analysis.ai_suggestions}</p>
        </div>

      </div>
    </div>
  );
}

export default AnalysisResult;