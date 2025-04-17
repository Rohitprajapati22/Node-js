import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Icons
import Header from "../component/Header";
import '../style.css';

const Contact = () => {
    return (
        <>
            <Header />
            <div className="contact-container">
                {/* Hero Section with Overlay */}
                <div className="contact-hero">
                    <div className="overlay"></div>
                    <h1>Contact Us</h1>
                </div>

                {/* Contact Information Cards */}
                <div className="contact-info">
                    <div className="contact-card">
                        <FaEnvelope className="contact-icon" />
                        <h3>Email Us</h3>
                        <a href="mailto:info@zpunet.com">abc@gmail.com</a>
                        <p>Interactively grow backend ideas for cross-platform models.</p>
                    </div>

                    <div className="contact-card">
                        <FaPhoneAlt className="contact-icon" />
                        <h3>Call Us</h3>
                        <a href="tel:+255789456123">+91 123 456 789</a>
                        <p>Distinctively exploit optimal alignments for intuitive bandwidth.</p>
                    </div>

                    <div className="contact-card">
                        <FaMapMarkerAlt className="contact-icon" />
                        <h3>Location</h3>
                        <p>Dar es Salaam, Tanzania. 345 Kigamboni, Street No. <br /> 12</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
