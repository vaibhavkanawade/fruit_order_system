
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // If user was redirected to login from another page (e.g. /checkout)
    const from = location.state?.from || "/";

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.user) {
                alert(` ${data.message}. Welcome ${data.user.username}`);

                // Save user in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                //  Role-based redirection
                if (data.user.role === "admin") {
                    navigate("/dashboard");
                } else if (data.user.role === "customer") {
                    navigate(from);
                } else {
                    alert("Unknown role. Please contact support.");
                }

            } else {
                alert(data.message || " Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong during login.");
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>

            <div className="signup-redirect">
                <p>Don't have an account?</p>
                <button onClick={handleSignup} className="signup-button">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
