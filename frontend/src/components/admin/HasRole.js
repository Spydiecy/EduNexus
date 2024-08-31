import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import './HasRole.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const HasRole = () => {
  const [userAddress, setUserAddress] = useState('');
  const [role, setRole] = useState('');
  const [hasRole, setHasRole] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const roleOptions = {
    Admin: '0x0000000000000000000000000000000000000000000000000000000000000000',
    Organization: '0xe0ae735793555d3fe7bb9c3f6f29e053c01c45cee237096b99b73ac619531dfb',
  };

  const handleHasRole = async () => {
    try {
      const roleHex = roleOptions[role];
      const result = await scholarshipPlatform.methods.hasRole(roleHex, userAddress).call();
      setHasRole(result);
      setStatusMessage('Role checked successfully');
    } catch (error) {
      setStatusMessage(`Error checking role: ${error.message}`);
    }
  };

  return (
    <div className="hasrole-box">
      <h2>
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Check User Role
      </h2>
      <p className="info-text">
        Enter the user's address and select a role to check if the user has the specified role within the platform.
      </p>
      <input
        type="text"
        placeholder="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        className="input-field"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="dropdown"
      >
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Organization">Organization</option>
      </select>
      <button onClick={handleHasRole} className="primary-button">
        <FontAwesomeIcon icon={faCheckCircle} className="button-icon" />
        Check Role
      </button>
      <p className="status-message">{statusMessage}</p>
      {hasRole !== null && (
        <p className="result-message">
          {hasRole ? 'User has the role' : 'User does not have the role'}
        </p>
      )}
    </div>
  );
};

export default HasRole;
