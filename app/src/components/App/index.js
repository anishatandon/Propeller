import React, { Component } from 'react';
import {
    BrowserRouter as Router, 
    Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import CalendarPage from '../Calendar';
import FriendsPage from '../Friends';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return(
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser} />

                    <hr />

                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.CALENDAR} component={CalendarPage} />
                    <Route path={ROUTES.FRIENDS} component={FriendsPage} />
                </div>
            </Router>
        );
    }
}
// Navigation this makes it that the Navigation page stays regardless of the route
// Things below <hr /> shows the component that matches the path of the route
export default withFirebase(App);