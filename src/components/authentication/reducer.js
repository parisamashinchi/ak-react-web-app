import * as constants from './constants';

const defaultState = {
    isAuth: false,
    token: '',
    forgotPassword: {},
    userData: {},
    resetCounter: true,
    currentData: {
        state: '',
        itemHeight: 0,
    },
    signedData: {},
    regionList: [],
};

/*signedData
 AuthReducer has 4 cases:
 in case is authenticated is set isAuth boolean in redux store
 in case set forgot password set user data in redux store
 in case save token set new token to redux store
 in case reset counter set boolean in redux store
 */
const AuthReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.IS_AUTHENTICATED:
        return { ...state, isAuth: action.payload.isAuth };
    case constants.SET_FORGOT_PASSWORD:
        return { ...state, forgotPassword: action.payload.data };
    case constants.SAVE_TOKEN:
        return { ...state, token: action.payload.token };
    case constants.RESET_COUNTER:
        return { ...state, resetCounter: action.payload.value };
    case constants.GET_CURRENT:
        return { ...state, currentData: action.payload.currentData };
    case constants.SET_SIGN_UP:
        return { ...state, signedData: action.payload.data };
    case constants.SET_USER_DATA:
        return { ...state, userData: action.payload.data };
    case constants.SET_SUPPORT_TOKEN:
        return { ...state, supportToken: action.payload.token };
    case constants.SET_REGIONS:
        return { ...state, regionList: action.payload.regions };
    case constants.SELECT_REGION:
        return { ...state, selectedRegion: action.payload.region };
    default:
        return state;
    }
};

export default AuthReducer;
