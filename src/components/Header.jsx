import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { user, logOut } = useContext(UserContext);
  const { t } = useTranslation();
  // add forwarding to login page after click on exit button
  return (
    <Navbar className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <div className='container'>
        <Navbar.Brand as={Link} to='/'>
          {t('title')}
        </Navbar.Brand>
        {user && (
          <Button variant='primary' onClick={logOut}>
            {t('logOut')}
          </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
