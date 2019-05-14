import * as ActionTypes from './actionTypes';
import React from 'react';

export const setResource = data => {
    return {
        type: ActionTypes.SET_RESOURCE,
        payload: data
    }
}

export const setColumns = data => {
    const columns = data.map(
        e => ({Header: e, accessor: e})
    );
    return {
        type: ActionTypes.SET_COLUMNS,
        payload: columns
    }
}

export const addColumn = (colName) => {
    let name = 'test'
    let newCol = {Header: name, accessor: name}
    return {
        type: ActionTypes.ADD_COLUMN,
        payload: newCol
    }
}

export const addRow = () => {
    return {
        type: ActionTypes.ADD_ROW
    }
}