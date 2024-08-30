import React from "react";
import MainLayout from "../layouts/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLifeRing, faHandshake } from "@fortawesome/free-solid-svg-icons";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <MainLayout>
      <div className="contact-container">
        <section className="contact-hero">
          <div className="hero-image-overlay">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
              We’re here to help! Whether you have questions, need support, or want to partner with us, feel free to reach out.
            </p>
          </div>
        </section>

        <section className="contact-info-section">
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-info-icon" />
              <h3 className="contact-info-title">General Inquiries</h3>
              <p className="contact-info-text">
                Email us at: <a href="mailto:info@edunexus.com" className="contact-link">info@edunexus.com</a>
              </p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faLifeRing} className="contact-info-icon" />
              <h3 className="contact-info-title">Support</h3>
              <p className="contact-info-text">
                For support, contact us at: <a href="mailto:support@edunexus.com" className="contact-link">support@edunexus.com</a>
              </p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faHandshake} className="contact-info-icon" />
              <h3 className="contact-info-title">Partnerships</h3>
              <p className="contact-info-text">
                Interested in partnering with us? Reach out at: <a href="mailto:partners@edunexus.com" className="contact-link">partners@edunexus.com</a>
              </p>
            </div>
          </div>
        </section>

        <section className="contact-form-section">
          <h2 className="section-title">Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-input" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" className="form-input" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="contact-button">Send Message</button>
          </form>
        </section>
      </div>
    </MainLayout>
  );
};

export default Contact;
