import React, { useState } from 'react';
import './Login.css';

const Login = ({ onClose, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
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
        <button type="submit" className="submit-btn">Log in</button>
      </form>
      <p className="switch-auth">
        Don't have an account?{' '}
        <button onClick={switchToSignup}>Sign up</button>
      </p>
    </div>
  );
};

export default Login;
