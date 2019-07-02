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
            <button className = "iconbutton">
                <img src="https://image.flaticon.com/icons/svg/25/25694.svg" alt="Home"/>
            </button>
        </Link>
        <Link to={ROUTES.CALENDAR}>
            <button className = "iconbutton">
                <img src="https://image.flaticon.com/icons/svg/61/61469.svg" alt="Calendar"/>
            </button>
        </Link>
        <Link to={ROUTES.FRIENDS}>
            <button className = "iconbutton">
                <img src="https://image.flaticon.com/icons/svg/880/880594.svg" alt="Friends"/>
            </button>
        </Link>
        <Link to={ROUTES.ACCOUNT}>
            <button className = "iconbutton">
                <img src="https://image.flaticon.com/icons/svg/149/149837.svg" alt="Account"/>
            </button>
        </Link>
        <Link to={ROUTES.ADMIN}>
            <button className = "iconbutton">
                <img src="https://image.flaticon.com/icons/svg/483/483345.svg" alt="Admin"/>
            </button>
        </Link>
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (null);

export default Navigation;