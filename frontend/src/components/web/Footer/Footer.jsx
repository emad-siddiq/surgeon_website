import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <hr className="divider" />
            <div className="footer-content">
                <div className="footer-main-section">
                    <div className="footer-contact-links">
                        <div className="contact-line">
                            <div className="contact-link-container">
                                <div className="contact-link">
                                    <a href="/contact">Contact</a>
                                </div>
                                <div className="link-arrow">
                                    <i className="fa-solid fa-greater-than"></i>
                                </div>
                            </div>
                            <hr className="divider" />
                        </div>
                        <div className="services-line">
                            <div className="contact-link-container">
                                <div className="contact-link">
                                    <a href="/about">Services</a>
                                </div>
                                <div className="link-arrow">
                                    <i className="fa-solid fa-greater-than"></i>
                                </div>
                            </div>
                            <hr className="divider" />
                        </div>
                    </div>

                    <div className="footer-quick-links">
                        <small className="links-header">Helpful links</small>
                        <div className="quick-link"><a href="/">Home</a></div>
                        <div className="quick-link"><a href="/contact" target="_blank">Book Appointment</a></div>
                        <div className="quick-link"><a href="/about">About</a></div>
                        <div className="quick-link"><a href="/contact">Contact</a></div>
                    </div>

                    <div className="footer-cta">
                        <a href="/contact" target="_blank" className="appointment-button">
                            Book an Appointment
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <hr className="divider" />
                    <div className="footer-bottom-content">
                        <div className="social-section">
                            <div className="social-icons">
                                <div className="social-icon">
                                    <a href="https://www.facebook.com/dr.ghulamsiddiq">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="social-icon">
                                    <a href="https://www.instagram.com/dr.ghulamsiddiq/">
                                        <i className="fa-brands fa-square-instagram"></i>
                                    </a>
                                </div>
                                <div className="social-icon">
                                    <a href="https://www.youtube.com/@dr.ghulamsiddiq4770">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>

                            <small className="copyright">
                                © 2023 Dr. Ghulam Siddiq
                            </small>
                        </div>

                        <div className="disclaimer">
                            <small>
                                This website contains information on products which is
                                targeted to a wide range of audiences and could contain
                                product details or information otherwise not accessible or
                                valid in your country. Please be aware that we do not take
                                any responsibility for accessing such information which may
                                not comply with any legal process, regulation, registration
                                or usage in the country of your origin.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}