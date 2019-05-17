import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    columns: [],
    selected: []
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
            return {...state, columns: state.columns.concat(action.payload)};

        case ActionTypes.ADD_SELECTION:
            return {...state, selected: [...state.selected, ...action.payload]};

        case ActionTypes.DELETE_SELECTION:
            let removed = state.selected.filter(
                value => !action.payload.includes(value)
            );
            return {...state, selected: removed};
        default: return state;
    }
}

export default Resource;
// state.selected.concat(action.payload)