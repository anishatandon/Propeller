import React from 'react';

import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';
import {firebase} from 'firebase';
import { AuthUserContext, withAuthorization } from '../Session';

import {UserList} from '../Admin/index.js'
// import { userInfo } from 'os';
// import { auth } from 'firebase';

let database = withFirebase

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>My Account</h1>
                {console.log(authUser.email)}
                <p><strong>Email: </strong>{authUser.uid.displayName}</p>
                {/* <p><strong>Hello, username</strong>{ADMIN.auth().getUser(uid)}</p> */}
                {/* /FIRDatabase.database().reference().child("users") */}
                <p><strong>Hello, username</strong>{authUser.user}</p>
                {/* currently the above line does not work as desired */}
                <p><strong>Email: </strong>{authUser.email}</p>
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);