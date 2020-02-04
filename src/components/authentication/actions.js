import * as constants from './constants';

/**
 * isAuthenticated is an action that change isAuth boolean after login or logout
 * @param isAuth contains a boolean to show user authenticated or not
 */
export const getCurrent = currentData => ({
    type: constants.GET_CURRENT,
    payload: {
        currentData,
    },
});

/**
 * isAuthenticated is an action that change isAuth boolean after login or logout
 * @param isAuth contains a boolean to show user authenticated or not
 */
export const isAuthenticated = isAuth => ({
    type: constants.IS_AUTHENTICATED,
    payload: {
        isAuth,
    },
});

/**
 * saveToken is an action to save token in redux store
 * @param token contains token
 */
export const saveToken = token => ({
    type: constants.SAVE_TOKEN,
    payload: {
        token,
    },
});

/**
 * setUserData is an action to set user data in redux store
 * @param data contains an object of user data
 */
export const setUserData = data => ({
    type: constants.SET_USER_DATA,
    payload: {
        data,
    },
});

/**
 * forgotPassword is an action to handle forgot password request to server
 * @param data contains user data
 */
export const forgotPassword = data => ({
    type: constants.FORGOT_PASSWORD,
    payload: {
        data,
    },
});

/**
 * setForgotPassword is an actions set user data to redux store
 * @param data contains user data
 */
export const setForgotPassword = data => ({
    type: constants.SET_FORGOT_PASSWORD,
    payload: {
        data,
    },
});

/**
 * logoutUser is an action to handle log out user
 */
export const logoutUser = redirect => ({
    type: constants.LOGOUT_USER,
    payload: {
        redirect: redirect,
    }
});

/**
 * logoutUser is an action to handle log out user
 */
export const setLogOutUser = () => ({
    type: constants.SET_LOGOUT_USER,
});

/**
 * login is an action to handle user login
 * @param data contains user data to login
 */
export const login = data => ({
    type: constants.LOGIN_USER,
    payload: {
        data,
    },
});

/**
 * resetCounter is an action to handle reset counter of reset password
 * @param value contains a boolean to turn off or on counter
 */
export const resetCounter = value => ({
    type: constants.RESET_COUNTER,
    payload: {
        value,
    },
});

/**
 * resetPassword is an action to send reset password request to server
 * @param data contains user data
 */
export const resetPassword = data => ({
    type: constants.RESET_PASSWORD,
    payload: {
        data,
    },
});

/**
 * signUp is an action to sign up user
 * @param data contains user data
 */
export const signUp = (data, elecomp) => ({
    type: constants.SIGN_UP,
    payload: {
        data,
        elecomp,
    },
});

/**
 * signUp is an action to sign up user
 * @param data contains user data
 */
export const setSignUp = data => ({
    type: constants.SET_SIGN_UP,
    payload: {
        data,
    },
});

/**
 * confirmCode is an action to send user confirmation code to server
 * @param data contains user data and confirmation code
 */
export const confirmCode = (data, type) => ({
    type: constants.CONFIRM_CODE,
    payload: {
        data,
        type,
    },
});

/**
 * getSupportToken is an action to send user confirmation code to server
 */
export const getSupportToken = (data, zoneMeters) => ({
    type: constants.GET_SUPPORT_TOKEN,
    payload: {
        data: data,
        zoneMeters: zoneMeters,
    }
});

/**
 * setSupportToken is an action to send user confirmation code to server
 * @param token contains user token in support system
 */
export const setSupportToken = token => ({
    type: constants.SET_SUPPORT_TOKEN,
    payload: {
        token,
    },
});

export const setRegions = regions => ({
    type: constants.SET_REGIONS,
    payload: {
        regions,
    },
});

export const selectRegion = region => ({
    type: constants.SELECT_REGION,
    payload: {
        region,
    },
});
