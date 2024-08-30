// src/components/organization/Profile.js
import React, { useState, useEffect } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const account = window.ethereum.selectedAddress;
        const userProfile = await scholarshipPlatform.methods.profiles(account).call();
        setProfile(userProfile);
      } catch (error) {
        setStatusMessage(`Error fetching profile: ${error.message}`);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-box">
      <h2>
        <FontAwesomeIcon icon={faBuilding} className="icon" />
        Organization Profile
      </h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}</p>
          <p><strong>Created Scholarships:</strong> {profile.createdScholarships.length}</p>
        </div>
      ) : (
        <p>{statusMessage}</p>
      )}
    </div>
  );
};

export default Profile;
