import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  generateAnalysisSuggestions,
  getAnalysisDetail,
} from "../../services/analysisService";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AnalysisResult.css";

const PENDING_SUGGESTIONS = "Generating AI suggestions...";

function buildQuickSuggestions(analysis) {
  const missing = analysis.missing_keywords?.slice(0, 5) ?? [];
  const matched = analysis.matched_keywords?.slice(0, 5) ?? [];
  const suggestions = [];

  if (missing.length) {
    suggestions.push(
      `Add relevant missing terms where your experience supports them: ${missing.join(", ")}.`
    );
  } else {
    suggestions.push(
      "Your resume covers the detected job keywords. Keep those terms in your summary and experience bullets."
    );
  }

  if (matched.length) {
    suggestions.push(`Keep these matching skills visible: ${matched.join(", ")}.`);
  }

  suggestions.push(
    "Strengthen two or three experience bullets with measurable results, such as time saved, revenue, volume, or accuracy."
  );
  suggestions.push(
    "Tailor the opening summary to the role’s main responsibilities, and only claim skills you can support with real experience."
  );

  return `Quick suggestions (while personalized AI feedback loads)\n\n${suggestions
    .map((suggestion) => `• ${suggestion}`)
    .join("\n")}`;
}


function AnalysisResult() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsFailed, setSuggestionsFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const loadAnalysis = async () => {
      try {
        const data = await getAnalysisDetail(id);
        if (!active) return;

        const suggestionsPending = data.ai_suggestions === PENDING_SUGGESTIONS;
        const suggestionsPreviouslyFailed = data.ai_suggestions?.startsWith(
          "AI suggestions unavailable"
        );
        setAnalysis({
          ...data,
          ai_suggestions:
            suggestionsPending || suggestionsPreviouslyFailed
              ? buildQuickSuggestions(data)
              : data.ai_suggestions,
        });
        setSuggestionsFailed(suggestionsPreviouslyFailed);
        setLoading(false);

        if (suggestionsPending) {
          setSuggestionsLoading(true);
          try {
            const updated = await generateAnalysisSuggestions(id);
            if (active && updated.ai_suggestions?.startsWith("AI suggestions unavailable")) {
              setSuggestionsFailed(true);
            } else if (active) {
              setAnalysis(updated);
            }
          } catch (err) {
            console.error(err);
            if (active) setSuggestionsFailed(true);
          } finally {
            if (active) setSuggestionsLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
        if (active) alert("Failed to load analysis.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAnalysis();
    return () => {
      active = false;
    };
  }, [id]);

  const retrySuggestions = async () => {
    setSuggestionsLoading(true);
    setSuggestionsFailed(false);
    try {
      const updated = await generateAnalysisSuggestions(id);
      if (updated.ai_suggestions?.startsWith("AI suggestions unavailable")) {
        setSuggestionsFailed(true);
      } else {
        setAnalysis(updated);
      }
    } catch (err) {
      console.error(err);
      setSuggestionsFailed(true);
    } finally {
      setSuggestionsLoading(false);
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

          <p style={{ whiteSpace: "pre-line" }}>
            {analysis.ai_suggestions}
          </p>
          {suggestionsLoading && (
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              Gemini is preparing personalized feedback.
            </p>
          )}
          {suggestionsFailed && !suggestionsLoading && (
            <button className="primary-btn" onClick={retrySuggestions}>
              Retry suggestions
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default AnalysisResult;
