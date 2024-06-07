import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/themes';
import GlobalStyles from './styles/GlobalStyles';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(

  <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </AuthProvider>

);
