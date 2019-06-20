import React, { Component } from 'react';
// import { Button, FormGroup, FormControl, ControlLabel } from "../../react-bootstrap";
import "./Login.css"

// This is the landing page
/*
export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() { 
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
*/

const Login = () => (
  <div>
    <h1>Sign In</h1>
    <form>
      Username:<br></br>
      <input type="text" name="username"></input> 
      <br></br>
      Password:<br></br>
      <input type="text" name="password"></input> 
      <br></br><br></br>
      <input type="submit" value="Submit"></input>
    </form>
    <p>note: this thing does not work rn, see the comments at the end of the code for more info. Just putting this here for visual idea</p>
  </div>
);

/* ^ this will not actually work. just putting this here for now. 
Need to find a way to validate input (in firebase?) and find a way to put restrictions in the input
(i.e. username characters (no space etc), password restrictions and hiding the characters)
*/

export default Login;
