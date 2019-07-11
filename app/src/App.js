import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/layout/Layout';
import HomePage from './components/Home/index';
import Signin from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
// import TodoList from './components/AddTask/TodoList';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route exact path="/todos" component={TodoList} /> */}
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
