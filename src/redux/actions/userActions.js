import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                // REDIRECT TO HOME PAGE AFTER SUCCESSFULLY LOGGIMG IN
                history.push('/');
            })
            .catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response
                });
            });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                // REDIRECT TO HOME PAGE AFTER SUCCESSFULLY LOGGIMG IN
                history.push('/');
            })
            .catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
    .then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
    })
    .catch((err) => {
        console.log(err)
    });
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/image', formData)
    .then ((res) => {
        dispatch(getUserData());
    })
    .catch((err) => {
        console.log(err)
    });
};

export const editUserProfile = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
        .then((res) => {
            dispatch(getUserData());
        })
        .catch((err) => {
            console.log(err)
        });
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
                localStorage.setItem('FBIdToken', FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken;
}