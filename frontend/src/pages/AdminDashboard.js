// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faUserShield, faList, faUser, faLock, faUndoAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import VerifyOrganizations from '../components/admin/VerifyOrganizations';
import GrantRole from '../components/admin/GrantRole';
import GetOrganizationScholarships from '../components/admin/GetOrganizationScholarships';
import Profiles from '../components/admin/Profiles';
import HasRole from '../components/admin/HasRole';
import RevokeRoles from '../components/admin/RevokeRoles';
import AdminStats from '../components/admin/AdminStats';
import MainLayout from '../layouts/MainLayout';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedFunction, setSelectedFunction] = useState('stats');

  const renderContent = () => {
    switch (selectedFunction) {
      case 'verifyOrganizations':
        return <VerifyOrganizations />;
      case 'grantRole':
        return <GrantRole />;
      case 'getOrganizationScholarships':
        return <GetOrganizationScholarships />;
      case 'profiles':
        return <Profiles />;
      case 'hasRole':
        return <HasRole />;
      case 'revokeRoles':
        return <RevokeRoles />;
      case 'stats':
      default:
        return <AdminStats />;
    }
  };

  return (
    <MainLayout>
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <ul>
            <li onClick={() => setSelectedFunction('stats')}>
              <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
              Stats
            </li>
            <li onClick={() => setSelectedFunction('verifyOrganizations')}>
              <FontAwesomeIcon icon={faCheckCircle} className="sidebar-icon" />
              Verify Organizations
            </li>
            <li onClick={() => setSelectedFunction('grantRole')}>
              <FontAwesomeIcon icon={faUserShield} className="sidebar-icon" />
              Grant Role
            </li>
            <li onClick={() => setSelectedFunction('getOrganizationScholarships')}>
              <FontAwesomeIcon icon={faList} className="sidebar-icon" />
              Get Organization's Scholarships
            </li>
            <li onClick={() => setSelectedFunction('profiles')}>
              <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
              Profiles
            </li>
            <li onClick={() => setSelectedFunction('hasRole')}>
              <FontAwesomeIcon icon={faLock} className="sidebar-icon" />
              Has Role
            </li>
            <li onClick={() => setSelectedFunction('revokeRoles')}>
              <FontAwesomeIcon icon={faUndoAlt} className="sidebar-icon" />
              Revoke Roles
            </li>
          </ul>
        </aside>
        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
