import React from 'react';

import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
// import { userInfo } from 'os';
// import { auth } from 'firebase';
import UserList from '../Admin/index'
import Firebase from '../Firebase/firebase.js';
// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// Trying to get username from Firebase
// this.props.firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         //User signed in
//         var displayName = user.displayName
//         var email = user.email
//         var uid = user.uid;
//     } else {
//         //User signed out.
//     }
// })

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                {/* Trying to get username from Firebase */}
                {/* {console.log(firebase.auth())} */}
                {console.log(authUser.uid)}
                {console.log(authUser.displayName)}
                {/* {console.log(firebase.database().ref('/users/' + postMessage.name))} */}
                {/* {console.log(firebase.auth())} */}
                <h1>My Account</h1>
                <p><strong>Hello, username</strong></p> 
                <p><strong>Email: </strong>{authUser.email}</p>
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

// exports.saveUserData = functions.auth.user().onCreate(event => {
//     const user = event.data
// })

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);