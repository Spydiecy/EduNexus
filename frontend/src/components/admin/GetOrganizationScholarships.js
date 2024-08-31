import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import Web3 from 'web3';
import './GetOrganizationScholarships.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faIdBadge } from '@fortawesome/free-solid-svg-icons';

const ScholarshipCategory = {
  0: "College",
  1: "School",
  2: "Project",
  3: "Work",
  4: "Research",
};

const GetOrganizationScholarships = () => {
  const [organizationAddress, setOrganizationAddress] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleGetScholarships = async () => {
    try {
      const scholarshipIds = await scholarshipPlatform.methods.getOrganizationScholarships(organizationAddress).call();
      console.log('Scholarship IDs:', scholarshipIds);

      const scholarshipDetailsPromises = scholarshipIds.map(id =>
        scholarshipPlatform.methods.scholarships(id.toString()).call()
      );
      const scholarshipDetails = await Promise.all(scholarshipDetailsPromises);
      console.log('Scholarship Details:', scholarshipDetails);

      const formattedScholarships = scholarshipDetails.map((scholarship, index) => {
        if (!scholarship) return null;

        const amountInEdu = Web3.utils.fromWei(scholarship.amount, 'ether');

        return {
          id: scholarshipIds[index].toString(),
          ...scholarship,
          amount: amountInEdu,
          category: scholarship.category !== undefined ? ScholarshipCategory[Number(scholarship.category)] : "Unknown",
          startDate: scholarship.startDate ? new Date(Number(scholarship.startDate) * 1000).toLocaleDateString() : "N/A",
          endDate: scholarship.endDate ? new Date(Number(scholarship.endDate) * 1000).toLocaleDateString() : "N/A",
          maxApprovalCount: scholarship.maxApprovalCount ? scholarship.maxApprovalCount.toString() : "N/A",
          currentApprovalCount: scholarship.currentApprovalCount ? scholarship.currentApprovalCount.toString() : "N/A",
        };
      }).filter(scholarship => scholarship !== null); // Filter out any null values

      setScholarships(formattedScholarships);
      setStatusMessage(`Found ${scholarshipIds.length} scholarships`);
    } catch (error) {
      setStatusMessage(`Error fetching scholarships: ${error.message}`);
    }
  };

  return (
    <div className="get-scholarships-box">
      <h2>
        <FontAwesomeIcon icon={faBuilding} className="icon" />
        Get Organization's Scholarships
      </h2>
      <p className="info-text">
        Enter the organization's address to retrieve all scholarships created by them. This function helps administrators keep track of the contributions made by various organizations.
      </p>
      <input
        type="text"
        placeholder="Organization Address"
        value={organizationAddress}
        onChange={(e) => setOrganizationAddress(e.target.value)}
        className="input-field"
      />
      <button onClick={handleGetScholarships} className="primary-button">
        <FontAwesomeIcon icon={faBuilding} className="button-icon" />
        Get Scholarships
      </button>
      <p className="status-message">{statusMessage}</p>
      <ul className="scholarship-list">
        {scholarships.map((scholarship, index) => (
          <li key={index} className="scholarship-card">
            <h3><FontAwesomeIcon icon={faIdBadge} className="icon" /> Scholarship ID: {scholarship.id}</h3>
            <p><strong>Description:</strong> {scholarship.description || "N/A"}</p>
            <p><strong>Amount:</strong> {scholarship.amount} EDU</p>
            <p><strong>Category:</strong> {scholarship.category}</p>
            <p><strong>Start Date:</strong> {scholarship.startDate}</p>
            <p><strong>End Date:</strong> {scholarship.endDate}</p>
            <p><strong>Max Approvals:</strong> {scholarship.maxApprovalCount}</p>
            <p><strong>Current Approvals:</strong> {scholarship.currentApprovalCount}</p>
            <p><strong>Listed By:</strong> {scholarship.listedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetOrganizationScholarships;
