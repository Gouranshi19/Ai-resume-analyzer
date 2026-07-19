import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
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

    if (!formData.username || !formData.password) {
        setError("Please fill all fields.");
        return;
    }

    try {
        setLoading(true);

        await loginUser(formData);

        navigate("/dashboard");

    } catch (err) {
        console.error(err);

        if (err.response?.data?.detail) {
            setError(err.response.data.detail);
        } else {
            setError("Login failed. Please try again.");
        }

    } finally {
        setLoading(false);
    }
};
const handleGoogleLogin = async (credentialResponse) => {

    try {

        const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/google/",
            {
                token: credentialResponse.credential,
            }
        );

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        navigate("/dashboard");

    } catch (err) {

        console.log(err);

        setError("Google Login Failed");

    }

};

    return (
        <div className="login-page">

        <div className="login-card">

            <div className="login-header">

            <div className="login-logo"></div>

            <h1>WELCOME BACK</h1>

            <p>
                Login to continue analyzing resumes using CV-Insight-AI.
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

                <label>Password</label>

                <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                />

            </div>

            {error && (
                <div className="error-message">
                {error}
                </div>
            )}

            <button
                type="submit"
                className="login-btn"
                disabled={loading}
            >
                {loading ? "LOGGING IN..." : "LOGIN"}
            </button>

            <div style={{ marginTop: "20px" }}>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                        setError("Google Login Failed");
                    }}
                />
            </div>

        </form>

        <div className="login-footer">

            <p>
                Don't have an account?
            </p>

            <Link to="/register">
                Create Account
            </Link>

            </div>

        </div>

        </div>
    );
}