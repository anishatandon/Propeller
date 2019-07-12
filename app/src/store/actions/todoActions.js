import * as actions from './actionTypes';

// Add a to do
export const addTodo = data => async(dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid
    dispatch({type: actions.ADD_TODO_START})
    try{
        const res = await firestore.collection('todos').doc(userId).get();
        const newTodo = {
            id: new Date().valueOf(), // gives a unique ID (mostly) so we can delete each individual todo
            todo: data.todo,
            // done: false // do this later. add button (checkmark) for todos that set it to true and then have it reset to false daily or smtg?
        }
        firestore.collection('todos').doc(userId).update({
            todos: [...res.data().todos, newTodo],
        })

        dispatch({ type: actions.ADD_TODO_SUCCESS });
        return true;
    } catch(err) {
        dispatch({type: actions.ADD_TODO_FAIL, payload: err.message})
    }
}