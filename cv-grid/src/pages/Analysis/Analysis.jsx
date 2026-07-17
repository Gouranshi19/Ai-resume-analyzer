import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getResumes } from "../../services/resumeService";
import { createAnalysis } from "../../services/analysisService";
import "./Analysis.css";
import { useNavigate, useLocation } from "react-router-dom";

function Analysis() {

    const navigate = useNavigate();
    const location = useLocation();

    const [resumes, setResumes] = useState([]);
    const [resumeId, setResumeId] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadResumes();
        if(location.state?.resumeId){

        setResumeId(
        location.state.resumeId
        );

        }
    }, []);

    const loadResumes = async () => {

        try {

            const data = await getResumes();
            setResumes(data);

        } catch (err) {

            console.error(err);
            alert("Failed to load resumes.");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!resumeId) {
            alert("Please select a resume.");
            return;
        }

        if (jobDescription.trim().length < 30) {
            alert("Job description must be at least 30 characters.");
            return;
        }

        try {

            setLoading(true);

            const result = await createAnalysis({
                resume_id: resumeId,
                job_description: jobDescription,
            });

            navigate(`/analysis/${result.id}`);

        } catch (err) {

            console.error(err);
            alert("Analysis failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                <div className="analysis-container">

                    <h1>Resume Analysis</h1>

                    <form onSubmit={handleSubmit}>

                        <label>Select Resume</label>

                        <select
                            value={resumeId}
                            onChange={(e) => setResumeId(e.target.value)}
                            required
                        >

                            <option value="">
                                Choose Resume
                            </option>

                            {resumes.map((resume) => (

                                <option
                                    key={resume.id}
                                    value={resume.id}
                                >
                                    {resume.title}
                                </option>

                            ))}

                        </select>

                        <label>Job Description</label>

                        <textarea
                            rows="10"
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            placeholder="Paste complete Job Description..."
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Analyzing..."
                                : "Analyze Resume"}
                        </button>

                    </form>

                </div>

            </main>

        </div>

    );

}

export default Analysis;