// src/components/AdminPanel.js
import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';


const AdminPanel = () => {
  return (

    <Layout>
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        Profile Page
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
        This is the profile page.
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom="20px">
      <div>
      <h2>Admin Panel</h2>
      <p>This is the admin panel where you can manage the application.</p>
      <Button component={Link} to="/home" variant="contained" color="primary" style={{ marginRight: '10px' }}>
        Home
      </Button>
      <Button component={Link} to="/admin/users" variant="contained" color="secondary">
        <div>User Administration</div>
      </Button>
      <Button component={Link} to="/admin/weather" variant="contained" color="secondary">
        <div>Weather Data Administration</div>
      </Button>
      <Button component={Link} to="/admin/userlogs" variant="contained" color="secondary">
        <div>Logger Administration</div>
      </Button>
      </div>
      </Box>
    </Layout>
  );
};

export default AdminPanel;
