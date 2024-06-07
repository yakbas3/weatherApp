import React, { useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from '../auth/AuthContext';

const DisplayToken = () => {
  const { authTokens } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (authTokens) {
      const decodedToken = jwtDecode(authTokens);
      setUserInfo({
        username: decodedToken.sub,
        userType: decodedToken.role,
        city: decodedToken.city // Accessing the city
      });
      setToken(authTokens);
    }
  }, [authTokens]);

  if (!token || !userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Token:</strong> {token}</p>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>User Type:</strong> {userInfo.userType}</p>
      <p><strong>City:</strong> {userInfo.city}</p>
    </div>
  );
};

export default DisplayToken;
