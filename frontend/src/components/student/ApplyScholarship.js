import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './ApplyScholarship.css';

const ApplyScholarship = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [reason, setReason] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [appliedScholarshipIds, setAppliedScholarshipIds] = useState([]);

  useEffect(() => {
    const fetchAppliedScholarships = async () => {
      try {
        const account = window.ethereum.selectedAddress;
        if (!account) {
          setStatusMessage('No account found. Please connect MetaMask.');
          return;
        }

        // Fetch the user profile
        const userProfile = await scholarshipPlatform.methods.profiles(account).call();

        // Ensure appliedScholarships is defined and is an array
        const appliedIds = userProfile.appliedScholarships ? userProfile.appliedScholarships.map(id => id.toString()) : [];
        setAppliedScholarshipIds(appliedIds);
      } catch (error) {
        setStatusMessage(`Error fetching applied scholarships: ${error.message}`);
      }
    };

    fetchAppliedScholarships();
  }, []);

  const handleApply = async () => {
    const parsedScholarshipId = scholarshipId.trim();
    
    if (appliedScholarshipIds.includes(parsedScholarshipId)) {
      setStatusMessage('You have already applied for this scholarship.');
      return;
    }

    try {
      await scholarshipPlatform.methods.applyForScholarship(parsedScholarshipId, reason).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Applied for scholarship successfully!');
    } catch (error) {
      setStatusMessage(`Application failed: ${error.message}`);
    }
  };

  return (
    <div className="apply-scholarship-box">
      <h2>
        <FontAwesomeIcon icon={faFileAlt} className="icon" />
        Apply for Scholarship
      </h2>
      <p className="info-text">
        Fill in the scholarship ID and your reason for applying.
      </p>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Reason for applying"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="textarea-field"
      />
      <button onClick={handleApply} className="primary-button">
        <FontAwesomeIcon icon={faFileAlt} className="button-icon" />
        Apply
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default ApplyScholarship;
