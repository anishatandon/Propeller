import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignInLink } from '../SignIn'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { userInfo } from 'os';

const SignUpPage = () => (
  <div>
    <h1>Create An Account</h1>
    <SignUpForm />
    <br></br>
    <SignInLink />
  </div>
);

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE}
  }

  onSubmit = event => {
    const { displayName, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne) // creates user in Firebase's internal authentication database (limited access)
      .then(authUser => { // creates user in Firebase's realtime database (accessible)
        return this.props.firebase
          .user(authUser.user.uid) 
          .set({
            displayName,
            email,
          }); 
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      displayName,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      displayName === '';

    return(
      <form onSubmit={this.onSubmit}>
        Your Name/Username: <br></br>
        <input
        name="displayName"
        value={displayName}
        onChange={this.onChange}
        type="text"
        placeholder="Full Name/Username"
        /> 

        <br></br>
        <br></br>

        Email: <br></br>
        <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
        />

        <br></br>
        <br></br>

        Password: <br></br>
        <input
        name="passwordOne"
        value={passwordOne}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
        />

        <br></br>
        <br></br>

        Confirm Password: <br></br>
        <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={this.onChange}
        type="password"
        placeholder="Confirm Password"
        />
      
      <br></br>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };