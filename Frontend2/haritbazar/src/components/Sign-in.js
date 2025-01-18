import React, { useState } from 'react';
import { api } from '../axios';  
import { useNavigate } from 'react-router-dom';  
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/sign-in', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ backgroundColor: '#ACE1AF' }} className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: '400px', backgroundColor: '#018749', width: '350px' }}>
        <h2 className="text-center text-white mb-4">Sign In</h2>
        <form onSubmit={handleSignIn} className="d-flex flex-column align-items-center">
          <div className="mb-3 w-100">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="d-grid">
            <button type="submit" className="btn btn-light rounded-pill" style={{ width: '100%' }}>
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <a href="/forgot-password" className="text-white">
            Forgot your password?
          </a>
        </div>
        <div className="mt-3 text-center">
          <p className="text-white-50">
            Don't have an account? <a href="/user/sign-up" className="text-white">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
