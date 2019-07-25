import * as actions from './actionTypes';

// Sign up action creator 
export const signUp = data => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.AUTH_START })
    try {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password);

            //Send the verification email
            const user = firebase.auth().currentUser;
            const userid = user.uid
            await user.sendEmailVerification();
            console.log({userid})
        await firestore
            .collection('users')
            .doc(res.user.uid)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                uid: user.uid
             })
        dispatch({ type: actions.AUTH_SUCCESS });
    } catch (err) {
        dispatch({type: actions.AUTH_FAIL, payload: err.message});
    }
    dispatch({ type: actions.AUTH_END });
};

// Sign In action creator
export const signIn = data => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: actions.AUTH_START })
    try {
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        dispatch({ type: actions.AUTH_SUCCESS });
    } catch (err) {
        dispatch({ type: actions.AUTH_FAIL, payload: err.message })
    }
    dispatch({ type: actions.AUTH_END });
};

// Sign Out action creator
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.log(err.message)
    }
};

// Clean up messages
export const clean = () => ({
    type: actions.CLEAN_UP,
});

//Verify email actionTypes
export const verifyEmail = () => async (
    dispatch,
    getState,
    {getFirebase}
) => {
    const firebase = getFirebase();
    dispatch({ type: actions.VERIFY_START })
    try {
        const user = firebase.auth().currentUser;
        await user.sendEmailVerification();
        dispatch({ type: actions.VERIFY_SUCCESS });
    } catch (err) {
        dispatch({ type: actions.VERIFY_FAIL, payload: err.message });
    }
};

// Send recover password
export const recoverPassword = data => async (
    dispatch,
    getState,
    {getFirebase}
) => {
    const firebase = getFirebase();
    dispatch({ type: actions.RECOVERY_START})
    try {
        //send email here
        await firebase.auth().sendPasswordResetEmail(data.email);
        dispatch({ type: actions.RECOVERY_SUCCESS });
    } catch (err) {
        dispatch({ type: actions.RECOVERY_FAIL, payload: err.message });
    }
};

// Edit account
export const editAccount = data => async (
    dispatch,
    getState,
    {getFirebase, getFirestore}
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const{uid: userId, email: userEmail} = getState().firebase.auth;
    dispatch({ type: actions.ACCOUNT_EDIT_START})
    try{
        //edit the user account
        if(data.email !== userEmail) {
            await user.updateEmail(data.email)
        }

        await firestore
            .collection('users')
            .doc(userId)
            .set({
                firstName: data.firstName,
                lastName: data.lastName
            });

            if (data.password.length > 0) {
                await user.updatePassword(data.password);
            }

        dispatch({ type: actions.ACCOUNT_EDIT_SUCCESS})
    } catch(err) {
        dispatch({type: actions.ACCOUNT_EDIT_FAIL, payloiad: err.message})
    }
}

// Delete user
export const deleteUser = () => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.DELETE_START });
    try {
        await firestore
            .collection('users')
            .doc(userId)
            .delete()
        await user.delete();

        await firestore
            .collection('users')
            .doc(userId)
            .delete()
    } catch (err) {
        dispatch({ type: actions.DELETE_FAIL, payload: err.message })
    }
}