import React, { createContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
  // eger token varsa tokeni useri al yoksa null


  // tokeni al kaydet locale
  const loginUser = (token) => {
    setAuthTokens(token);
    setUser(jwtDecode(token));
    localStorage.setItem('authTokens', JSON.stringify(token));
  };

  
  // tokeni localden cikar
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
