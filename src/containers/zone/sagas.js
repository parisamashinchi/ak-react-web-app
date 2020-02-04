import isEmpty from 'lodash/isEmpty';
import { call, takeEvery } from 'redux-saga/effects';
import Ajax from 'api/Ajax';
import { store } from 'store/ConfigureStore';
import * as constants from './constants';
import * as actions from './actions';

/*
getZone get full zone information and set its response to ZoneReducer
 */
function* getFullZone(action) {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setFullZone(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.GET_ZONE_FULL_URL)
        .send());
}
/*
getZone get zone information and set its response to ZoneReducer
 */
function* getZone(action) {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setZone(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.GET_ZONE_URL)
        .send());
}

/*
getFlavorCost
 */
function* getCost(action) {
    const { data } = action.payload;
    const customURL = isEmpty(data)
        ? constants.GET_COST_URL
        : `${constants.GET_COST_URL}?ram=${data.ram}&cpu=${data.cpu}&disk=${data.disk}`;
    yield call(() => new Ajax({
        success: (response) => {
            if (response.data.status === 'SUCCESS') {
                store.dispatch(actions.setCost(response.data.data.fees));
            }
        },
    }).setMethod('get')
        .setUrl(customURL)
        .setData(data)
        .send());
}

function* getCostSaga() {
    yield takeEvery(constants.GET_COST, getCost);
}
function* getZoneSaga() {
    yield takeEvery(constants.GET_ZONE, getZone);
}
function* getFullZoneSaga() {
    yield takeEvery(constants.GET_FULL_ZONE, getFullZone);
}


export default [
    getCostSaga(),
    getZoneSaga(),
    getFullZoneSaga(),
];
