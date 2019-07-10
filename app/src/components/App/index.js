import React from 'react';
import {
    BrowserRouter as Router, 
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import { connect } from 'react-redux';
// import { auth } from 'firebase';

import { Navigation, DevNavBar } from '../Navigation';
import LandingPage from '../Landing';
// import SignUpPage from '../SignUp';
// import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import Calendar from '../Calendar';
import FriendsPage from '../Friends';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import LoginPage from '../Auth/Login/Login';
import SignUpPage from '../Auth/SignUp/SignUp';
import SignOut from '../Auth/SignOut/SignOut';

import * as ROUTES from '../../constants/routes';
// import { withAuthentication } from '../Session';


const App = ({ loggedIn }) => {
    console.log("app", loggedIn.uid)
    let routes;
    if (loggedIn.uid) {
        routes = (
            <>
                {/* <Navbar /> */}
                <Switch> 
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.CALENDAR} component={Calendar} />
                    <Route path={ROUTES.FRIENDS} component={FriendsPage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                    <Route path="/signOut" component={SignOut} />
                    <Redirect to={ROUTES.HOME} />
                </Switch>
            </>
        );
    }
    else {
        routes = (
            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                {/* <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> 
                {/* <Route path={ROUTES.LOGIN} component={LoginPage} /> */}
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Redirect to={ROUTES.LANDING} />
            </Switch>
        )
    }
    return(
        <>
        <DevNavBar />
        <Navigation loggedIn={loggedIn}/>
        {routes}
        </>
        // <Router>
        //     <div>
        //         <Navbar />
        //         {/* <Navigation /> */}
                
                // <Route exact path={ROUTES.LANDING} component={LandingPage} />
                // <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                // <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                // <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                // <Route path={ROUTES.HOME} component={HomePage} />
                // <Route path={ROUTES.CALENDAR} component={Calendar} />
                // <Route path={ROUTES.FRIENDS} component={FriendsPage} />
                // <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                // <Route path={ROUTES.ADMIN} component={AdminPage} />

                // <Route path={ROUTES.LOGIN} component={LoginPage} />
                // <Route path={ROUTES.SIGNUP} component={SignUp} />
                // <Redirect to={ROUTES.LANDING} />
        //     </div>
        // </Router>
        // <div> <Navbar /> 
        // <Switch>
        //     <Route exact path="/" component={LandingPage}/>
        //     <Route path="/signin" component={SignInPage} />
        //     <Route path="/signup" component={SignUpPage} />
        //     <Route path="/pw-forget" component={PasswordForgetPage} />
        //     <Route path="/home" component={HomePage} />
        //     <Route path="/calendar" component={Calendar} />
        //     <Route path="/friends" component={FriendsPage} />
        //     <Route path="/account" component={AccountPage} />
        //     <Route path="/admin" component={AdminPage} />
    
        //     <Route path="/login" component={LoginPage} />
        //     <Route path="/sign-up" component={SignUp} />
        //     <Redirect to="/" />
        // </Switch>
        // </div>
    );
}

const mapStateToProps = ({firebase}) => ({
    loggedIn: firebase.auth,
});

// export default withAuthentication(App);

export default connect(mapStateToProps)(App);