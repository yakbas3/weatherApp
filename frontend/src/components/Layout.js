import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import defaultImage from '../images/default.jpg'; // Import the default image

const Layout = ({ children, backgroundImage }) => {
  const bgImage = backgroundImage || defaultImage;

  return (
    <Box
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            maxWidth: '800px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default Layout;
