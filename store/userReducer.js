const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';
const SET_ERRORS = 'SET_ERRORS';
const SET_LOADING = 'SET_LOADING';
const SET_AUTH = 'SET_AUTH';

const initialState = {
    isSidebarVisible: false,
    isLoading: false,
    isAuth: false,
    errors: []
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case SET_SIDEBAR_VISIBILITY:
            return {...state, isSidebarVisible: action.payload};
        case SET_ERRORS:
            return {...state, errors: action.payload, isLoading: false};
        case SET_AUTH:
            return {...state, isAuth: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        default:
            return state;
    }
}

export const setSidebarVisibilityAction = (boolean) => ({type: SET_SIDEBAR_VISIBILITY, payload: boolean});
export const setErrors = (errors) => ({type: SET_ERRORS, payload: errors});
export const setAuth = (isAuth) => ({type: SET_AUTH, payload: isAuth});
export const setLoading = (boolean) => ({type: SET_LOADING, payload: boolean});