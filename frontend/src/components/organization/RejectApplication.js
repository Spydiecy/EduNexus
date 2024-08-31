// src/components/organization/RejectApplication.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './RejectApplication.css';

const RejectApplication = () => {
  const [applicationId, setApplicationId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleReject = async () => {
    try {
      await scholarshipPlatform.methods.rejectApplication(applicationId).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Application rejected successfully!');
    } catch (error) {
      setStatusMessage(`Error rejecting application: ${error.message}`);
    }
  };

  return (
    <div className="reject-application-box">
      <h2>
        <FontAwesomeIcon icon={faTimesCircle} className="icon" />
        Reject Application
      </h2>
      <p className="info-text">
        Reject a student's application for a scholarship by entering the application ID.
      </p>
      <input
        type="text"
        placeholder="Application ID"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleReject} className="primary-button">
        <FontAwesomeIcon icon={faTimesCircle} className="button-icon" />
        Reject Application
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default RejectApplication;
