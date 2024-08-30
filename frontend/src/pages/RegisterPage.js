import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import MetaMaskLogin from '../components/MetaMaskLogin';
import scholarshipPlatform from '../scholarshipPlatform';
import './styles/RegisterPage.css';

const RegisterPage = () => {
  const [account, setAccount] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!account) {
        throw new Error("No account found. Please connect to MetaMask.");
      }

      await scholarshipPlatform.methods.registerUser(name, role, email).send({
        from: account,
        gas: 3000000
      });

      alert('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      <div className="register-container">
        <div className="register-content">
          <h1 className="register-title">Register with EduNexus</h1>
          <p className="register-subtitle">
            Join our platform and start your journey towards accessible education and opportunities.
          </p>
          <form className="register-form" onSubmit={handleRegister}>
            {!account ? (
              <MetaMaskLogin setAccount={setAccount} />
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="role">Role</label>
                  <select
                    id="role"
                    className="form-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Organization">Organization</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="register-button">Register</button>
              </>
            )}
          </form>
        </div>
        <div className="register-image-container">
          <img
            src="https://img.freepik.com/free-photo/register-now-application-information-concept_53876-125162.jpg?ga=GA1.1.1499161691.1724335398&semt=ais_hybrid"
            alt="Register Illustration"
            className="register-image"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
