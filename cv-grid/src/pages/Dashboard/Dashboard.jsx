
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

            const data = await getCurrentUser();

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

﻿import Button from '../../components/Button/Button'
import MetricCard from '../../components/MetricCard/MetricCard'
import { dashboardData } from '../../data/systemData'
import '../SystemPages.css'

function Dashboard() { 
    return <section className="system-content">
        <div className="system-heading">
            <div><p className="system-kicker">{dashboardData.eyebrow}</p>
            <h1>{dashboardData.title}</h1></div>
            
            <Button to="/upload-resume">Upload new CV <span aria-hidden="true">→</span></Button>
        </div>
        <div className="dashboard-metrics">{dashboardData.metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div>
        <div className="dashboard-lower">
            <section className="recent-panel">
                <h2>Recent analyses</h2>{dashboardData.analyses.map((analysis) => <div className="recent-row" key={analysis.name}>
                    <span>{analysis.name}</span><b>{analysis.score}</b></div>)}</section>
                    <aside className="next-action">
                        <span>Next action</span><h2>{dashboardData.action.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
                        <Button to="/analysis-report">Open analysis <span aria-hidden="true">→</span></Button>
                    </aside>
                    </div>
            </section>
            }

export default Dashboard

