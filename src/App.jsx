import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
// import AuthPtovider from './components/authProvider/authProvider';
import UserContext from './context/userContext';
import Homepage from './pages/homepage/hompage.component';
import LoginForm from './components/login-form/login-form.component';
import Header from './components/header/header.components';
import SignInForm from './components/sing-in/sign-in.component';
import { async } from 'regenerator-runtime';

const App = () => {
  console.log('appl initilised', localStorage);

  const { user } = useContext(UserContext);
  console.log('user context', user);

  const isAuth = (user) => {
    if (!user) return false;

    return true;
  };

  console.log(isAuth(user));

  return (
    <div>
      <Header />

      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return isAuth(user) ? <Homepage /> : <Redirect to='/login' />;
            }}
          >
            {/* <Homepage /> */}
          </Route>
          <Route
            exact
            path='/login'
            render={() => {
              return isAuth(user) ? <Redirect to='/' /> : <SignInForm />;
            }}
          >
            {/* <LoginForm /> */}
          </Route>
          <Route path='*'>
            <div>404</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
