import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Layout from './hoc/layout/Layout';
import HomePage from './components/Home/index';
import Signin from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import Signout from './components/Auth/SignOut/SignOut';
import TodoList from './components/AddTask/TodoList';
import Calendar from './components/Calendar/index';
import FriendsPage from './components/Friends/index';
import AccountPage from './components/Account';

const App = ({ signedIn }) => {
  console.log(signedIn);

  let routes;
  if (signedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/todos" component={TodoList} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/friends" component={FriendsPage} />
        <Route exact path="/settings" component={AccountPage} />
        <Route exact path="/signout" component={Signout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={SignUp} />
        <Redirect to="/signin" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>
};

const mapStateToProps = ({ firebase }) => ({
  signedIn: firebase.auth.uid ? true : null,
});

export default connect(mapStateToProps)(App)