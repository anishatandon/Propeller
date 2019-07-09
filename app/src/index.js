// import React from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';
// import * as serviceWorker from './serviceWorker';

// import App from './components/App';
// import Firebase, { FirebaseContext } from './components/Firebase'

// ReactDOM.render(
//     <FirebaseContext.Provider value={new Firebase()}>
//         <App/>
//     </FirebaseContext.Provider>,
//     document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';

const root = document.getElementById('root')


ReactDOM.render(<div>Loading...</div>, root);

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render (
        <Provider store={store}>
            <BrowserRouter>
                <App/>    
            </BrowserRouter>
        </Provider>,
        root
    );
})
