import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import './Profiles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profiles = () => {
  const [userAddress, setUserAddress] = useState('');
  const [profile, setProfile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleGetProfile = async () => {
    try {
      const userProfile = await scholarshipPlatform.methods.profiles(userAddress).call();
      setProfile(userProfile);
      setStatusMessage('Profile retrieved successfully');
    } catch (error) {
      setStatusMessage(`Error fetching profile: ${error.message}`);
    }
  };

  return (
    <div className="profiles-box">
      <h2>
        <FontAwesomeIcon icon={faUser} className="icon" />
        Get Profile
      </h2>
      <p className="info-text">
        Enter the user's address to retrieve their profile information. This allows administrators to view details such as name, role, email, and verification status.
      </p>
      <input
        type="text"
        placeholder="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        className="input-field"
      />
      <button onClick={handleGetProfile} className="primary-button">
        <FontAwesomeIcon icon={faUser} className="button-icon" />
        Get Profile
      </button>
      <p className="status-message">{statusMessage}</p>
      {profile && (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default Profiles;
