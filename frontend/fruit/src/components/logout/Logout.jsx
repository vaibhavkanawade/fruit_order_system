// src/components/Logout.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout();          // Clear login state
        navigate("/"); // Redirect to home page
    }, [logout, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
