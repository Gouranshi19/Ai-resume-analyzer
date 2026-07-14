import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResumes } from "../../services/resumeService";
import { createAnalysis } from "../../services/analysisService";

import "../SystemPages.css";

function Analysis() {

    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [resumeId, setResumeId] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const data = await getResumes();
            setResumes(data);

            if (data.length > 0) {
                setResumeId(data[0].id);
            }

        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const analysis = await createAnalysis({
                resume_id: resumeId,
                job_description: jobDescription,
            });

            navigate(`/analysis/${analysis.id}`);

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.detail ||
                "Analysis failed."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="system-content">

            <h1>Resume Analysis</h1>

            <form onSubmit={handleSubmit}>

                <label>Select Resume</label>

                <select
                    value={resumeId}
                    onChange={(e) =>
                        setResumeId(e.target.value)
                    }
                >

                    {resumes.map((resume) => (

                        <option
                            key={resume.id}
                            value={resume.id}
                        >
                            {resume.title}
                        </option>

                    ))}

                </select>

                <br />
                <br />

                <label>Job Description</label>

                <textarea
                    rows="12"
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }
                    placeholder="Paste Job Description..."
                />

                <br />
                <br />

                <button disabled={loading}>

                    {loading
                        ? "Analyzing..."
                        : "Analyze Resume"}

                </button>

            </form>

        </div>

    );
}

export default Analysis;