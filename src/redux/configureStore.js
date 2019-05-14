import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Auth from './reducers/auth';
import Resource from './reducers/resource';

const preloadedState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: Auth,
    resource: Resource
})

const store = createStore(rootReducer, preloadedState,
    composeEnhancers(applyMiddleware(thunk)));

export default store;