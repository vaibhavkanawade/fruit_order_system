import React from "react";
import "./Contact.css";

const Contact = ({ id }) => {
    return (
        <section id={id} className="contact-section">
            <div className="contact-container">
                <h2 className="contact-title">Contact Us</h2>

                <div className="contact-info">
                    <div className="contact-item">
                        <h3>Address</h3>
                        <p>Sangamner,Maharatra,india</p>
                    </div>
                    <div className="contact-item">
                        <h3>Phone</h3>
                        <p>+91 7769012164</p>
                    </div>
                    <div className="contact-item">
                        <h3>Email</h3>
                        <p>vaibhavkanawade12@gmail.com</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
