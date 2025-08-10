import React, { useState } from 'react';
import './Login.css';
import apiService from '../services/api';

const Login = ({ onClose, switchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.login(email, password);
      console.log('Login successful:', response);
      onLoginSuccess && onLoginSuccess(response.user);
      onClose();
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Log in to Epita Twitter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p className="switch-auth">
        Don't have an account?{' '}
        <button onClick={switchToSignup}>Sign up</button>
      </p>
    </div>
  );
};

export default Login;
