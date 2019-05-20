import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    columns: [],
    selected: [],
    selectedData: [],
    extraColumns: []
};

const Resource = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.RESOURCE_LOADING: 
            return {...state, isLoading: true}

        case ActionTypes.SET_RESOURCE: 
            return {...state, data: action.payload, isLoading: false};

        case ActionTypes.SET_COLUMNS:
            return {...state, columns: action.payload};

        case ActionTypes.ADD_ROW:
            return {...state, data: state.data.concat({projectId: action.payload, name: '', code: '00000'})};

        case ActionTypes.ADD_COLUMN:
            return {...state, extraColumns: [...state.extraColumns, ...action.payload]};

        case ActionTypes.ADD_SELECTION:
            return {...state, selected: [...state.selected, ...action.payload]};

        case ActionTypes.DELETE_SELECTION:
            let removed = state.selected.filter(
                value => !action.payload.includes(value)
            );
            return {...state, selected: removed};

        case ActionTypes.SAVE_SELECTION:
            return {...state, selectedData: action.payload}
        default: return state;
    }
}

export default Resource;
// state.selected.concat(action.payload)