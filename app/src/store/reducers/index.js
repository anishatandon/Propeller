import {combineReducers} from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import todosReducer from './todosReducer';
import friendsReducer from './friendsReducer';

export default combineReducers({
    auth: authReducer,
    todos: todosReducer,
    friends: friendsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});