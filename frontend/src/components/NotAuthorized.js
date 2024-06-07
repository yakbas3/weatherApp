import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const NotAuthorized = () => {
  return (
    <Layout>
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        UNAUTHORIZED ACCESS
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
        Login with an admin user to access the page.
      </Typography>
      <div>
      <h2>Not Authorized</h2>
      <p>You do not have permission to view this page.</p>
    </div>
    </Layout>
  );
};

export default NotAuthorized;
