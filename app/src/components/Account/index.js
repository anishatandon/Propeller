import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
    <div>
        <h1>My Account</h1>
        <PasswordChangeForm />
    </div>
);

export default AccountPage;