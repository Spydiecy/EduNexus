// src/components/organization/ApproveApplication.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ApproveApplication.css';

const ApproveApplication = () => {
  const [applicationId, setApplicationId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleApprove = async () => {
    try {
      await scholarshipPlatform.methods.approveApplication(applicationId).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Application approved successfully!');
    } catch (error) {
      setStatusMessage(`Error approving application: ${error.message}`);
    }
  };

  return (
    <div className="approve-application-box">
      <h2>
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Approve Application
      </h2>
      <p className="info-text">
        Approve a student's application for a scholarship by entering the application ID.
      </p>
      <input
        type="text"
        placeholder="Application ID"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleApprove} className="primary-button">
        <FontAwesomeIcon icon={faCheckCircle} className="button-icon" />
        Approve Application
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default ApproveApplication;
