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
        <Link to={ROUTES.HOME}>
            <button>Home</button>
        </Link>
        <Link to={ROUTES.CALENDAR}>
            <button>Calendar</button>
        </Link>
        <Link to={ROUTES.FRIENDS}>
            <button>Friends</button>
        </Link>
        <Link to={ROUTES.ACCOUNT}>
            <button>My Account</button>
        </Link>
        <Link to={ROUTES.ADMIN}>
            <button>Admin</button>
        </Link>
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (null);

export default Navigation;