import React, { useState } from 'react';
import '../styles/Signup.css';
import { authAPI } from '../services/api';

const Signup = ({ onClose, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register({ username, email, password });
      
      if (response.success) {
        alert('Account created successfully!');
        onClose(); // Close the modal
        // You can add redirect logic here later
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Create your account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p className="switch-auth">
        Already have an account?{' '}
        <button onClick={switchToLogin}>Log in</button>
      </p>
    </div>
  );
};

export default Signup;
