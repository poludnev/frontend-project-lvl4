import React, { useState } from 'react';

import UserContext from '../contexts/userContext';

const AuthProvider = ({ children }) => {
  const initUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(initUser);

  const logIn = ({ user }) => {
    // console.log('loggin: ', userData);
    // const user = { ...userData };
    // console.log('login user', user);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const AuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('AuthHeader run', user);
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
