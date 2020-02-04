import { call, takeEvery } from 'redux-saga/effects';
import { store } from 'src/store/ConfigureStore';
import Ajax from 'src/api/Ajax';
import * as constants from './constants';
import * as actions from './actions';

/*
 getFlavors function is called when we need
 to get flavors list from server
 */
function* getFlavors() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setFlavors(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.GET_FLAVORS_URL)
        .setEvent('compute')
        .send());
}

function* getFlavorsSaga() {
    yield takeEvery(constants.GET_FLAVORS, getFlavors);
}

export default [
    getFlavorsSaga(),
];
