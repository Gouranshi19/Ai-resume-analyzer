import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (

        <aside className="sidebar">

            <h2>CV-INSIGHT-AI</h2>

            <ul>

                <li
                    className={location.pathname === "/dashboard" ? "active" : ""}
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </li>

                <li
                    className={location.pathname === "/upload-resume" ? "active" : ""}
                    onClick={() => navigate("/upload-resume")}
                >
                    Upload Resume
                </li>

                <li
                    className={location.pathname.startsWith("/analysis") ? "active" : ""}
                    onClick={() => navigate("/analysis")}
                >
                    Analysis
                </li>

                <li
                    className={location.pathname === "/resume-history" ? "active" : ""}
                    onClick={() => navigate("/resume-history")}
                >
                    Resume History
                </li>

                <li
                    className={location.pathname === "/profile" ? "active" : ""}
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </li>

                <li
                    className="logout"
                    onClick={logout}
                >
                    Logout
                </li>

            </ul>

        </aside>

    );
}

export default Sidebar;