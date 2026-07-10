import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import "./Dashboard.css";

export default function Dashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const fetchUser = async () => {

        try{

            const token = localStorage.getItem("access");

            if(!token){
                navigate("/login");
                return;
            }

            const data = await getCurrentUser(token);

            setUser(data);

        }

        catch(error){

            console.log(error);

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            navigate("/login");

        }

        finally{

            setLoading(false);

        }

    }

    fetchUser();

},[]);

if(loading){

    return <h2 style={{padding:"40px"}}>Loading...</h2>

}
    return (

        <div className="dashboard">

        {/* Sidebar */}

        <aside className="sidebar">

            <h2>CV-INSIGHT-AI</h2>

            <ul>

            <li className="active">Dashboard</li>

            <li onClick={() => navigate("/upload")}>
                Upload Resume
            </li>

            <li onClick={() => navigate("/analysis")}>
                Analysis
            </li>

            <li onClick={() => navigate("/history")}>
                Resume History
            </li>

            <li onClick={() => navigate("/profile")}>
                Profile
            </li>

            <li
            className="logout"

            onClick={()=>{

            localStorage.removeItem("access");

            localStorage.removeItem("refresh");

            navigate("/login");

            }}

            >

            Logout

            </li>

            </ul>

        </aside>

        {/* Main */}

        <main className="dashboard-content">

            <div className="dashboard-header">

            <div>

                <h1>Dashboard</h1>

                <p>

                Welcome back,

                <strong>

                {user?.username}

                </strong>

                👋

                </p>

            </div>

            <button
                onClick={() => navigate("/upload")}
            >
                Upload Resume
            </button>

            </div>

            {/* Stats */}

            <section className="stats">

            <div className="stat-card">

                <span>Total Resumes</span>

                <h2>12</h2>

            </div>

            <div className="stat-card orange">

                <span>Average ATS</span>

                <h2>84%</h2>

            </div>

            <div className="stat-card">

                <span>Analyses</span>

                <h2>28</h2>

            </div>

            </section>

            {/* Recent */}

            <section className="recent">

            <h2>Recent Activity</h2>

            <div className="recent-card">

                <h3>Software_Engineer.pdf</h3>

                <p>

                ATS Score : <strong>91%</strong>

                </p>

                <p>

                Uploaded Today

                </p>

            </div>

            <div className="recent-card">

                <h3>Frontend_Resume.pdf</h3>

                <p>

                ATS Score : <strong>82%</strong>

                </p>

                <p>

                Uploaded Yesterday

                </p>

            </div>

            </section>

        </main>

        </div>

    );

}