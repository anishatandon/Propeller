import * as actions from './actionTypes';
// import friendsReducer from '../../store/reducers/friendsReducer';
// import React from 'react'
// import {connect} from 'react-redux'
// import styled from 'styled-components'

function getParent(snapshot){
  var ref = snapshot.ref();
  return ref.parent().name();
}
// Add a friend
  export const addFriend = username => async (
    dispatch,
    getState,
    { getFirestore, getFirebase }
  ) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    console.log({userId})
    dispatch({ type: actions.ADD_FRIEND_START });
    try {
      const user = await firestore
            .collection('friends')
            .doc(userId)
            .get();
      console.log("outside", {user})
      await firestore
        .collection('users')
        .where('username', "==", username.friend)
        .get()
        .then(querySnapshot => {
            const newFriend = querySnapshot.docs.map(doc => doc.data())[0];
            const newFriendID = newFriend.uid
          console.log({newFriend});
          console.log({newFriendID});
        if (!user.data()) {
          firestore
            .collection('friends')
            .doc(newFriendID)
            .set({
              friends: [newFriend],
            });
        } else {
          firestore
            .collection('friends')
            .doc(userId)
            .update({
              friends: [...user.data().friends, newFriend],
            });
            dispatch({ type: actions.ADD_FRIEND_SUCCESS });
            return true;
        }
      })
    } catch (err) {
      dispatch({ type: actions.ADD_FRIEND_FAIL, payload: err.message });
    }
  };

  // SEND INVITE
  /*
  export const sendInvite = username => async(dispatch, getState, { getFirestore, getFirebase }) => {
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
*/
  
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
      .collection('friends')
      .doc(userId)
      .get();
    // const rese = await firestore
    //   .collection('blockFriends')
    //   .doc(userId)
    //   .get()
    console.log("friends", {res})
    // console.log("block Friends", {rese})
    const previousFriends = res.data().friends;
    console.log({previousFriends})
    const newFriends = previousFriends.filter(friend => friend.username !== username);
    console.log({newFriends})
    // const previousBlockFriends = rese.data().blockFriends;
    // console.log({previousBlockFriends})
    // const newBlockFriends = previousBlockFriends.add(friend => friend.username !== username);
    // console.log({newBlockFriends})
    await firestore
      .collection('friends')
      .doc(userId)
      .update({
        friends: newFriends,
      })
      // .collection('blockFriends')
      // .doc(userId)
      // .update({
      //   blockFriends: newBlockFriends,
      // })
    const rese = await firestore
      .collection('blockFriends')
      .doc(userId)
      .get()
    console.log('blockFriends', {rese})
    // if (rese.data() === null) {
    //   console.log("if")
    //   const previousBlockFriends = [];
    //   console.log({previousBlockFriends})
    //   const newBlockFriends = [users.username]
    //   console.log({newBlockFriends})
    // } else {
    //   console.log("else")
    //   const previousBlockFriends = rese.data().blockFriends;
    //   console.log({previousBlockFriends})
    //   const newBlockFriends = previousBlockFriends.add(friend => friend.username !== username)
    //   console.log({newBlockFriends})
    // }
    const previousBlockFriends = rese.data().blockFriends;
    console.log({previousBlockFriends})
    const newBlockFriends = previousBlockFriends.add(friend => friend.username !== username)
    console.log({newBlockFriends})
    await firestore
      .collection('blockFriends')
      .doc(userId)
      .update({blockFriends: newBlockFriends})
  
    dispatch({type: actions.BLOCK_FRIEND_SUCCESS})
  } catch(err) {
    dispatch({type: actions.BLOCK_FRIEND_FAIL, payload: err.message})
  }
}

// Above method to blockFriend is working better than below except for the fact that two collect and try functions don't work with firebase
// For the below method tried to call deleteFrind and then do the blockFriend list part of the action

// export const blockFriend = username => async(
//   dispatch,
//   getState,
//   {getFirestore, getFirebase }
// ) => {
//   const firestore = getFirestore();
//   const userId = getState().firebase.auth.uid;
//   console.log(username)
//   dispatch({type: actions.BLOCK_FRIEND_START });
//   try {
//     deleteFriend(username)
//     const res = await firestore
//       .collection('blockFriends')
//       .doc(userId)
//       .get()
//     console.log("blockFriends", {res})
//     const previousBlockFriends = res.data().blockFriends;
//     console.log({previousBlockFriends})
//     const newBlockFriends = previousBlockFriends.add(friend => friend.username !== username);
//     console.log(newBlockFriends)
//     await firestore
//       .collection('blockFriends')
//       .doc(userId)
//       .update({
//         blockFriends: newBlockFriends,
//       })
//     dispatch({type: actions.BLOCK_FRIEND_SUCCESS})
//   } catch(err) {
//     dispatch({type: actions.BLOCK_FRIEND_FAIL, payload: err.message})
//   }
// }

// Send friend a todo
// export const sendFriendTodo = data => async (
//   dispatch,
//   getState,
//   { getFirestore, getFirebase }
// ) => {
//   const firestore = getFirestore();
//   const userId = getState().firebase.auth.uid;
//   dispatch({ type: actions.SEND_FRIEND_TODO_START });
//   try {
//     const res = await firestore
//       .collection('')
//   }
// }