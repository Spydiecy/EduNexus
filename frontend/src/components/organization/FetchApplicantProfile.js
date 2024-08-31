// src/components/organization/FetchApplicantProfile.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './FetchApplicantProfile.css';

const FetchApplicantProfile = () => {
  const [applicantAddress, setApplicantAddress] = useState('');
  const [profile, setProfile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFetchProfile = async () => {
    try {
      const userProfile = await scholarshipPlatform.methods.profiles(applicantAddress).call();
      setProfile(userProfile);
      setStatusMessage('Profile retrieved successfully!');
    } catch (error) {
      setStatusMessage(`Error fetching profile: ${error.message}`);
    }
  };

  return (
    <div className="fetch-applicant-profile-box">
      <h2>
        <FontAwesomeIcon icon={faUser} className="icon" />
        Fetch Applicant Profile
      </h2>
      <p className="info-text">
        Enter the address of the applicant to retrieve their profile information.
      </p>
      <input
        type="text"
        placeholder="Applicant Address"
        value={applicantAddress}
        onChange={(e) => setApplicantAddress(e.target.value)}
        className="input-field"
      />
      <button onClick={handleFetchProfile} className="primary-button">
        <FontAwesomeIcon icon={faUser} className="button-icon" />
        Fetch Profile
      </button>
      <p className="status-message">{statusMessage}</p>
      {profile && (
        <div className="profile-details">
          <p>Name: {profile.name}</p>
          <p>Role: {profile.role}</p>
          <p>Email: {profile.email}</p>
          <p>Verified: {profile.verified ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default FetchApplicantProfile;
