import React from 'react';

import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
// import { userInfo } from 'os';
// import { auth } from 'firebase';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>My Account</h1>
                <p><strong>Email: </strong>{authUser.email}</p>
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);