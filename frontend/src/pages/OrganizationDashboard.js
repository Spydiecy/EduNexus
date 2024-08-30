// src/pages/OrganizationDashboard.js
import React, { useState } from 'react';
import Profile from '../components/organization/Profile';
import CreateScholarship from '../components/organization/CreateScholarship';
import DeactivateScholarship from '../components/organization/DeactivateScholarship';
import UpdateScholarship from '../components/organization/UpdateScholarship';
import ApproveApplication from '../components/organization/ApproveApplication';
import RejectApplication from '../components/organization/RejectApplication';
import FetchApplicantProfile from '../components/organization/FetchApplicantProfile';
import WithdrawUnusedFunds from '../components/organization/WithdrawUnusedFunds';
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
      default:
        return <Profile />;
    }
  };

  return (
    <div className="organization-dashboard">
      <aside className="organization-sidebar">
        <ul>
          <li onClick={() => setSelectedFunction('profile')}>Profile</li>
          <li onClick={() => setSelectedFunction('createScholarship')}>Create Scholarship</li>
          <li onClick={() => setSelectedFunction('deactivateScholarship')}>Deactivate Scholarship</li>
          <li onClick={() => setSelectedFunction('updateScholarship')}>Update Scholarship</li>
          <li onClick={() => setSelectedFunction('approveApplication')}>Approve Application</li>
          <li onClick={() => setSelectedFunction('rejectApplication')}>Reject Application</li>
          <li onClick={() => setSelectedFunction('fetchApplicantProfile')}>Fetch Applicant Profile</li>
          <li onClick={() => setSelectedFunction('withdrawUnusedFunds')}>Withdraw Unused Funds</li>
        </ul>
      </aside>
      <main className="organization-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default OrganizationDashboard;
