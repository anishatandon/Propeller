import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
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
        </ul>
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (null);

export default Navigation;