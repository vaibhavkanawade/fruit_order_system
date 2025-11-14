import React from "react";
import "./About.css";
import fruitSplashImg from "../../assets/fruits-splash.png"; // place your image in /client/src/assets/

const About = ({ id }) => {
    return (
        <section id={id} className="brand-info-section">
            <div className="brand-info-image-container">
                <img
                    src={fruitSplashImg}
                    alt="Assorted tropical fruits with juice splash"
                    className="brand-info-image"
                />
            </div>
            <div className="brand-info-content">
                <h2 className="brand-info-title">BRAND INFO</h2>
                <p className="brand-info-description">
                    Welcome to our Fruit Order System, your premier destination for farm-fresh produce delivered right to your doorstep. Our platform offers a seamless experience to browse a curated selection of the highest quality, seasonal fruits. We are dedicated to promoting a healthy lifestyle by making nutritious choices convenient and accessible for everyone. This project bridges the gap between local growers and consumers, ensuring peak freshness and taste. Place your order with ease and enjoy the vibrant flavors of nature, delivered fresh from the orchard to you.
                </p>

            </div>
        </section>
    );
};

export default About;
