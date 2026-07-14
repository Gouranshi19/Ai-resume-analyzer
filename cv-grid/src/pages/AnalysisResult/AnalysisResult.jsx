import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAnalysis } from "../../services/analysisService";

import "../SystemPages.css";

function AnalysisResult() {

    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        loadAnalysis();
    }, []);

    const loadAnalysis = async () => {

        try {

            const data = await getAnalysis(id);

            setAnalysis(data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!analysis) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="system-content">

            <h1>Analysis Result</h1>

            <br />

            <h2>
                ATS Score :
                {" "}
                {analysis.ats_score}%
            </h2>

            <br />

            <h2>Matched Keywords</h2>

            <ul>

                {analysis.matched_keywords.map((item, index) => (

                    <li key={index}>{item}</li>

                ))}

            </ul>

            <br />

            <h2>Missing Keywords</h2>

            <ul>

                {analysis.missing_keywords.map((item, index) => (

                    <li key={index}>{item}</li>

                ))}

            </ul>

            <br />

            <h2>AI Suggestions</h2>

            <p>{analysis.ai_suggestions}</p>

        </div>

    );
}

export default AnalysisResult;