import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBuilding, faFileAlt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import scholarshipPlatform from '../../scholarshipPlatform';
import './AdminStats.css';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalStudents: 0,
    totalOrganizations: 0,
    totalScholarships: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total application count
        const totalApplications = await scholarshipPlatform.methods.applicationCount().call();
        console.log("Total Applications:", totalApplications);

        // Addresses of organizations
        const profileAddresses = [
          '0x0d1d649753155e2903e80b89201FFF09E238Eb3B',
          '0xAAfAf3D8df9D16f9d7B5dC12684440777C492dbd',
          // Add more addresses as needed
        ];

        let totalScholarships = 0;
        let totalStudents = 0;
        let totalOrganizations = 0;

        for (let i = 0; i < profileAddresses.length; i++) {
          const address = profileAddresses[i];
          console.log(`Fetching profile for address: ${address}`);
          const profile = await scholarshipPlatform.methods.profiles(address).call();
          console.log("Profile Data:", profile);

          if (profile.role === "Student") {
            totalStudents++;
          } else if (profile.role === "Organization") {
            totalOrganizations++;
            if (profile.verified) {
              const scholarshipIds = await scholarshipPlatform.methods.getOrganizationScholarships(address).call();
              totalScholarships += scholarshipIds.length;
              console.log(`Organization ${address} has ${scholarshipIds.length} scholarships.`);
            }
          }
        }

        setStats({
          totalApplications: totalApplications.toString(),
          totalStudents,
          totalOrganizations,
          totalScholarships,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Set default stats in case of an error
        setStats({
          totalApplications: "Error",
          totalStudents: "Error",
          totalOrganizations: "Error",
          totalScholarships: "Error",
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-stats">
      <div className="stats-box">
        <FontAwesomeIcon icon={faFileAlt} className="stats-icon" />
        <h3>Total Applications</h3>
        <p>{stats.totalApplications}</p>
        <p className="stats-description">Number of applications submitted by students for various scholarships.</p>
      </div>
      <div className="stats-box">
        <FontAwesomeIcon icon={faUsers} className="stats-icon" />
        <h3>Total Students</h3>
        <p>{stats.totalStudents}</p>
        <p className="stats-description">Total number of students registered on the platform.</p>
      </div>
      <div className="stats-box">
        <FontAwesomeIcon icon={faBuilding} className="stats-icon" />
        <h3>Total Organizations</h3>
        <p>{stats.totalOrganizations}</p>
        <p className="stats-description">Total number of organizations verified on the platform.</p>
      </div>
      <div className="stats-box">
        <FontAwesomeIcon icon={faGraduationCap} className="stats-icon" />
        <h3>Total Scholarships</h3>
        <p>{stats.totalScholarships}</p>
        <p className="stats-description">Number of scholarships created and available for students.</p>
      </div>
    </div>
  );
};

export default AdminStats;
