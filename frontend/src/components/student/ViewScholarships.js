import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faDollarSign, faCalendarAlt, faBuilding, faEnvelope, faListAlt } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3';
import scholarshipPlatform from '../../scholarshipPlatform';
import './ViewScholarships.css';

const ScholarshipCategory = {
  0: "College",
  1: "School",
  2: "Project",
  3: "Work",
  4: "Research",
};

const ViewScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const maxScholarships = 5; // Fetch only up to 5 scholarships

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const scholarshipPromises = [];

        for (let i = 0; i < maxScholarships; i++) {
          scholarshipPromises.push(scholarshipPlatform.methods.scholarships(i).call().catch((err) => null));
        }

        const scholarshipsData = await Promise.all(scholarshipPromises);
        const validScholarships = scholarshipsData.filter(scholarship => scholarship !== null);

        const formattedScholarships = await Promise.all(
          validScholarships.map(async (scholarship, index) => {
            const organizationProfile = await scholarshipPlatform.methods.profiles(scholarship.listedBy).call();

            // Convert amount from Wei to Ether
            const amountInEdu = Web3.utils.fromWei(scholarship.amount, 'ether');

            return {
              ...scholarship,
              id: index,
              amount: `${amountInEdu} EDU`,
              category: Number(scholarship.category),
              startDate: new Date(Number(scholarship.startDate) * 1000).toLocaleDateString(),
              endDate: new Date(Number(scholarship.endDate) * 1000).toLocaleDateString(),
              organizationName: organizationProfile.name,
              organizationEmail: organizationProfile.email,
            };
          })
        );

        setScholarships(formattedScholarships);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        setError('Failed to load scholarships.');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading scholarships...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="scholarship-list">
      <h2><FontAwesomeIcon icon={faGraduationCap} className="icon" /> Available Scholarships</h2>
      {scholarships.length === 0 ? (
        <p className="no-scholarships-message">No scholarships available at the moment.</p>
      ) : (
        scholarships.map((scholarship, index) => (
          <div key={index} className="scholarship-card">
            <h3><FontAwesomeIcon icon={faListAlt} className="icon" /> Scholarship ID: {scholarship.id}</h3>
            <p><FontAwesomeIcon icon={faGraduationCap} className="icon" /> <strong>Description:</strong> {scholarship.description}</p>
            <p><FontAwesomeIcon icon={faDollarSign} className="icon" /> <strong>Amount:</strong> {scholarship.amount}</p>
            <p><FontAwesomeIcon icon={faGraduationCap} className="icon" /> <strong>Category:</strong> {ScholarshipCategory[scholarship.category]}</p>
            <p><FontAwesomeIcon icon={faCalendarAlt} className="icon" /> <strong>Start Date:</strong> {scholarship.startDate}</p>
            <p><FontAwesomeIcon icon={faCalendarAlt} className="icon" /> <strong>End Date:</strong> {scholarship.endDate}</p>
            <p><FontAwesomeIcon icon={faListAlt} className="icon" /> <strong>Max Approvals:</strong> {scholarship.maxApprovalCount.toString()}</p>
            <p><FontAwesomeIcon icon={faListAlt} className="icon" /> <strong>Current Approvals:</strong> {scholarship.currentApprovalCount.toString()}</p>
            <p><FontAwesomeIcon icon={faBuilding} className="icon" /> <strong>Listed By:</strong> {scholarship.listedBy}</p>
            <p><FontAwesomeIcon icon={faBuilding} className="icon" /> <strong>Organization Name:</strong> {scholarship.organizationName}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="icon" /> <strong>Organization Email:</strong> {scholarship.organizationEmail}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewScholarships;
