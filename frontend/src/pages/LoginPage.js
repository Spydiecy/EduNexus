// src/pages/LoginPage.js
import React, { useContext, useEffect } from 'react';
import MetaMaskLogin from '../components/MetaMaskLogin';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import scholarshipPlatform from '../scholarshipPlatform';
import { AccountContext } from '../context/AccountContext';
import './styles/LoginPage.css';

const ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
const ADMIN_ADDRESS = '0x2ec8175015Bef5ad1C0BE1587C4A377bC083A2d8';

const LoginPage = () => {
  const { account, setAccount } = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      if (account) {
        try {
          // Fetch the user's profile from the smart contract
          const profile = await scholarshipPlatform.methods.profiles(account).call();
          
          // Check if the user has the admin role or the specific address
          if (profile.role === ADMIN_ROLE || account.toLowerCase() === ADMIN_ADDRESS.toLowerCase()) {
            console.log('Admin detected, redirecting to admin panel...');
            navigate('/admin-dashboard', { state: { account } });
          } else {
            console.log('User is not admin, redirecting to dashboard...');
            navigate('/student-dashboard', { state: { account } });
          }
        } catch (error) {
          console.error('Error checking user role:', error);
        }
      }
    };

    checkUserRole();
  }, [account, navigate]);

  return (
    <MainLayout>
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Login to EduNexus</h1>
          <p className="login-subtitle">
            Access your account by connecting your MetaMask wallet.
          </p>
          <form className="login-form">
            <MetaMaskLogin setAccount={setAccount} />
            <p className="login-status">
              {account ? "Connected to MetaMask" : "Connecting to MetaMask..."}
            </p>
          </form>
        </div>
        <div className="login-image-container">
          <img
            src="https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-120316.jpg?ga=GA1.1.1499161691.1724335398&semt=ais_hybrid"
            alt="Login Illustration"
            className="login-image"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
