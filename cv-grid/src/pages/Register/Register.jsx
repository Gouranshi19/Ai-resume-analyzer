import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));

        setError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
        ) {
        setError("Please fill all fields.");
        return;
        }

        if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
        }

        try {

        setLoading(true);

        await registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });

        alert("Registration Successful!");

        navigate("/login");

        } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);
    console.error(err);

    setError(
        JSON.stringify(err.response?.data || err.message)
    );
    }

    };

    return (

        <div className="register-page">

        <div className="register-card">

            <div className="register-header">

            <div className="register-logo"></div>

            <h1>CREATE ACCOUNT</h1>

            <p>
                Join CV-Insight-AI and optimize your resume.
            </p>

            </div>

            <form onSubmit={handleSubmit}>

            <div className="input-group">

                <label>Username</label>

                <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                />

            </div>

            <div className="input-group">

                <label>Email</label>

                <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                />

            </div>

            <div className="input-group">

                <label>Password</label>

                <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                />

            </div>

            <div className="input-group">

                <label>Confirm Password</label>

                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                />

            </div>

            {error &&

                <div className="error-message">

                {error}

                </div>

            }

            <button
                className="register-btn"
                disabled={loading}
            >

                {loading ? "CREATING..." : "CREATE ACCOUNT"}

            </button>

            </form>

            <div className="register-footer">

            <p>Already have an account?</p>

            <Link to="/login">

                Login

            </Link>

            </div>

        </div>

        </div>

    );

}