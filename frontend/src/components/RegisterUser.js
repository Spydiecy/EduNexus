// src/components/RegisterUser.js

import React, { useState } from 'react';
import scholarshipPlatform from '../scholarshipPlatform';

const RegisterUser = ({ account }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(''); // No default role
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!account) {
        throw new Error("No account found. Please connect to MetaMask.");
      }

      if (!role) {
        throw new Error("Please select a role.");
      }

      await scholarshipPlatform.methods.registerUser(name, role, email).send({
        from: account,
        gas: 3000000, // Adjust gas limit as needed
      });

      setSuccess('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="" disabled>Select Role</option>
        <option value="Student">Student</option>
        <option value="Organization">Organization</option>
      </select>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default RegisterUser;
