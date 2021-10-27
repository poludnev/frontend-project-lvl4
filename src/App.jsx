import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Homepage from './pages/homepage/hompage.component';
import LoginForm from './components/login-form/login-form.component';
import Header from './components/header/header.components';
import SignInForm from './components/sing-in/sign-in.component';
const App = () => {
  return (
    <div>
      <Header />

      <Router>
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route exact path='/login'>
            <SignInForm />
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
