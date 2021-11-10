import React, { useState } from 'react';

import UserContext from '../contexts/userContext';

const AuthProvider = ({ children }) => {
  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const initUser = getUser();

  const [user, setUser] = useState(initUser);

  const logIn = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const AuthHeader = () => {
    const user = getUser();
    if (user && user.token) return { 'Authorization': `Bearer ${user.token}` };
    return {};
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut, AuthHeader }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
