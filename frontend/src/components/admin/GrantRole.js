import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import './GrantRole.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

const GrantRole = () => {
  const [userAddress, setUserAddress] = useState('');
  const [role, setRole] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleGrantRole = async () => {
    try {
      await scholarshipPlatform.methods.grantRole(role, userAddress).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Role granted successfully!');
    } catch (error) {
      setStatusMessage(`Grant role failed: ${error.message}`);
    }
  };

  return (
    <div className="grant-role-box">
      <h2>
        <FontAwesomeIcon icon={faUserShield} className="icon" />
        Grant Role
      </h2>
      <p className="info-text">
        Use this function to assign specific roles to users within the platform. Available roles are Admin, Organization, and Student.
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
        className="role-dropdown"
      >
        <option value="" disabled>Select Role</option>
        <option value="0x0000000000000000000000000000000000000000000000000000000000000000">Admin</option>
        <option value="0xe0ae735793555d3fe7bb9c3f6f29e053c01c45cee237096b99b73ac619531dfb">Organization</option>
      </select>
      <button onClick={handleGrantRole} className="primary-button">
        <FontAwesomeIcon icon={faUserShield} className="button-icon" />
        Grant Role
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default GrantRole;
