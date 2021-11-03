import React, { createContext, useState } from 'react';

import UserContext from '../../contexts/userContext';

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);
  return user;
};

const AuthProvider = ({ children }) => {
  const initUser = getUser();

  const [user, setUser] = useState(initUser);

  // console.log('AuthProvder user', user);

  const logIn = (userData) => {
    // console.log('loggin: ', userData);
    const user = { ...userData };
    // console.log('login user', user);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logOut = () => {
    // console.log('logOut clicked');
    setUser(null);
    localStorage.removeItem('user');
  };

  const AuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('AuthHeader run', user);
    if (user && user.token) return { 'Authorization': `Bearer ${user.token}` };
    return {};
  };
  // }

  return (
    <UserContext.Provider value={{ user, logIn, logOut, AuthHeader }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
