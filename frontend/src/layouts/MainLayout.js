import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Updated icon for dashboard
import { AccountContext } from '../context/AccountContext';
import './MainLayout.css';
import logo from '../images/logo.png';

const MainLayout = ({ children }) => {
  const { account, handleLogout } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout(); // Ensure the logout function completes
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="container">
          <div className="header-left">
            <div className="logo">
              <Link to="/"><img src={logo} alt="EduNexus Logo" width='15%' height='15%' />EduNexus</Link>
            </div>
          </div>
          <div className="header-center">
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/partner-with-us">Partner With Us</Link></li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            {account ? (
              <>
                <Link to="/dashboard" className="dashboard-button">
                  <FontAwesomeIcon icon={faTachometerAlt} className="dashboard-icon" title="Dashboard" />
                  <span>Dashboard</span>
                </Link>
                <button className="logout-button" onClick={handleLogoutClick}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" title="Logout" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">Login</Link>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="main-footer">
        <div className="container">
          <p className="footer-text">&copy; 2024 EduNexus. All rights reserved.</p>
          <nav className="footer-nav">
            <ul>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
