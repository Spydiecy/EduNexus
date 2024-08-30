import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import scholarshipPlatform from '../scholarshipPlatform';

const ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
const ORGANIZATION_ROLE = scholarshipPlatform.methods.ORGANIZATION_ROLE().call(); // Assuming you have this role defined in your contract
const ADMIN_ADDRESS = '0x2ec8175015Bef5ad1C0BE1587C4A377bC083A2d8';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      const account = window.ethereum.selectedAddress;
      if (!account) {
        setError("No account found. Please connect MetaMask.");
        setLoading(false);
        return;
      }

      try {
        // Check if the user is the admin based on address
        if (account.toLowerCase() === ADMIN_ADDRESS.toLowerCase()) {
          navigate('/admin-dashboard');
          return;
        }

        // Check the role using the contract's hasRole function
        const isAdmin = await scholarshipPlatform.methods.hasRole(ADMIN_ROLE, account).call();
        if (isAdmin) {
          navigate('/admin-dashboard');
          return;
        }

        const isOrganization = await scholarshipPlatform.methods.hasRole(ORGANIZATION_ROLE, account).call();
        if (isOrganization) {
          navigate('/organization-dashboard');
          return;
        }

        // Assume remaining users are students
        navigate('/student-dashboard');
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

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
