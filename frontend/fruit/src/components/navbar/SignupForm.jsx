import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",   // ✅ New field
        role: "customer",
        contact: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.role) {
            newErrors.role = "Role is required";
        }

        if (!formData.contact.trim()) {
            newErrors.contact = "Contact is required";
        } else if (!/^[0-9]{10}$/.test(formData.contact)) {
            newErrors.contact = "Enter a valid 10-digit contact number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const { confirmPassword, ...dataToSend } = formData; // ✅ remove confirmPassword before sending to server

        const res = await fetch("http://localhost:3000/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            navigate("/login");
        } else {
            alert(data.message || "Signup failed");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className="signup-form">

                {/* Email */}
                <div>
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* Username */}
                <div>
                    <input
                        name="username"
                        placeholder="Username"
                        type="text"
                        onChange={handleChange}
                        value={formData.username}
                        required
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}
                </div>

                {/* Password */}
                <div>
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                {/* ✅ Confirm Password */}
                <div>
                    <input
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className="error-text">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="error-text">{errors.role}</p>}
                </div>

                {/* Contact */}
                <div>
                    <input
                        name="contact"
                        placeholder="Contact"
                        type="text"
                        onChange={handleChange}
                        value={formData.contact}
                        required
                    />
                    {errors.contact && <p className="error-text">{errors.contact}</p>}
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
