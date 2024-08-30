import React from "react";
import MainLayout from "../layouts/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faGlobe, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import "./styles/Home.css";

const Home = () => {
  return (
    <MainLayout>
      <main className="home-container">
        <section className="hero-section">
          <div className="hero-image-overlay">
            <h1 className="hero-title">Welcome to EduNexus</h1>
            <p className="hero-subtitle">
              Empowering education through decentralized scholarships. Our platform ensures fairness, transparency, and security in scholarship management.
            </p>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Why Choose EduNexus?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
              <h3 className="feature-title">Secure & Transparent</h3>
              <p className="feature-text">
                Built on blockchain, EduNexus guarantees that your scholarship application and disbursement are transparent, traceable, and secure.
              </p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faEthereum} className="feature-icon" />
              <h3 className="feature-title">Decentralized Process</h3>
              <p className="feature-text">
                Our decentralized system reduces biases and intermediaries, ensuring fairer access to educational funding for all students.
              </p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faGlobe} className="feature-icon" />
              <h3 className="feature-title">Global Reach</h3>
              <p className="feature-text">
                Access scholarships from institutions worldwide and apply from anywhere, anytime, with just a few clicks.
              </p>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <FontAwesomeIcon icon={faHandshake} className="step-icon" />
              <h3 className="step-title">Apply Easily</h3>
              <p className="step-text">
                Create a profile, browse available scholarships, and apply to the ones that fit your needs—all in one place.
              </p>
            </div>
            <div className="step-card">
              <FontAwesomeIcon icon={faShieldAlt} className="step-icon" />
              <h3 className="step-title">Get Notified</h3>
              <p className="step-text">
                Receive real-time updates on the status of your application and get notified once a decision is made.
              </p>
            </div>
            <div className="step-card">
              <FontAwesomeIcon icon={faEthereum} className="step-icon" />
              <h3 className="step-title">Secure Funding</h3>
              <p className="step-text">
                Once approved, your scholarship funds are securely transferred to your account on the blockchain, ready for use.
              </p>
            </div>
          </div>
        </section>

        <section className="join-section">
          <h2 className="section-title">Join the Community</h2>
          <p className="join-text">
            Be part of a growing network of students, educators, and institutions dedicated to making education accessible to everyone. Sign up today to start your journey with EduNexus.
          </p>
          <button className="join-button">Get Started</button>
        </section>
      </main>
    </MainLayout>
  );
};

export default Home;
