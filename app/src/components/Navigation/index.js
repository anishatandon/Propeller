import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser? <NavigationAuth/> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.CALENDAR}>Calendar</Link>
            </li>
            <li>
                <Link to={ROUTES.FRIENDS}>Friends</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>My Account</Link>
            </li>
        </ul>
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (null);

export default Navigation;