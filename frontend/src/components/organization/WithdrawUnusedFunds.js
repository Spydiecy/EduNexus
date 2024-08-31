// src/components/organization/WithdrawUnusedFunds.js
import React, { useState } from 'react';
import scholarshipPlatform from '../../scholarshipPlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import './WithdrawUnusedFunds.css';

const WithdrawUnusedFunds = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleWithdraw = async () => {
    try {
      await scholarshipPlatform.methods.withdrawUnusedFunds(scholarshipId).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Unused funds withdrawn successfully!');
    } catch (error) {
      setStatusMessage(`Error withdrawing funds: ${error.message}`);
    }
  };

  return (
    <div className="withdraw-funds-box">
      <h2>
        <FontAwesomeIcon icon={faMoneyBillWave} className="icon" />
        Withdraw Unused Funds
      </h2>
      <p className="info-text">
        Withdraw any unused funds from a scholarship after the scholarship period has ended.
      </p>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleWithdraw} className="primary-button">
        <FontAwesomeIcon icon={faMoneyBillWave} className="button-icon" />
        Withdraw Funds
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default WithdrawUnusedFunds;
