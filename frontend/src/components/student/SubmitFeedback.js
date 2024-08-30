// src/components/student/SubmitFeedback.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './SubmitFeedback.css';

const SubmitFeedback = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmitFeedback = async () => {
    try {
      await scholarshipPlatform.methods.submitFeedback(scholarshipId, feedback, rating).send({ from: window.ethereum.selectedAddress });
      setStatusMessage('Feedback submitted successfully!');
    } catch (error) {
      setStatusMessage(`Feedback submission failed: ${error.message}`);
    }
  };

  return (
    <div className="submit-feedback-box">
      <h2>
        <FontAwesomeIcon icon={faComment} className="icon" />
        Submit Feedback
      </h2>
      <p className="info-text">
        Provide feedback on the scholarships you've received.
      </p>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Enter your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="textarea-field"
      />
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        max="5"
        min="1"
        className="input-field"
      />
      <button onClick={handleSubmitFeedback} className="primary-button">
        <FontAwesomeIcon icon={faComment} className="button-icon" />
        Submit Feedback
      </button>
      <p className="status-message">{statusMessage}</p>
    </div>
  );
};

export default SubmitFeedback;
