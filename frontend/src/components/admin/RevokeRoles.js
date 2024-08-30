import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import './RevokeRoles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';

const RevokeRoles = () => {
  const [userAddress, setUserAddress] = useState('');
  const [role, setRole] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const roleOptions = {
    Admin: '0x0000000000000000000000000000000000000000000000000000000000000000',
    Organization: scholarshipPlatform.methods.ORGANIZATION_ROLE().call(),
  };

  const handleRevokeRole = async () => {
    try {
      const roleHex = roleOptions[role];
      await scholarshipPlatform.methods.revokeRole(roleHex, userAddress).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Role revoked successfully');
    } catch (error) {
      setStatusMessage(`Error revoking role: ${error.message}`);
    }
  };

  return (
    <div className="revoke-roles-box">
      <h2>
        <FontAwesomeIcon icon={faUserSlash} className="revoke-icon" />
        Revoke Role
      </h2>
      <p className="info-text">
        Enter the user's address and select a role to revoke the specified role from the user within the platform.
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
      <button onClick={handleRevokeRole} className="primary-button">
        <FontAwesomeIcon icon={faUserSlash} className="button-icon" />
        Revoke Role
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default RevokeRoles;
