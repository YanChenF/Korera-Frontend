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
    if(!colNames) colNames = ['test'];
    let newCols = colNames.map(e => ({Header: e, accessor: e}));
    return {
        type: ActionTypes.ADD_COLUMN,
        payload: newCols
    }
}

export const addRow = (projectId) => {
    let project = 1;
    return {
        type: ActionTypes.ADD_ROW,
        payload: project
    }
}

export const requestResource = () => {
    return {
        type: ActionTypes.RESOURCE_LOADING
    }
}

export const fetchResources = (projectId) => (dispatch => {
    dispatch(requestResource());
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

export const addSelected = (selection) => {
    return {
        type: ActionTypes.ADD_SELECTION,
        payload: selection
    }
}

export const deleteSelected = (selection) => {
    return {
        type: ActionTypes.DELETE_SELECTION,
        payload: selection
    }
}

export const saveSelected = (selectedData) => {
    return {
        type: ActionTypes.SAVE_SELECTION,
        payload: selectedData
    }
}

export const postData = (data, extraColumns, projectId) => (dispatch => {
    const originalFields = ['id', 'name', 'code', 'projectId'];
    const attributeNames = extraColumns.map(e => ({name: e.accessor, flag: 1}));
    const attributeValues = [];
    console.log(attributeValues);
    console.log(attributeNames);
    data.forEach(e => {
        for(let key in e) {
            if(!originalFields.includes(key)) {
                attributeValues.push({attributeName: key, value: e[key], resourceId: e.id});
            }
        }
    })
    axios.post(baseUrl + '/resources', data)
        .then(res => axios.post(`${baseUrl}/${projectId}/attributes`, attributeNames))
        .then(res => axios.post(baseUrl + '/attributes', attributeValues))
        .catch(err => console.log(err));
})

export const login = (email, password) => dispatch => {
    const cred = { email, password };
    dispatch(requestLogin());
    axios.post(baseUrl + '/login', cred)
    .then(res => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(loginSuccess());
        dispatch(checkAuthTimeout(3600));
    })
    .catch(err => {
        dispatch(loginFailure(err.response.data.message));
        console.log(err.response);
    });
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {
        type: ActionTypes.REQUEST_LOGOUT
    };
};

export const checkAuthState = () => dispatch => {
    let token = localStorage.getItem('token');
    if(!token) dispatch(logout());
    else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(loginSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } 
    }
}

export const requestLogin = (creds) => ({
    type: ActionTypes.REQUEST_LOGIN
});

export const loginSuccess = () => ({
    type: ActionTypes.LOGIN_SUCCESS
});

export const loginFailure = (errMess) => ({
    type: ActionTypes.LOGIN_ERR,
    errMess
});

export const signup = (email, password, username) => dispatch => {
    dispatch(signupLoading());
    axios.post(baseUrl + '/signup', {email, password, username})
    .then(res => {
        console.log(res.data);
        dispatch(signupSuccess());
    })
    .catch(err => console.log(err));
}

export const signupLoading = () => ({
    type: ActionTypes.SIGNUP_LOADING
})

export const signupSuccess = () => ({
    type: ActionTypes.SIGNUP_SUCCESS
});

export const signupFailure = (errMess) => ({
    type: ActionTypes.SIGNUP_ERR,
    errMess
});