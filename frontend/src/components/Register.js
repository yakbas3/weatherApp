import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserAUTH } from '../services/api';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    userType: '',
    defaultCityName: '',
    status: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserAUTH(formData);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (

    <Layout>
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        REGISTER
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
      <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>User Type</label>
          <input
            type="text"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Default City Name</label>
          <input
            type="text"
            name="defaultCityName"
            value={formData.defaultCityName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
      </Typography>
      
    </Layout>

    
  );
};

export default Register;
