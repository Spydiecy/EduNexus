// src/components/organization/CreateScholarship.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './CreateScholarship.css';

const CreateScholarship = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('0');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCreateScholarship = async () => {
    try {
      await scholarshipPlatform.methods
        .addScholarship(amount, description, category, Date.now(), Date.now() + 30 * 24 * 60 * 60, 10, [])
        .send({ from: window.ethereum.selectedAddress, value: amount });
      setStatusMessage('Scholarship created successfully!');
    } catch (error) {
      setStatusMessage(`Error creating scholarship: ${error.message}`);
    }
  };

  return (
    <div className="create-scholarship-box">
      <h2>
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
        Create Scholarship
      </h2>
      <p className="info-text">
        Create a new scholarship by specifying the amount, description, category, and other details.
      </p>
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-dropdown">
        <option value="0">College</option>
        <option value="1">School</option>
        <option value="2">Project</option>
        <option value="3">Work</option>
        <option value="4">Research</option>
      </select>
      <button onClick={handleCreateScholarship} className="primary-button">
        <FontAwesomeIcon icon={faPlusCircle} className="button-icon" />
        Create Scholarship
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default CreateScholarship;
