// src/pages/StudentDashboard.js

import React, { useState } from 'react';
import Profile from '../components/student/Profile';
import ViewScholarships from '../components/student/ViewScholarships';
import ApplyScholarship from '../components/student/ApplyScholarship';
import AppliedScholarships from '../components/student/AppliedScholarships';
import SubmitFeedback from '../components/student/SubmitFeedback';
import './styles/StudentDashboard.css';
import MainLayout from '../layouts/MainLayout';

const StudentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('profile');

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <Profile />;
      case 'viewScholarships':
        return <ViewScholarships />;
      case 'applyScholarship':
        return <ApplyScholarship />;
      case 'viewAppliedScholarships':
        return <AppliedScholarships />;
      case 'submitFeedback':
        return <SubmitFeedback />;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <MainLayout>
      <div className="student-dashboard">
        <aside className="student-sidebar">
          <ul>
            <li onClick={() => setSelectedSection('profile')}>Profile</li>
            <li onClick={() => setSelectedSection('viewScholarships')}>View Scholarships</li>
            <li onClick={() => setSelectedSection('applyScholarship')}>Apply for Scholarship</li>
            <li onClick={() => setSelectedSection('viewAppliedScholarships')}>View Applied Scholarships</li>
            <li onClick={() => setSelectedSection('submitFeedback')}>Submit Feedback</li>
          </ul>
        </aside>
        <main className="student-content">
          {renderContent()}
        </main>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
