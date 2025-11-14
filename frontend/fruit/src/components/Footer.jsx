import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <span className="logo-text">FRUITS 🍃</span>
                </div>
                <div className="footer-copy">
                    &copy; {new Date().getFullYear()} Healthy Fruits. All rights reserved By Vaibhav Kanawade.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
