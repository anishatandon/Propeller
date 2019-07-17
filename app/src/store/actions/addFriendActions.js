import * as actions from './actionTypes';

// Search friends
export const searchFriends = Username => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    dispatch({ type: actions.SEARCH_FRIENDS_START });
    try {
        const res = await firestore
            .collection('users')
            .get();
    
        return (
            console.log(res)
        )
    } catch(err) {
        dispatch({ type: actions.SEARCH_FRIENDS_FAIL });
    };
};