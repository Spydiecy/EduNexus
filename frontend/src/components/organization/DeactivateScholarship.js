// src/components/organization/DeactivateScholarship.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './DeactivateScholarship.css';

const DeactivateScholarship = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleDeactivate = async () => {
    try {
      await scholarshipPlatform.methods.deactivateScholarship(scholarshipId).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Scholarship deactivated successfully!');
    } catch (error) {
      setStatusMessage(`Error deactivating scholarship: ${error.message}`);
    }
  };

  return (
    <div className="deactivate-scholarship-box">
      <h2>
        <FontAwesomeIcon icon={faTimesCircle} className="icon" />
        Deactivate Scholarship
      </h2>
      <p className="info-text">
        Enter the ID of the scholarship you wish to deactivate. This will remove it from the list of active scholarships.
      </p>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleDeactivate} className="primary-button">
        <FontAwesomeIcon icon={faTimesCircle} className="button-icon" />
        Deactivate
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default DeactivateScholarship;


