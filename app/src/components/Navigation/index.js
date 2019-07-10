import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

// import { AuthUserContext } from '../Session';

// const Navigation = () => (
//     <div>
//         <AuthUserContext.Consumer>
//             {authUser =>
//                 authUser? <NavigationAuth/> : <NavigationNonAuth />
//             }
//         </AuthUserContext.Consumer>
//     </div>
// );

const Navigation = ({ loggedIn }) => {
    console.log("nav logged in", loggedIn.uid)
    let Navbar;

    if (loggedIn.uid) {
        Navbar = (
            <div>
                <Link to={ROUTES.HOME}>Home 
                    {/* <button className = "iconbutton">
                        <img src="https://image.flaticon.com/icons/svg/25/25694.svg" alt="Home"/>
                    </button> */}
                </Link>
                <Link to={ROUTES.CALENDAR}>Calendar 
                    {/* <button className = "iconbutton">
                        <img src="https://image.flaticon.com/icons/svg/61/61469.svg" alt="Calendar"/>
                    </button> */}
                </Link>
                <Link to={ROUTES.FRIENDS}>Friends 
                    {/* <button className = "iconbutton">
                        <img src="https://image.flaticon.com/icons/svg/880/880594.svg" alt="Friends"/>
                    </button> */}
                </Link>
                <Link to={ROUTES.ACCOUNT}>Account 
                    {/* <button className = "iconbutton">
                        <img src="https://image.flaticon.com/icons/svg/149/149837.svg" alt="Account"/>
                    </button> */}
                </Link>
                <Link to={ROUTES.ADMIN}>Admin 
                    {/* <button className = "iconbutton">
                        <img src="https://image.flaticon.com/icons/svg/483/483345.svg" alt="Admin"/>
                    </button> */}
                </Link>
                <Link to='/signout'>SignOut</Link>
                {/* <SignOutButton /> */}
            </div>
        );
        
    }

    else { Navbar = null}

    return ( Navbar )
}



const DevNavBar = () => (
    <div>
        <p>DEV NAV BAR</p>
        <Link to={ROUTES.HOME}>
            Home
        </Link>
        <Link to={ROUTES.CALENDAR}>
            Calendar
        </Link>
        <Link to={ROUTES.FRIENDS}>
            Friends
        </Link>
        <Link to={ROUTES.ACCOUNT}>
            Account
        </Link>
        <Link to={ROUTES.ADMIN}>
            Admin
        </Link>
        <Link to={ROUTES.SIGN_IN}>
            Sign In
        </Link>
        <Link to={ROUTES.SIGN_UP}>
            Sign Up Formik
        </Link>
        <Link to={ROUTES.SIGN_OUT}>
            Sign Out
        </Link>
        <hr/>
    </div>
);

const mapStateToProps = ({firebase}) => ({
    loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Navigation);
export {DevNavBar, Navigation};