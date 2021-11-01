import React, { createContext, useState } from 'react';

import UserContext from '../../context/userContext.jsx';

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
    console.log('loggin: ', userData);
    const user = { ...userData };
    console.log('login user', user)
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <UserContext.Provider value={{ user, logIn, logOut }}>{children}</UserContext.Provider>;
};

export default AuthProvider;
