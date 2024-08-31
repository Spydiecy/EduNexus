import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCheckCircle, faTimesCircle, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3';
import scholarshipPlatform from '../../scholarshipPlatform';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const account = window.ethereum.selectedAddress;
        if (!account) {
          setError('No account found. Please connect MetaMask.');
          setLoading(false);
          return;
        }

        const userProfile = await scholarshipPlatform.methods.profiles(account).call();
        setProfile(userProfile);
      } catch (err) {
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="profile-box">
      <h2><FontAwesomeIcon icon={faUser} className="icon" /> Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p><FontAwesomeIcon icon={faUser} className="icon" /> <strong>Name:</strong> {profile.name}</p>
          <p><FontAwesomeIcon icon={faGraduationCap} className="icon" /> <strong>Role:</strong> {profile.role}</p>
          <p><FontAwesomeIcon icon={faEnvelope} className="icon" /> <strong>Email:</strong> {profile.email}</p>
          <p>
            <FontAwesomeIcon icon={profile.verified ? faCheckCircle : faTimesCircle} className="icon" />
            <strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}
          </p>
          <p>
            <FontAwesomeIcon icon={faGraduationCap} className="icon" />
            <strong>Created Scholarships:</strong> {profile.createdScholarships ? profile.createdScholarships.length : 0}
          </p>
        </div>
      ) : (
        <p className="no-data-message">No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
