import React from "react";
import MainLayout from "../layouts/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBalanceScale, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/About.css";
import me from "../images/me.jpg";

const About = () => {
  return (
    <MainLayout>
      <div className="about-container">
        <section className="about-hero">
          <div className="hero-image-overlay">
            <h1 className="about-title">About EduNexus</h1>
            <p className="about-subtitle">
              EduNexus is a decentralized platform that revolutionizes scholarship management, ensuring fairness, transparency, and security for students and institutions worldwide.
            </p>
          </div>
        </section>

        <section className="mission-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            Our mission is to democratize access to education by leveraging the power of blockchain technology. We aim to create a transparent and secure environment where scholarships are easily accessible to deserving students, regardless of their location.
          </p>
        </section>

        <section className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FontAwesomeIcon icon={faCheckCircle} className="value-icon" />
              <h3 className="value-title">Transparency</h3>
              <p className="value-text">
                We believe in clear and open processes that allow every participant to understand how decisions are made.
              </p>
            </div>
            <div className="value-card">
              <FontAwesomeIcon icon={faBalanceScale} className="value-icon" />
              <h3 className="value-title">Fairness</h3>
              <p className="value-text">
                Scholarships should be awarded based on merit and need, without bias or favoritism.
              </p>
            </div>
            <div className="value-card">
              <FontAwesomeIcon icon={faShieldAlt} className="value-icon" />
              <h3 className="value-title">Security</h3>
              <p className="value-text">
                The safety and privacy of our users are paramount, and we use cutting-edge technology to protect them.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
            </div>
            <div className="team-member">
              <img src={me} alt="Team Member" className="team-image" />
              <h3 className="team-name">Tanishq Gupta</h3>
              <p className="team-role">Creator & Lead Developer</p>
            </div>
            <div className="team-member">
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-text">
            Whether you have a question or want to collaborate with us, we’d love to hear from you. Reach out to us anytime!
          </p>
          <button className="contact-button">Contact Us</button>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
