import * as actions from './actionTypes';

// var admin = require('firebase-admin')
// Add a friend
// export const addFriend = data => async (
  export const addFriend = username => async (
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
      // console.log("outside", {res})
      console.log("friends", {res})
      await firestore
        .collection('users')
        .where('username', "==", username.friend)
        // tried to check that this username is not already a friend because
        // currently can add the same friend twice
        // .collection('friends')
        // .where('username', "!=", username.friend)
        // && 'username', "!=", friends.friends.username
        .get()
        .then(querySnapshot => {
          const newFriend = querySnapshot.docs.map(doc => doc.data())[0];
          console.log({newFriend});
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
            dispatch({ type: actions.ADD_FRIEND_SUCCESS });
            return true;
        }
      })
    } catch (err) {
      dispatch({ type: actions.ADD_FRIEND_FAIL, payload: err.message });
    }
  };
  
// Delete friend
export const deleteFriend = username => async(
  dispatch,
  getState,
  {getFirestore}
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  // const username = getState().
  console.log(username)
  dispatch({type: actions.DELETE_FRIEND_START });
  try {
    const res = await firestore
      .collection('friends')
      .doc(userId)
      .get();
    const previousFriends = res.data().friends;
    const newFriends = previousFriends.filter(friend => friend.username !== username)
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
export const blockFriend = username => async(
  dispatch,
  getState,
  {getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  console.log(username)
  dispatch({type: actions.BLOCK_FRIEND_START });
  try {
    const res = await firestore
      .collection('blockFriends')
      .doc(userId)
      .get();
    // console.log("blockFriends", {res})
    console.log("block Friends")
    const previousFriends = res.data().friends;
    console.log("previous Friends")
    console.log(previousFriends)
    const newFriends = previousFriends.filter(friend => friend.username !== username);
    const previousBlockFriends = res.data().blockFriends;
    const newBlockFriends = previousBlockFriends.add(friend => friend.username !== username);
    // I don't think the above line of code is working with the friend => friend.username !== username
    await firestore
      .collection('friends')
      .doc(userId)
      .update({
        friends: newFriends,
      })
      .collection('blockFriends')
      .doc(userId)
      .update({
        blockFriends: newBlockFriends,
      })
      // .doc(userId)
      // .update({
      //   friends: newFriends,
      //   blockFriends: newBlockFriends,
      // })
  
    dispatch({type: actions.BLOCK_FRIEND_SUCCESS})
  } catch(err) {
    dispatch({type: actions.BLOCK_FRIEND_FAIL, payload: err.message})
  }
}