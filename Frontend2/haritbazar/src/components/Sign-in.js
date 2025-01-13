import React, { useState } from 'react';
import { api } from '../axios';  // Assuming axios.js is in the src folder
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/sign-in', { email, password });
      // Handle successful login, save token, etc.
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');  // Use navigate instead of history.push
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <div>
        <a href="/forgot-password" className="forgot-password-link">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default SignIn;
