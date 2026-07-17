import { uploadResume } from "../../services/resumeService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import { uploadData } from "../../data/systemData";
import "../SystemPages.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ["pdf", "docx"];

function UploadResume() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const preventBrowserDrop = (event) => event.preventDefault();

        window.addEventListener("dragover", preventBrowserDrop);
        window.addEventListener("drop", preventBrowserDrop);

        return () => {
            window.removeEventListener("dragover", preventBrowserDrop);
            window.removeEventListener("drop", preventBrowserDrop);
        };
    }, []);

    const validateFile = (file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();

        if (!ACCEPTED_EXTENSIONS.includes(extension)) {
            return "Upload a PDF or DOCX file only.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return "File size should be less than 10 MB.";
        }

        return "";
    };

    const selectFile = (file) => {
        if (!file) return;

        const validation = validateFile(file);

        if (validation) {
            setError(validation);
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setError("");
    };

    const handleInputChange = (e) => {
        selectFile(e.target.files?.[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        selectFile(e.dataTransfer.files?.[0]);
    };

    const handleAnalyze = async () => {

        if (!title.trim()) {
            setError("Please enter resume title.");
            return;
        }

        if (!selectedFile) {
            setError("Please select a resume.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            await uploadResume(title, selectedFile);

            alert("Resume uploaded successfully.");

            navigate("/resume-history");

        } catch (err) {

            console.error(err);

            if (err.response?.data) {
                setError(JSON.stringify(err.response.data));
            } else {
                setError("Upload failed.");
            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                <section className="system-content">

                    <div className="upload-layout">

                        <div className="upload-copy">

                            <p className="system-kicker">
                                {uploadData.eyebrow}
                            </p>

                            <h1>
                                {uploadData.title.split("\n").map((line) => (
                                    <span key={line}>{line}</span>
                                ))}
                            </h1>

                            <p>{uploadData.description}</p>

                        </div>

                        <div className="upload-workspace">

                            <input
                                className="resume-title-input"
                                type="text"
                                placeholder="Resume Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                ref={fileInputRef}
                                type="file"
                                className="upload-file-input"
                                accept=".pdf,.docx"
                                onChange={handleInputChange}
                            />

                            <div
                                className={`drop-zone ${
                                    isDragging ? "drop-zone--active" : ""
                                } ${
                                    selectedFile ? "drop-zone--selected" : ""
                                }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragEnter={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                            >

                                <span>📄</span>

                                <h2>
                                    {selectedFile
                                        ? selectedFile.name
                                        : "Drop Resume Here"}
                                </h2>

                                <p>
                                    {selectedFile
                                        ? `${(
                                              selectedFile.size /
                                              1024 /
                                              1024
                                          ).toFixed(2)} MB`
                                        : "PDF / DOCX (Max 10 MB)"}
                                </p>

                            </div>

                            {error && (
                                <p className="upload-error">
                                    {error}
                                </p>
                            )}

                            <div className="upload-options">

                                {uploadData.options.map((option) => (

                                    <article key={option.label}>

                                        <span>{option.label}</span>

                                        <b>{option.value}</b>

                                    </article>

                                ))}

                            </div>

                            <Button
                                disabled={loading || !selectedFile}
                                onClick={handleAnalyze}
                            >
                                {loading
                                    ? "Uploading..."
                                    : "Upload Resume"}
                            </Button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default UploadResume;