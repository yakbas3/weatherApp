import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { getUserLogs } from '../services/api';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const LoginAdministration = () => {
  const { authTokens } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getUserLogs(authTokens);
        setLogs(data);
      } catch (error) {
        console.error('Error fetching user logs:', error);
      }
    };

    fetchLogs();
  }, [authTokens]);

  return (
    <Layout>
      <Box textAlign="center" marginBottom="20px">
        <Typography variant="h4" color="textPrimary">
          User Login Administration
        </Typography>
      </Box>
      <Box textAlign="center" marginBottom="20px">
        <Button component={Link} to="/admin" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Back to Admin Panel
        </Button>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Log ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Log Time</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Log</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.logId}>
                <TableCell>{log.logId}</TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell>{new Date(log.logTime).toLocaleString()}</TableCell>
                <TableCell>{log.ipAddress}</TableCell>
                <TableCell>{log.log}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Layout>
  );
};

export default LoginAdministration;
