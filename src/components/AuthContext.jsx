import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem('authToken'),
    userName: localStorage.getItem('userName') || '',
  });

  const login = (userName) => {
    setAuth({ isAuthenticated: true, userName });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, userName: '' });
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      setAuth({ isAuthenticated: true, userName });
    } else {
      setAuth({ isAuthenticated: false, userName: '' }); // Make sure to handle the else case
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
