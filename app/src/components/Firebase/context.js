import React from 'react';
const FirebaseContext = React.createContext(null); // creates 2 components, the provider component (provides) and consumer component (retrieves)

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;
