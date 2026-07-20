import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
    getResumes,
    deleteResume,
    updateResume,
    } from "../../services/resumeService";

    import "../SystemPages.css";

    function ResumeHistory() {
    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
        const data = await getResumes();
        setResumes(data);
        } catch (err) {
        console.error(err);
        setError("Failed to load resumes.");
        } finally {
        setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this resume?");

        if (!confirmDelete) return;

        try {
        await deleteResume(id);

        setResumes((prev) => prev.filter((resume) => resume.id !== id));
        } catch (err) {
        console.error(err);
        alert("Delete failed.");
        }
    };

    const startEdit = (resume) => {
        setEditingId(resume.id);
        setNewTitle(resume.title);
    };

    const saveEdit = async (id) => {
        try {
        const updated = await updateResume(id, newTitle);

        setResumes((prev) =>
            prev.map((resume) => (resume.id === id ? updated : resume)),
        );

        setEditingId(null);
        setNewTitle("");
        } catch (err) {
        console.error(err);
        alert("Update failed.");
        }
    };

    if (loading) {
        return <h2 style={{ padding: "40px" }}>Loading...</h2>;
    }

    return (
        <div className="dashboard">
        <Sidebar />

        <main className="dashboard-content">
            <div className="resume-history">
            <div className="history-header">
                <div>
                <h1>Resume History</h1>

                <p>Your uploaded resumes.</p>
                </div>

                <button
                className="upload-btn"
                onClick={() => navigate("/upload-resume")}
                >
                + Upload Resume
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {resumes.length === 0 ? (
                <div className="empty-box">
                <h3>No resumes uploaded yet.</h3>

                <p>Upload your first resume.</p>
                </div>
            ) : (
                <table className="history-table">
                <thead>
                    <tr>
                    <th>Title</th>

                    <th>Uploaded</th>

                    <th>View</th>

                    <th>Edit</th>

                    <th>Analysis</th>

                    <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {resumes.map((resume) => (
                    <tr key={resume.id}>
                        <td>
                        {editingId === resume.id ? (
                            <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            />
                        ) : (
                            resume.title
                        )}
                        </td>

                        <td>{new Date(resume.uploaded_at).toLocaleString()}</td>

                        <td>
                        <a
                            href={`${import.meta.env.VITE_API_URL.replace("/api", "")}${resume.file}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View
                        </a>
                        </td>

                        <td>
                        {editingId === resume.id ? (
                            <button onClick={() => saveEdit(resume.id)}>
                            Save
                            </button>
                        ) : (
                            <button onClick={() => startEdit(resume)}>Edit</button>
                        )}
                        </td>

                        <td>

    <button
        className="analyze-btn"
        onClick={() =>
            navigate("/analysis", {
                state: {
                    resumeId: resume.id
                }
            })
        }
    >
        Analyze
    </button>

</td>

                        <td>
                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(resume.id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
        </main>
        </div>
    );
}

export default ResumeHistory;
