import React, { useEffect, useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null); // Initialize state to null
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
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-box">
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Verified:</strong> {profile.verified ? 'Yes' : 'No'}</p>
          <p><strong>Created Scholarships:</strong> {profile.createdScholarships ? profile.createdScholarships.length : 0}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
