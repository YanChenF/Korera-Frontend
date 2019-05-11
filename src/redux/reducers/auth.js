import * as ActionType from '../actions/actionTypes';

const initialState = {
    error: null,
    isLoading: false,
    token: null,
    user: null,
    expiration: null };

const Auth = (state = initialState, action) => {
    return state;
} 

export default Auth;