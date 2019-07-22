import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Layout from './hoc/layout/Layout';
import HomePage from './components/Home/index';
import Signin from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Signout from './components/Auth/SignOut';
import Calendar from './components/Calendar/index';
// import FriendsPage from './components/Friends/index';
import Friends from './components/Friends/Friends';
import Account from './components/Auth/Account';
import VerifyEmail from './components/Auth/VerifyEmail';
import RecoverPassword from './components/Auth/RecoverPassword';

const App = ({ signedIn, emailVerified }) => {
  let routes;

  if (signedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route exact path="/signout" component={Signout} />
        <Redirect to="/verify-email" />
      </Switch>
    )
  } else if (signedIn && emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/signout" component={Signout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/recover-password" component={RecoverPassword} />
        <Redirect to="/signin" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>
};

const mapStateToProps = ({ firebase }) => ({
  signedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App)