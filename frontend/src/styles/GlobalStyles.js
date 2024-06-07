import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', Arial, sans-serif;
    background-color: #f4f6f8;
    color: #000;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  table {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #1976d2;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export default GlobalStyles;
