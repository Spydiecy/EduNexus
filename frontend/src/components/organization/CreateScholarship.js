import React, { useState } from 'react';
import Web3 from 'web3';
import scholarshipPlatform from '../../scholarshipPlatform';
import './CreateScholarship.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const CreateScholarship = () => {
  const [amountInEth, setAmountInEth] = useState(''); // Amount in ETH
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxApprovals, setMaxApprovals] = useState('');
  const [requirements, setRequirements] = useState(['']);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAddRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const handleRemoveRequirement = (index) => {
    const newRequirements = requirements.slice();
    newRequirements.splice(index, 1);
    setRequirements(newRequirements);
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = requirements.slice();
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleCreateScholarship = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const amountInWei = web3.utils.toWei(amountInEth, 'ether'); // Convert ETH to Wei

      await scholarshipPlatform.methods
        .addScholarship(
          amountInWei,
          description,
          category,
          new Date(startDate).getTime(),
          new Date(endDate).getTime(),
          maxApprovals,
          requirements
        )
        .send({
          from: window.ethereum.selectedAddress,
          value: amountInWei * maxApprovals, // Sending the total fund amount required in Wei
          gas: 3000000,
        });
      setStatusMessage('Scholarship created successfully!');
    } catch (error) {
      setStatusMessage(`Failed to create scholarship: ${error.message}`);
    }
  };

  return (
    <div className="create-scholarship-box">
      <h2>
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
        Create Scholarship
      </h2>
      <p className="info-text">
        Use this form to create a new scholarship. Please provide all the necessary details including scholarship amount in Ether, description, category, start date, end date, maximum approvals, and any additional requirements.
      </p>
      <input
        type="text"
        placeholder="Scholarship Amount (in EDU)"
        value={amountInEth}
        onChange={(e) => setAmountInEth(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field"
        required
      >
        <option value="" disabled>Select Category</option>
        <option value="0">College</option>
        <option value="1">School</option>
        <option value="2">Project</option>
        <option value="3">Work</option>
        <option value="4">Research</option>
      </select>
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="number"
        placeholder="Max Approvals"
        value={maxApprovals}
        onChange={(e) => setMaxApprovals(e.target.value)}
        className="input-field"
        required
      />
      <div className="requirements-section">
        <h3>Additional Requirements</h3>
        {requirements.map((requirement, index) => (
          <div key={index} className="requirement-item">
            <input
              type="text"
              placeholder="Requirement"
              value={requirement}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveRequirement(index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddRequirement} className="add-button">
          Add Requirement
        </button>
      </div>
      <button onClick={handleCreateScholarship} className="primary-button">
        <FontAwesomeIcon icon={faPlusCircle} className="button-icon" />
        Create Scholarship
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default CreateScholarship;
