// src/components/admin/VerifyOrganizations.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './VerifyOrganizations.css'; // New CSS file for this component

const VerifyOrganizations = () => {
  const [organizationAddress, setOrganizationAddress] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleVerify = async () => {
    try {
      await scholarshipPlatform.methods.verifyOrganization(organizationAddress).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Organization verified successfully!');
    } catch (error) {
      setStatusMessage(`Verification failed: ${error.message}`);
    }
  };

  return (
    <div className="verify-org">
      <h2>
        <FontAwesomeIcon icon={faCheckCircle} className="icon" /> Verify Organizations
      </h2>
      <p>
        Enter the Ethereum address of the organization you want to verify. This process ensures that the organization is trustworthy and authorized to create scholarships.
      </p>
      <input
        type="text"
        placeholder="Enter Organization Address"
        value={organizationAddress}
        onChange={(e) => setOrganizationAddress(e.target.value)}
        className="input-field"
      />
      <button onClick={handleVerify} className="primary-button">
        <FontAwesomeIcon icon={faCheckCircle} className="button-icon" /> Verify Organization
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default VerifyOrganizations;
