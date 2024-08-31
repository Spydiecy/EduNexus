// src/pages/OrganizationDashboard.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlusCircle, faBan, faEdit, faCheckCircle, faTimesCircle, faUserCheck, faDollarSign, faListAlt } from '@fortawesome/free-solid-svg-icons';
import Profile from '../components/organization/Profile';
import CreateScholarship from '../components/organization/CreateScholarship';
import DeactivateScholarship from '../components/organization/DeactivateScholarship';
import UpdateScholarship from '../components/organization/UpdateScholarship';
import ApproveApplication from '../components/organization/ApproveApplication';
import RejectApplication from '../components/organization/RejectApplication';
import FetchApplicantProfile from '../components/organization/FetchApplicantProfile';
import WithdrawUnusedFunds from '../components/organization/WithdrawUnusedFunds';
import FetchApplications from '../components/organization/FetchApplications'; // Import the new component
import MainLayout from '../layouts/MainLayout';
import './styles/OrganizationDashboard.css';

const OrganizationDashboard = () => {
  const [selectedFunction, setSelectedFunction] = useState('profile');

  const renderContent = () => {
    switch (selectedFunction) {
      case 'profile':
        return <Profile />;
      case 'createScholarship':
        return <CreateScholarship />;
      case 'deactivateScholarship':
        return <DeactivateScholarship />;
      case 'updateScholarship':
        return <UpdateScholarship />;
      case 'approveApplication':
        return <ApproveApplication />;
      case 'rejectApplication':
        return <RejectApplication />;
      case 'fetchApplicantProfile':
        return <FetchApplicantProfile />;
      case 'withdrawUnusedFunds':
        return <WithdrawUnusedFunds />;
      case 'fetchApplications': // Add the case for fetching applications
        return <FetchApplications />;
      default:
        return <Profile />;
    }
  };

  return (
    <MainLayout>
      <div className="organization-dashboard">
        <aside className="organization-sidebar">
          <ul>
            <li onClick={() => setSelectedFunction('profile')}>
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
              Profile
            </li>
            <li onClick={() => setSelectedFunction('createScholarship')}>
              <FontAwesomeIcon icon={faPlusCircle} className="sidebar-icon" />
              Create Scholarship
            </li>
            <li onClick={() => setSelectedFunction('deactivateScholarship')}>
              <FontAwesomeIcon icon={faBan} className="sidebar-icon" />
              Deactivate Scholarship
            </li>
            <li onClick={() => setSelectedFunction('updateScholarship')}>
              <FontAwesomeIcon icon={faEdit} className="sidebar-icon" />
              Update Scholarship
            </li>
            <li onClick={() => setSelectedFunction('approveApplication')}>
              <FontAwesomeIcon icon={faCheckCircle} className="sidebar-icon" />
              Approve Application
            </li>
            <li onClick={() => setSelectedFunction('rejectApplication')}>
              <FontAwesomeIcon icon={faTimesCircle} className="sidebar-icon" />
              Reject Application
            </li>
            <li onClick={() => setSelectedFunction('fetchApplicantProfile')}>
              <FontAwesomeIcon icon={faUserCheck} className="sidebar-icon" />
              Fetch Applicant Profile
            </li>
            <li onClick={() => setSelectedFunction('withdrawUnusedFunds')}>
              <FontAwesomeIcon icon={faDollarSign} className="sidebar-icon" />
              Withdraw Unused Funds
            </li>
            <li onClick={() => setSelectedFunction('fetchApplications')}>
              <FontAwesomeIcon icon={faListAlt} className="sidebar-icon" />
              Fetch Applications
            </li>
          </ul>
        </aside>
        <main className="organization-content">
          {renderContent()}
        </main>
      </div>
    </MainLayout>
  );
};

export default OrganizationDashboard;
