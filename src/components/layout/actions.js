import * as constants from './constants';

// getNotifications action for calling saga for ajax request to get notification  from server
export const getNotifications = () => ({
    type: constants.GET_NOTOFICATIONS,
});

/*
set Notifications in store.
this information will be used in topbar notification.
*/
export const setNotifications = notification => ({
    type: constants.SET_NOTOFICATIONS,
    payload: {
        notification,
    },
});

/*
markNotifications action marks all notifications
to remove from notifications
*/
export const markNotifications = () => ({
    type: constants.MARK_NOTOFICATIONS,
});

/*
getNotificationsSetting action gets notifications
setting
*/
export const getNotificationsSetting = data => ({
    type: constants.GET_NOTOFICATIONS_SETTING,
    payload: {
        data,
    },
});

/*
setNotificationsSetting action handles set notifications
setting to redux store
*/
export const setNotificationsSetting = data => ({
    type: constants.SET_NOTOFICATIONS_SETTING,
    payload: {
        data,
    },
});

/*
markNotifications action handles edit notifications
setting
*/
export const putNotificationsSetting = data => ({
    type: constants.PUT_NOTOFICATIONS_SETTING,
    payload: {
        data,
    },
});

/*
setLastLocation action sets last location in redux
*/
export const setLastLocation = location => ({
    type: constants.SET_LAST_LOCATION,
    payload: {
        location,
    },
});

/*
sentToLogin action sets last redirected to login in redux
*/
export const sentToLogin = isSent => ({
    type: constants.SENT_TO_LOGIN,
    payload: {
        isSent,
    },
});
