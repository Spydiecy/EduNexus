import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './ViewScholarships.css';

// Define the ScholarshipCategory mapping
const ScholarshipCategory = {
  0: 'College',
  1: 'School',
  2: 'Project',
  3: 'Work',
  4: 'Research'
};

const ViewScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const totalScholarships = await scholarshipPlatform.methods.scholarships.length().call();
        console.log("Total Scholarships:", totalScholarships);

        if (totalScholarships > 0) {
          const scholarshipsList = [];
          const limit = Math.min(5, totalScholarships); // Fetch a maximum of 5 scholarships

          for (let i = 0; i < limit; i++) {
            const scholarship = await scholarshipPlatform.methods.scholarships(i).call();
            scholarshipsList.push(scholarship);
          }

          setScholarships(scholarshipsList);
        } else {
          setStatusMessage('No scholarships available at the moment.');
        }
      } catch (error) {
        setStatusMessage(`Error fetching scholarships: ${error.message}`);
        console.error("Error details:", error);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="view-scholarships-box">
      <h2>
        <FontAwesomeIcon icon={faGraduationCap} className="icon" />
        View Scholarships
      </h2>
      <p className="info-text">Browse through the list of available scholarships.</p>
      {scholarships.length === 0 ? (
        <p>{statusMessage}</p>
      ) : (
        <ul className="scholarship-list">
          {scholarships.map((scholarship, index) => (
            <li key={index}>
              <p><strong>Description:</strong> {scholarship.description}</p>
              <p><strong>Amount:</strong> {scholarship.amount} ETH</p>
              <p><strong>Category:</strong> {ScholarshipCategory[scholarship.category]}</p>
              <p><strong>Active:</strong> {scholarship.active ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
      {statusMessage && <p className="error-message">{statusMessage}</p>}
    </div>
  );
};

export default ViewScholarships;
