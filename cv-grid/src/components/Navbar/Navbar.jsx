import "./Navbar.css";

export default function Navbar() {
    return (
        <header className="navbar">
        <div className="container nav-container">

            <div className="logo">
            <div className="logo-box"></div>
            <span>CV-INSIGHT-AI</span>
            </div>

            <nav className="nav-links">
            <a href="/">DASHBOARD</a>
            <a href="/">UPLOAD</a>
            <a href="/">ANALYSIS</a>
            </nav>

            <div className="auth-buttons">
            <a href="/login">LOGIN</a>

            <button>REGISTER</button>
            </div>

        </div>
        </header>
    );
}