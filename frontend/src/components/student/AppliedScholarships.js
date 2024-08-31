import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './AppliedScholarships.css';

const ScholarshipCategory = {
  0: "College",
  1: "School",
  2: "Project",
  3: "Work",
  4: "Research",
};

const AppliedScholarships = () => {
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedScholarships = async () => {
      try {
        const account = window.ethereum.selectedAddress;
        if (!account) {
          setError('No account found. Please connect MetaMask.');
          setLoading(false);
          return;
        }

        // Fetch the user profile
        const userProfile = await scholarshipPlatform.methods.profiles(account).call();
        console.log('User Profile:', userProfile);

        // Ensure appliedScholarships is an array
        const appliedScholarshipIds = userProfile.appliedScholarships || [];
        console.log('Applied Scholarship IDs:', appliedScholarshipIds);

        if (appliedScholarshipIds.length === 0) {
          console.log('No scholarships have been applied to.');
          setLoading(false);
          return;
        }

        const scholarshipPromises = appliedScholarshipIds.map((id) =>
          scholarshipPlatform.methods.scholarships(id).call()
        );

        const scholarshipsData = await Promise.all(scholarshipPromises);
        console.log('Scholarships Data:', scholarshipsData);

        const formattedScholarships = scholarshipsData.map((scholarship, index) => ({
          id: appliedScholarshipIds[index],
          ...scholarship,
          amount: Web3.utils.fromWei(scholarship.amount, 'ether'), // Convert Wei to Ether
          category: Number(scholarship.category),
          startDate: new Date(Number(scholarship.startDate) * 1000).toLocaleDateString(),
          endDate: new Date(Number(scholarship.endDate) * 1000).toLocaleDateString(),
        }));

        setAppliedScholarships(formattedScholarships);
      } catch (err) {
        console.error("Error fetching applied scholarships:", err);
        setError('Failed to load applied scholarships.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedScholarships();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading applied scholarships...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="applied-scholarships-box">
      <h2>
        <FontAwesomeIcon icon={faFileAlt} className="icon" />
        Applied Scholarships
      </h2>
      {appliedScholarships.length === 0 ? (
        <p className="no-scholarships-message">You have not applied for any scholarships yet.</p>
      ) : (
        appliedScholarships.map((scholarship, index) => (
          <div key={index} className="scholarship-card">
            <h3>Scholarship ID: {scholarship.id}</h3>
            <p><strong>Description:</strong> {scholarship.description}</p>
            <p><strong>Amount:</strong> {scholarship.amount} EDU</p>
            <p><strong>Category:</strong> {ScholarshipCategory[scholarship.category]}</p>
            <p><strong>Start Date:</strong> {scholarship.startDate}</p>
            <p><strong>End Date:</strong> {scholarship.endDate}</p>
            <p><strong>Max Approvals:</strong> {scholarship.maxApprovalCount.toString()}</p>
            <p><strong>Current Approvals:</strong> {scholarship.currentApprovalCount.toString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedScholarships;
