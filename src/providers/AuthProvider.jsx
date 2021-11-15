import React, { useState } from 'react';
import UserContext from '../contexts/userContext';

const getUser = () => JSON.parse(localStorage.getItem('user'));

const AuthProvider = ({ children }) => {
  const initialUser = getUser();

  const [user, setUser] = useState(initialUser);

  const logIn = (logInUser) => {
    setUser(logInUser);
    localStorage.setItem('user', JSON.stringify(logInUser));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const AuthHeader = () => {
    const currentUser = getUser();
    if (currentUser && currentUser.token) return { Authorization: `Bearer ${currentUser.token}` };
    return {};
  };

  return (
    <UserContext.Provider value={{
      user, logIn, logOut, AuthHeader,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
