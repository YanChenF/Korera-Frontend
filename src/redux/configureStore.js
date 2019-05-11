import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/auth';

const rootReducer = combineReducers({
    auth: Auth
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;