import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../axios'; // Importing the API instance

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/user/request-password-reset', { email });
      setMessage(response.data.message);

      // On successful OTP send, navigate to reset-password page
      if (response.status === 200) {
        navigate(`/reset-password?email=${email}`); // Pass email as query param to reset page
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error sending OTP.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
