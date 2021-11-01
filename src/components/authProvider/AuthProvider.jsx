import React, { createContext, useState } from 'react';

import { UserContext } from '../../context/userContext';

const AuthPtovider = () => {

  const getUser = () => {
    localStorage.getItem('app');
  }

};

export default AuthPtovider;