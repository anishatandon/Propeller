import * as actions from './actionTypes';


// Sign up actino creator 
export const signUp = data => async(dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.AUTH_START })
    try {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password);
 
        console.log(res.user.uid);

        await firestore
            .collection('users')
            .doc(res.user.uid)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username
             })
        dispatch({ type: actions.AUTH_SUCCESS });
    } catch (err){
        dispatch({type: actions.AUTH_FAIL, payload: err.message});
    }
    dispatch({ type: actions.AUTH_END });
};

// Sign In action creator
export const signIn = (data) => async(dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    try {
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch(err) {
        console.log(err.message);
    }
};


// Sign Out action creator
export const signOut = () => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    dispatch({type: actions.AUTH_START});
    try {
        await firebase.auth().signOut();
        dispatch({type: actions.AUTH_SUCCESS})
    } catch(err) {
        dispatch({type: actions.AUTH_FAIL, payload: err.message});
    }
    dispatch({type: actions.AUTH_END})
};

// Clean up messages
export const clean = () => ({
    type: actions.CLEAN_UP,
})