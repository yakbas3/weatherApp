import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5226/api/auth/login', { username, password });
      loginUser(response.data.token);
      navigate('/home'); // Redirect to home on success
    } catch (error) {
      setError('Login failed');
    }
  };

  return (

    <Layout>
      
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
      <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
      </Typography>
    </Layout>


    
  );
};

export default Login;
