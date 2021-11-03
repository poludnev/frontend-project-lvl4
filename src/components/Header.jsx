import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import UserContext from '../contexts/userContext';
const Header = () => {
  const { user, logOut } = useContext(UserContext);
  // add forwarding to login page after click on exit button
  return (
    <Navbar className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <div className='container' style={{ paddingRight: '0.75rem', paddingLeft: '0.75rem' }}>
        <Navbar.Brand as={Link} to='/'>
          {'Hexlet Chat'}
        </Navbar.Brand>
        {user && (
          <Button variant='primary' onClick={logOut}>
            {'Выход'}
          </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
