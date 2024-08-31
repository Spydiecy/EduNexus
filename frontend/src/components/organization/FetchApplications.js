// src/components/organization/FetchApplications.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import Web3 from 'web3';
import './FetchApplications.css';

const FetchApplications = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [applications, setApplications] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFetchApplications = async () => {
    try {
      const applicationCount = await scholarshipPlatform.methods.applicationCount().call();
      const applicationsData = [];

      for (let i = 1; i <= applicationCount; i++) {
        const application = await scholarshipPlatform.methods.applications(i).call();
        if (application.scholarshipId === scholarshipId) {
          applicationsData.push(application);
        }
      }

      if (applicationsData.length === 0) {
        setStatusMessage('No applications found for this scholarship ID.');
      } else {
        setApplications(applicationsData);
        setStatusMessage(`${applicationsData.length} application(s) found.`);
      }
    } catch (error) {
      setStatusMessage(`Error fetching applications: ${error.message}`);
    }
  };

  return (
    <div className="fetch-applications-box">
      <h2>
        <FontAwesomeIcon icon={faListAlt} className="icon" />
        Fetch Applications by Scholarship ID
      </h2>
      <input
        type="text"
        placeholder="Enter Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleFetchApplications} className="primary-button">
        Fetch Applications
      </button>
      <p className="status-message">{statusMessage}</p>
      {applications.length > 0 && (
        <ul className="application-list">
          {applications.map((application, index) => (
            <li key={index} className="application-card">
              <p><strong>Applicant Address:</strong> {application.applicant}</p>
              <p><strong>Reason:</strong> {application.reason}</p>
              <p><strong>Approved:</strong> {application.approved ? 'Yes' : 'No'}</p>
              <p><strong>Rejected:</strong> {application.rejected ? 'Yes' : 'No'}</p>
              <p><strong>Applied At:</strong> {new Date(Number(application.appliedAt) * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchApplications;
