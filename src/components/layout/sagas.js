import {
    call, takeEvery,
} from 'redux-saga/effects';
import Ajax from 'api/Ajax';
import { alert } from 'containers/alert/Alerts';
import { store } from 'store/ConfigureStore';
import * as constants from './constants';
import * as actions from './actions';


/*
 getNotifications function is called when we need
 to get instances list from server
 after success response from server we set notifications in layout reducer
 */

function* getNotifications() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setNotifications(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.NOTOFICATIONS_URL)
        .send());
}

/*
 markNotifications function is called when we need
 to mark as seen all notifications
 */

function* markNotifications() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setNotifications(response.data.data));
        },
    }).setMethod('post')
        .setUrl(constants.MARK_NOTOFICATIONS_URL)
        .send());
}

/*
 getNotificationsSetting function is called when we need
 to get notifications setting
 */

function* getNotificationsSetting() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setNotificationsSetting(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.NOTOFICATIONS_SETTING_URL)
        .send());
}

/*
 putNotificationsSetting function is called when we need
 to edit notifications setting
 */

function* putNotificationsSetting(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setNotificationsSetting(response.data.data));
        },
    }).setMethod('put')
        .setUrl(constants.NOTOFICATIONS_SETTING_URL)
        .setData(data)
        .send());
}


/** ******************************* */
function* getNotificationsSaga() {
    yield takeEvery(constants.GET_NOTOFICATIONS, getNotifications);
}
function* markNotificationsSaga() {
    yield takeEvery(constants.MARK_NOTOFICATIONS, markNotifications);
}
function* getNotificationsSettingSaga() {
    yield takeEvery(constants.GET_NOTOFICATIONS_SETTING, getNotificationsSetting);
}
function* putNotificationsSettingSaga() {
    yield takeEvery(constants.PUT_NOTOFICATIONS_SETTING, putNotificationsSetting);
}

export default [
    getNotificationsSaga(),
    markNotificationsSaga(),
    getNotificationsSettingSaga(),
    putNotificationsSettingSaga(),
];
