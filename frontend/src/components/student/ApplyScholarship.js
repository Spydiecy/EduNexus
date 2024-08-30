// src/components/student/ApplyScholarship.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './ApplyScholarship.css';

const ApplyScholarship = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [reason, setReason] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleApply = async () => {
    try {
      await scholarshipPlatform.methods.applyForScholarship(scholarshipId, reason).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Applied for scholarship successfully!');
    } catch (error) {
      setStatusMessage(`Application failed: ${error.message}`);
    }
  };

  return (
    <div className="apply-scholarship-box">
      <h2>
        <FontAwesomeIcon icon={faFileAlt} className="icon" />
        Apply for Scholarship
      </h2>
      <p className="info-text">
        Fill in the scholarship ID and your reason for applying.
      </p>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Reason for applying"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="textarea-field"
      />
      <button onClick={handleApply} className="primary-button">
        <FontAwesomeIcon icon={faFileAlt} className="button-icon" />
        Apply
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default ApplyScholarship;
