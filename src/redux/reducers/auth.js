import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    isLoading: false,
    token: null,
    user: null,
    expiration: null,
    authRedirectPath: '/resource',
    isAuthenticated: false,
    completeSignup: false };

const Auth = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.REQUEST_LOGIN: 
            return {...initialState, isLoading: true};
        case ActionTypes.LOGIN_SUCCESS: 
            return {...state, isLoading: false, isAuthenticated: true, token: localStorage.getItem('token'), user: localStorage.getItem('username')};
        case ActionTypes.LOGIN_ERR: 
            return {...initialState, error: action.errMess};
        case ActionTypes.REQUEST_LOGOUT:
            return {...initialState};
        case ActionTypes.SIGNUP_LOADING: 
            return {...initialState, isLoading: true};
        case ActionTypes.SIGNUP_SUCCESS: 
            return {...state, isLoading: false, completeSignup: true};
        case ActionTypes.SIGNUP_ERR: 
            return {...initialState, error: action.errMess};
        default: 
            return state;
    }
} 

export default Auth;