import React from "react";
import MainLayout from "../layouts/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faHandshake, faChartLine, faClipboardList, faUsers, faCogs } from "@fortawesome/free-solid-svg-icons";
import "../styles/PartnerWithUs.css";

const PartnerWithUs = () => {
  return (
    <MainLayout>
      <div className="partner-container">
        <section className="partner-hero-section">
          <div className="hero-image-overlay">
            <h1 className="partner-heading-primary">Partner with EduNexus</h1>
            <p className="partner-text max-w-3xl mx-auto">
              Join us in revolutionizing education by partnering with EduNexus. Together, we can make educational opportunities accessible to everyone.
            </p>
          </div>
        </section>

        <section className="partner-section">
          <h2 className="partner-heading-secondary text-center">Why Partner with EduNexus?</h2>
          <div className="partner-grid">
            <div className="partner-card">
              <FontAwesomeIcon icon={faBullhorn} className="partner-icon" />
              <h3 className="partner-card-title">Wider Reach</h3>
              <p className="partner-card-text">
                Access a global network of students who are looking for opportunities to fund their education.
              </p>
            </div>
            <div className="partner-card">
              <FontAwesomeIcon icon={faHandshake} className="partner-icon" />
              <h3 className="partner-card-title">Transparent Process</h3>
              <p className="partner-card-text">
                Ensure transparency in scholarship management with our decentralized platform.
              </p>
            </div>
            <div className="partner-card">
              <FontAwesomeIcon icon={faCogs} className="partner-icon" />
              <h3 className="partner-card-title">Seamless Integration</h3>
              <p className="partner-card-text">
                Easily integrate your scholarship programs into our platform with minimal effort.
              </p>
            </div>
          </div>
        </section>

        <section className="partner-section">
          <h2 className="partner-heading-secondary text-center">How It Works</h2>
          <div className="partner-grid">
            <div className="partner-card">
              <FontAwesomeIcon icon={faClipboardList} className="partner-icon" />
              <h3 className="partner-card-title">Step 1: Register</h3>
              <p className="partner-card-text">
                Sign up and create your organization’s profile on EduNexus.
              </p>
            </div>
            <div className="partner-card">
              <FontAwesomeIcon icon={faUsers} className="partner-icon" />
              <h3 className="partner-card-title">Step 2: List Scholarships</h3>
              <p className="partner-card-text">
                Submit your scholarship details and reach out to a wide pool of students.
              </p>
            </div>
            <div className="partner-card">
              <FontAwesomeIcon icon={faChartLine} className="partner-icon" />
              <h3 className="partner-card-title">Step 3: Manage Applications</h3>
              <p className="partner-card-text">
                Review applications and award scholarships through our secure platform.
              </p>
            </div>
          </div>
        </section>

        <section className="partner-section text-center">
          <h2 className="partner-heading-secondary">What Our Partners Say</h2>
          <p className="partner-text max-w-3xl mx-auto">
            "EduNexus has transformed the way we manage our scholarship programs. The platform is easy to use and has significantly increased our reach." — Partner Organization
          </p>
        </section>

        <section className="partner-section text-center">
          <h2 className="partner-heading-secondary">Ready to Get Started?</h2>
          <p className="partner-text max-w-3xl mx-auto">
            Join EduNexus today and be a part of a global initiative to make education accessible to everyone.
          </p>
          <button className="partner-button">Become a Partner</button>
        </section>
      </div>
    </MainLayout>
  );
};

export default PartnerWithUs;
