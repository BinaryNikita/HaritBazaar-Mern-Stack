import { useState } from 'react';
import { api } from '../axios.js';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await api.post('/user/sign-up', {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Redirect or update state
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SignUp;
