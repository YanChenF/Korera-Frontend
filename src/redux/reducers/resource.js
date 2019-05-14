import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    columns: []
};

const Resource = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_RESOURCE: 
            return {...state, data: action.payload};
        case ActionTypes.SET_COLUMNS:
            return {...state, columns: action.payload};
        case ActionTypes.ADD_ROW:
            return {...state, data: state.data.concat({})};
        case ActionTypes.ADD_COLUMN:
            return {...state, columns: state.columns.concat(action.payload)}
        default: return state;
    }
}

export default Resource;