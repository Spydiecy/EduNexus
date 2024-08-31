import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import scholarshipPlatform from '../scholarshipPlatform';
import './styles/Dashboard.css';

const ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
const ORGANIZATION_ROLE = '0xe0ae735793555d3fe7bb9c3f6f29e053c01c45cee237096b99b73ac619531dfb';
const STUDENT_ROLE = '0x6e0ae73f93755e3f6f29e053c01c45cee237096b99b73ac619531dfbf8392832'; // Example bytes32 for student role

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          if (accounts.length === 0) {
            setError("No account found. Please connect MetaMask.");
            setLoading(false);
            return;
          }

          const account = accounts[0];

          // Fetch the user's role from the smart contract
          const isAdmin = await scholarshipPlatform.methods.hasRole(ADMIN_ROLE, account).call();
          const isOrganization = await scholarshipPlatform.methods.hasRole(ORGANIZATION_ROLE, account).call();
          const isStudent = await scholarshipPlatform.methods.hasRole(STUDENT_ROLE, account).call();

          if (isAdmin) {
            setRole('Admin');
          } else if (isOrganization) {
            setRole('Organization');
          } else if (isStudent) {
            setRole('Student');
          } else {
            setError("No valid role found. Please contact support.");
          }

        } catch (err) {
          console.error("Error fetching user role:", err);
          setError("Failed to load profile. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("MetaMask is not installed. Please install MetaMask and try again.");
        setLoading(false);
      }
    };

    checkMetaMaskConnection();
  }, []);

  useEffect(() => {
    if (role) {
      switch (role) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'Organization':
          navigate('/organization-dashboard');
          break;
        case 'Student':
          navigate('/student-dashboard');
          break;
        default:
          setError('Invalid role. Please contact support.');
      }
    }
  }, [role, navigate]);

  if (loading) {
    return (
      <MainLayout>
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <p>Loading your profile...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <p>{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <p>Redirecting based on your role...</p>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
