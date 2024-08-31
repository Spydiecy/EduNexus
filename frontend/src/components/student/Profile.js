// src/components/student/Profile.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './ProfileStudent.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const account = window.ethereum.selectedAddress;
        const userProfile = await scholarshipPlatform.methods.profiles(account).call();
        setProfile(userProfile);
        setStatusMessage('Profile loaded successfully');
      } catch (error) {
        setStatusMessage(`Error loading profile: ${error.message}`);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-box">
      <h2>
        <FontAwesomeIcon icon={faUser} className="icon" />
        Profile
      </h2>
      <p className="info-text">
        Here are the details associated with your account.
      </p>
      {profile ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>{statusMessage}</p>
      )}
    </div>
  );
};

export default Profile;
