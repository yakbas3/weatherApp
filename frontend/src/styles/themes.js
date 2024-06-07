import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color
    },
    secondary: {
      main: '#dc004e', // Red color
    },
    background: {
      default: '#f4f6f8', // Light gray background
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#ffffff', // White text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#1976d2',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#1976d2',
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
        containedSecondary: {
          backgroundColor: '#dc004e',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#c3003c',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
        },
      },
    },
  },
});

export default theme;
