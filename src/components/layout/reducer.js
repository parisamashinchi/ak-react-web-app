import * as constants from './constants';

const defaultState = {
    notification: '',
    notificationSetting: {},
    lastLocation: '',
    sentToLogin: false,
};

/*
LayoutReducer sets all given data in redux
 */
const LayoutReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_NOTOFICATIONS:
        return {
            ...state,
            notifications: action.payload.notification,
        };
    case constants.SET_NOTOFICATIONS_SETTING:
        return {
            ...state,
            notificationSetting: action.payload.data,
        };
    case constants.SET_LAST_LOCATION:
        return {
            ...state,
            lastLocation: action.payload.location,
        };
    case constants.SENT_TO_LOGIN:
        return {
            ...state,
            sentToLogin: action.payload.isSent,
        };
    default:
        return state;
    }
};

export default LayoutReducer;
