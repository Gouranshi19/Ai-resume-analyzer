import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";

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

  return (
    // Tumhara existing JSX yahin rahega (same as HEAD)
  );
}