import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Login Component
 * Handles user authentication with user ID and password
 * TODO: Implement authentication logic
 * TODO: Connect to backend API for login validation
 * TODO: Store authentication token/session
 */

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call to backend for authentication
    // Example: await axios.post('/api/auth/login', { userId, password });
    
    console.log('Login attempt:', { userId, password });
    
    // TODO: On successful login, navigate to dashboard
    // navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h2>Cricket App Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
