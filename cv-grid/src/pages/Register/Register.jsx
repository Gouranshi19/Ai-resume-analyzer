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

        console.log("Button Clicked");
        console.log("Form Data:", formData);

        if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
        ) {
        console.log("Validation Failed: Empty Fields");
        setError("Please fill all fields.");
        return;
        }

        if (formData.password !== formData.confirmPassword) {
        console.log("Validation Failed: Passwords do not match");
        setError("Passwords do not match.");
        return;
        }

        try {
        console.log("Inside Try Block");

        setLoading(true);

        const response = await registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
        });

        console.log("API Success");
        console.log(response);

        alert("Registration Successful!");

        navigate("/login");
        } catch (err) {
        console.log("===== ERROR =====");
        console.log(err);
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Message:", err.message);
        console.log("Config:", err.config);

        setError(
            err.response?.data
            ? JSON.stringify(err.response.data)
            : err.message
        );
        } finally {
        setLoading(false);
        console.log("Request Finished");
        }
    };

    return (
        <div className="register-page">
        <div className="register-card">
            <div className="register-header">
            <div className="register-logo"></div>

            <h1>CREATE ACCOUNT</h1>

            <p>Join CV-Insight-AI and optimize your resume.</p>
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

            {error && (
                <div className="error-message">
                {error}
                </div>
            )}

            <button
                type="submit"
                className="register-btn"
                disabled={loading}
            >
                {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
            </form>

            <div className="register-footer">
            <p>Already have an account?</p>

            <Link to="/login">Login</Link>
            </div>
        </div>
        </div>
    );
}