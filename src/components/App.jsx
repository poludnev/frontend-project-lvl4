import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import Chat from './Chat';
import { useTranslation } from 'react-i18next';
import { Navbar, Button } from 'react-bootstrap';
// import Header from './Header';

import LogInForm from './LogIn';
import SignUpForm from './SignUp';

// import React from 'react';

const App = () => {
  const { user, logOut } = useContext(UserContext);
  const { t } = useTranslation();
  console.log('App user:', user);

  const isAuth = (user) => {
    
    if (!user) return false;
    return true;
  };

  return (
    <Router>
      <div className='d-flex flex-column h-100'>
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

        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return isAuth(user) ? <Chat /> : <Redirect to='/login' />;
            }}
          ></Route>
          <Route
            exact
            path='/login'
            render={() => {
              return isAuth(user) ? <Redirect to='/' /> : <LogInForm />;
            }}
          ></Route>
          <Route
            exact
            path='/signup'
            render={() => {
              return isAuth(user) ? <Redirect to='/' /> : <SignUpForm />;
            }}
          ></Route>
          <Route path='*'>
            <div>404</div>
          </Route>
          /
        </Switch>
      </div>
    </Router>
  );
};

export default App;
