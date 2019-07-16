import * as actions from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
    verifyEmail: {
        error: null,
        loading: false,
    },
    recoverPassword: {
        error: null,
        loading: false,
    },
    accountEdit: {
        error: null,
        loading: false,
    },
    deleteUser: {
        error: null,
        loading: false,
    },
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.CLEAN_UP:
            return {
                ...state,
                error: null,
                loading: false,
                verifyEmail: {
                    ...state.verifyEmail,
                    loading: false,
                    error: null
                },
                recoverPassword: {
                    ...state.recoverPassword,
                    loading: false,
                    error: null
                },
                accountEdit: {
                    ...state.accountEdit,
                    loading: false,
                    error: null,
                },
                deleteUser: {
                    ...state.deleteUser,
                    loading: false,
                    error: null,
                }
            };

        case actions.AUTH_START:
            return {...state, loading: true};

        case actions.AUTH_END:
            return {...state, loading: false};

        case actions.AUTH_FAIL:
            return {...state, error: payload};

        case actions.AUTH_SUCCESS:
            return {...state, error: false};

        case actions.VERIFY_START:
            return {...state, verifyEmail: {...state.verifyEmail, loading: true }};

        case actions.VERIFY_SUCCESS:
            return {
                ...state,
                verifyEmail: {...state.verifyEmail, loading: false, error: false },
            };
        
        case actions.VERIFY_FAIL:
            return {
                ...state,
                verifyEmail: {...state.verifyEmail, loading: false, error: payload },
            };

        case actions.RECOVERY_START:
            return {
                ...state,
                recoverPassword: {...state.recoverPassword, loading: true },
            };

        case actions.RECOVERY_SUCCESS:
            return {
                ...state,
                recoverPassword: {...state.recoverPassword, loading: false, error: false }
            };

        case actions.RECOVERY_FAIL:
            return {
                ...state,
                recoverPassword: {...state.recoverPassword, loading: false, error: payload }
            };

        case actions.ACCOUNT_EDIT_START:
            return {
                ...state,
                accountEdit: {...state.accountEdit, loading: true },
            };

        case actions.ACCOUNT_EDIT_SUCCESS:
            return {
                ...state,
                accountEdit: {...state.accountEdit, loading: false, error: false },
            };

        case actions.ACCOUNT_EDIT_START:
            return {
                ...state,
                accountEdit: {...state.accountEdit, loading: false, error: payload },
            };

        case actions.DELETE_START:
            return {
                ...state,
                deleteUser: {...state.deleteUser, loading: true}
            };

        case actions.DELETE_FAIL:
            return {
                ...state,
                deleteUser: {...state.deleteUser, loading: false, error: payload}
            };

        default:
            return state;
    }
};