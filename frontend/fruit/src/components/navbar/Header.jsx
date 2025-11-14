
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"; //  added icons
import { itemContext } from "../../context/ItemContext";
import "./Header.css";

const Header = () => {
    const { itemsInCart } = useContext(itemContext);
    const location = useLocation();

    // Smooth scroll function
    const scrollToSection = (id) => {
        if (location.pathname === "/") {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo">
                <span className="brand-red">FRUITS</span>{" "}
                <span className="brand-leaf">🍃</span>
            </div>

            {/* Links */}
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li>
                    {location.pathname === "/" ? (
                        <button className="nav-btn" onClick={() => scrollToSection("about")}>About</button>
                    ) : (
                        <Link to="/#about">About</Link>
                    )}
                </li>
                <li>
                    {location.pathname === "/" ? (
                        <button className="nav-btn" onClick={() => scrollToSection("contact")}>Contact</button>
                    ) : (
                        <Link to="/#contact">Contact</Link>
                    )}
                </li>
            </ul>

            {/* Login & Signup */}
            <div className="navbar-auth">
                <Link to="/login" className="auth-link">
                    <FontAwesomeIcon icon={faUser} /> Login
                </Link>
                <Link to="/signup" className="auth-link">
                    <FontAwesomeIcon icon={faUserPlus} /> Signup
                </Link>
            </div>

            {/* Right Side */}
            <div className="navbar-right">
                {/* Cart */}
                <div className="navbar-cart">
                    <Link to="/cart">
                        <span className="cart-count">{itemsInCart}</span>
                        <FontAwesomeIcon icon={faCartShopping} size="lg" />
                    </Link>
                </div>
                <div className="navbar-logout">
                    <Link to="/logout" className="auth-link">
                        <FontAwesomeIcon icon={faUserPlus} /> Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
