// src/components/organization/UpdateScholarship.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './UpdateScholarship.css';

const UpdateScholarship = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxApprovalCount, setMaxApprovalCount] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleUpdate = async () => {
    try {
      await scholarshipPlatform.methods
        .updateScholarship(scholarshipId, description, new Date(endDate).getTime(), maxApprovalCount, [])
        .send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Scholarship updated successfully!');
    } catch (error) {
      setStatusMessage(`Error updating scholarship: ${error.message}`);
    }
  };

  return (
    <div className="update-scholarship-box">
      <h2>
        <FontAwesomeIcon icon={faEdit} className="icon" />
        Update Scholarship
      </h2>
      <p className="info-text">
        Update the details of an existing scholarship by entering the scholarship ID and the new information.
      </p>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Max Approval Count"
        value={maxApprovalCount}
        onChange={(e) => setMaxApprovalCount(e.target.value)}
        className="input-field"
      />
      <button onClick={handleUpdate} className="primary-button">
        <FontAwesomeIcon icon={faEdit} className="button-icon" />
        Update Scholarship
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default UpdateScholarship;


