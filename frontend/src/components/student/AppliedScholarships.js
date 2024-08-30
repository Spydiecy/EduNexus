import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './AppliedScholarships.css';

const AppliedScholarships = () => {
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchAppliedScholarships = async () => {
      try {
        const account = window.ethereum.selectedAddress;
        const profile = await scholarshipPlatform.methods.profiles(account).call();
        
        // Ensure that profile.appliedScholarships is an array, even if it's empty or undefined
        const appliedScholarships = profile.appliedScholarships || [];
        
        setAppliedScholarships(appliedScholarships);
      } catch (error) {
        setStatusMessage(`Error fetching applied scholarships: ${error.message}`);
      }
    };

    fetchAppliedScholarships();
  }, []);

  return (
    <div className="view-applied-scholarships-box">
      <h2>
        <FontAwesomeIcon icon={faClipboardList} className="icon" />
        View Applied Scholarships
      </h2>
      <p className="info-text">
        These are the scholarships you have applied for.
      </p>
      {appliedScholarships.length === 0 ? (
        <p>You haven't applied for any scholarships yet.</p>
      ) : (
        <ul className="applied-scholarship-list">
          {appliedScholarships.map((scholarshipId, index) => (
            <li key={index}>Scholarship ID: {scholarshipId}</li>
          ))}
        </ul>
      )}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default AppliedScholarships;
