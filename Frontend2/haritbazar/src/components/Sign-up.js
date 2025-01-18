import React, { useState } from 'react';
import { api } from '../axios'; 
import { useNavigate } from 'react-router-dom'; 
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/sign-up', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Sign Up failed. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#ACE1AF' }} className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: '400px', backgroundColor: '#018749', width: '350px' }}>
        <h2 className="text-center text-white mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp} className="d-flex flex-column align-items-center">
          <div className="mb-3 w-100">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p className="text-white-50">
            Already have an account? <a href="/user/sign-in" className="text-white">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
