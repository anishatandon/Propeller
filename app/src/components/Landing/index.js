import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
    <div>
        <h3>Insert Logo Here</h3>
        <h1>Welcome to Propeller</h1>
        <Link to={ROUTES.SIGN_IN}>
            <button type="button">
                Enter
            </button>
        </Link>
    </div>
);

export default Landing;