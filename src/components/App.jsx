import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { Navbar, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import UserContext from '../contexts/userContext.jsx';
import Chat from './Chat.jsx';
import LogInForm from './LogIn.jsx';
import SignUpForm from './SignUp.jsx';
import Page404 from './Page404.jsx';

const App = () => {
  const { user, logOut } = useContext(UserContext);
  const { t } = useTranslation();
  const isShown = useSelector((state) => state.modal.isShown);

  return (
    <Router>
      <div className="d-flex flex-column h-100" aria-hidden={isShown}>
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to="/">
              {t('title')}
            </Navbar.Brand>
            {user && <Button onClick={logOut}>{t('logOut')}</Button>}
          </div>
        </Navbar>

        <Switch>
          <Route
            exact
            path="/"
            render={() => (user ? <Chat /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/login"
            render={() => (user ? <Redirect to="/" /> : <LogInForm />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (user ? <Redirect to="/" /> : <SignUpForm />)}
          />
          <Route path="*">
            <Page404 />
          </Route>
          /
        </Switch>
      </div>
    </Router>
  );
};

export default App;
