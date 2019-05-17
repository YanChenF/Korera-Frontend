import * as ActionTypes from './actionTypes';
import axios from 'axios';

const baseUrl = "http://localhost:8080";

export const setResource = data => {
    return {
        type: ActionTypes.SET_RESOURCE,
        payload: data
    }
}

export const setColumns = data => {
    const columns = data.map(
        e => ({Header: e['header'], accessor: e['accessor']})
    );
    return {
        type: ActionTypes.SET_COLUMNS,
        payload: columns
    }
}

export const addColumn = (colNames) => {
    
    let newCols = colNames.map(e => ({Header: e, accessor: e}));
    return {
        type: ActionTypes.ADD_COLUMN,
        payload: newCols
    }
}

export const addRow = () => {
    return {
        type: ActionTypes.ADD_ROW
    }
}

export const fetchResources = (projectId) => (dispatch => {
    axios.get(`${baseUrl}/${projectId}/resources`)
    .then(res => {
        const resources = res.data.map(e => {
            let resource = {...e[0]};
            e[1].forEach(attr => {
                // console.log(attr['attributeName']);
                resource[attr['attributeName']] = attr['value'];
                // console.log(resource);
            });
            return resource;
        });
        // console.log(res.data);
        dispatch(setResource(resources));
    });
})

export const fetchAttributeNames = (projectId) => (dispatch => {
    axios.get(`${baseUrl}/${projectId}/attributes`)
    .then(res => {
        let newColumns = res.data.map(e => e['name']);
        dispatch(addColumn(newColumns));
    });
})