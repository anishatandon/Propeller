import * as actions from './actionTypes';

// Add a friend
export const addFriend = data => async (
    dispatch,
    getState,
    { getFirestore, getFirebase }
  ) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.ADD_FRIEND_START });
    try {
      const res = await firestore
        .collection('friends')
        .doc(userId)
        .get();
      const newFriend = {
        id: new Date().valueOf(),
        friend: data.friend,
      };
      if (!res.data()) {
        firestore
          .collection('friends')
          .doc(userId)
          .set({
            friends: [newFriend],
          });
      } else {
        firestore
          .collection('friends')
          .doc(userId)
          .update({
            friends: [...res.data().friends, newFriend],
          });
      }
      dispatch({ type: actions.ADD_FRIEND_SUCCESS });
      return true;
    } catch (err) {
      dispatch({ type: actions.ADD_FRIEND_FAIL, payload: err.message });
    }
  };
  
  // Delete friend
  export const deleteFriend = id => async(
    dispatch,
    getState,
    {getFirestore}
  ) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({type: actions.DELETE_FRIEND_START });
    try {
      const res = await firestore
        .collection('friends')
        .doc(userId)
        .get();
      const previousFriends = res.data().friends;
      const newFriends = previousFriends.filter(friend => friend.id !== id)
      await firestore
        .collection('friends')
        .doc(userId)
        .update({
          friends: newFriends,
        })
  
      dispatch({type: actions.DELETE_FRIEND_SUCCESS})
    } catch(err) {
      dispatch({type: actions.DELETE_FRIEND_FAIL, payload: err.message})
    }
  }
  
  // Block friend
  export const blockFriend = id => async(
    dispatch,
    getState,
    {getFirestore}
  ) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({type: actions.BLOCK_FRIEND_START });
    try {
      const res = await firestore
        .collection('blockedFriends')
        .doc(userId)
        .get();
      const previousFriends = res.data().friends;
      const newFriends = previousFriends.filter(friend => friend.id !== id)
      const previousBlockedFriends = res.data().blockedFriends
      const newBlockedFriends = previousBlockedFriends.add(friend => friend.id !== id)
      await firestore
        .collection('blockedFriends')
        .doc(userId)
        .update({
          friends: newFriends,
          blockedFriends: newBlockedFriends,
        })
  
      dispatch({type: actions.BLOCK_FRIEND_SUCCESS})
    } catch(err) {
      dispatch({type: actions.BLOCK_FRIEND_FAIL, payload: err.message})
    }
  }