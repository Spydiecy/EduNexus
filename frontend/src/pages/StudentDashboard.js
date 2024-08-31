// src/pages/StudentDashboard.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEdit, faClipboardList, faComment } from '@fortawesome/free-solid-svg-icons';
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
            <li onClick={() => setSelectedSection('profile')}>
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
              Profile
            </li>
            <li onClick={() => setSelectedSection('viewScholarships')}>
              <FontAwesomeIcon icon={faEye} className="sidebar-icon" />
              View Scholarships
            </li>
            <li onClick={() => setSelectedSection('applyScholarship')}>
              <FontAwesomeIcon icon={faEdit} className="sidebar-icon" />
              Apply for Scholarship
            </li>
            <li onClick={() => setSelectedSection('viewAppliedScholarships')}>
              <FontAwesomeIcon icon={faClipboardList} className="sidebar-icon" />
              View Applied Scholarships
            </li>
            <li onClick={() => setSelectedSection('submitFeedback')}>
              <FontAwesomeIcon icon={faComment} className="sidebar-icon" />
              Submit Feedback
            </li>
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
