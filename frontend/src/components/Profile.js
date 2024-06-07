import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';
import DisplayToken from './DisplayToken';

const Profile = () => {
  return (
    <Layout>
      <Typography variant="h2" gutterBottom align="center" color="textPrimary">
        Profile Page
      </Typography>
      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
        This is the profile page.
      </Typography>
      <DisplayToken></DisplayToken>
    </Layout>
  );
};

export default Profile;
