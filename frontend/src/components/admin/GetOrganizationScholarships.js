import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import './GetOrganizationScholarships.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const GetOrganizationScholarships = () => {
  const [organizationAddress, setOrganizationAddress] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleGetScholarships = async () => {
    try {
      const scholarshipIds = await scholarshipPlatform.methods.getOrganizationScholarships(organizationAddress).call();
      setScholarships(scholarshipIds);
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
        {scholarships.map((scholarshipId, index) => (
          <li key={index}>Scholarship ID: {scholarshipId}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetOrganizationScholarships;
