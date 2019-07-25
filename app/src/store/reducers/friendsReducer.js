import * as actions from '../actions/actionTypes';

const initialState = { 
    error: null,
    loading: false,
    deleteFriend: {
        error: null,
        loading: false
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actions.ADD_FRIEND_START:
        return { ...state, loading: true };
    
    case actions.ADD_FRIEND_SUCCESS:
        return { ...state, loading: false, error: false };

    case actions.ADD_FRIEND_FAIL:
        return { ...state, loading: false, error: payload };

    case actions.DELETE_FRIEND_START:
        return {...state, deleteTodo: {...state.deleteTodo, loading: true }};

    case actions.DELETE_FRIEND_SUCCESS:
        return {...state, deleteTodo: {...state.deleteTodo, loading: false, error: false }};

    case actions.DELETE_FRIEND_FAIL:
        return {...state, deleteTodo: {...state.deleteTodo, loading: false, error: payload }};

    case actions.BLOCK_FRIEND_START:
        return { ...state, loading: true };
            
    case actions.BLOCK_FRIEND_SUCCESS:
        return { ...state, loading: false, error: false };
        
    case actions.BLOCK_FRIEND_FAIL:
        return { ...state, loading: false, error: payload };

    default:
        return state
    }
};