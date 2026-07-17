import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="navbar">
        <div className="container nav-container">

            <div
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            >
            <div className="logo-box"></div>
            <span>CV-INSIGHT-AI</span>
            </div>

            <nav className="nav-links">
            <Link to="/dashboard">DASHBOARD</Link>

            <Link to="/upload-resume">UPLOAD</Link>

            <Link to="/analysis">ANALYSIS</Link>
            </nav>

            <div className="auth-buttons">
            <Link to="/login">LOGIN</Link>

            <button
                className="register-btn"
                onClick={() => navigate("/register")}
            >
                REGISTER
            </button>
            </div>

        </div>
        </header>
    );
}