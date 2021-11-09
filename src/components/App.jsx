import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
// import AuthPtovider from './components/authProvider/authProvider';
import UserContext from '../contexts/userContext';
import Chat from './Chat';
// import Chat
import { useTranslation } from 'react-i18next';

import Header from './Header';

import SignInForm from './SignIn';
import SignUpForm from './SignUp';

// import React from 'react';

const App = () => {
  const { user } = useContext(UserContext);
  const isAuth = (user) => {
    if (!user) return false;
    return true;
  };

  return (
    <Router>
      <div className='d-flex flex-column h-100'>
        <Header />
        

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
              return isAuth(user) ? <Redirect to='/' /> : <SignInForm />;
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
