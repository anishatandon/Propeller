import React from 'react';

import { withAuthorization } from '../Session'

const FriendsPage = () => (
  <div>
    <h1>Friends</h1>
    <button>Add Friend</button>
  </div>
);

class AddFriendFormBase extends React.Component {
  constructor(props) {
    super(props);
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
      friendDisplayName,
      verify
    } = this.state;
    
    const isInvalid = 0
      

    return(
      <form onSubmit={this.onSubmit}>
        Your Friend's Name/Username: <br></br>
        <input
        name="friendDisplayName"
        value={friendDisplayName}
        onChange={this.onChange}
        type="text"
        placeholder="Full Name/Username"
        /> 
        <br></br>
        <br></br>
        Verification Code: <br></br>
        <input
        name="verify"
        value={verify}
        onChange={this.onChange}
        type="text"
        placeholder="Verification Code"
        />
        
      
      <br></br>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      
      </form>
    );
  }
}


const condition = authUser => !!authUser; 

export default  withAuthorization(condition)(FriendsPage);

//{error && <p>{error.message}</p>}