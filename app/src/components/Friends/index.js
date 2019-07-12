/*import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withAuthentication } from '../Session'
import { UserList } from '../Admin';


const FriendsPage = () => (
  <div>
    <h1>Friends</h1>
    <AddFriendForm/>
  </div>
);

class AddFriendFormBase extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = event => {
    const { friendDisplayName, verify } = this.state;
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      friendDisplayName,
      verify
    } = this.state;
    
    const isInvalid =
      friendDisplayName !== UserList.user.displayName
      verify !== UserList.user.uid
      

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
        Add Friend
      </button>

      
      </form>
    );
  }
}


const condition = authUser => !!authUser; 

export default  withAuthorization(condition)(FriendsPage);

const AddFriendForm = compose(
  withRouter,
  withFirebase,
)(AddFriendFormBase);

export { AddFriendForm };*/

//{error && <p>{error.message}</p>}