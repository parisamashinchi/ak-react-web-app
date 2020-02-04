import { call, takeEvery } from 'redux-saga/effects';
import Ajax from 'src/api/Ajax';
import { store } from 'src/store/ConfigureStore';
import { alert } from 'containers/alert/Alerts';
import * as tableActions from 'containers/table/actions';
import * as modalActions from 'containers/modal/actions';
import * as constants from './constants';

/*
 deleteData function is called when we need
 to delete data from server
 */
function* deleteData(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            store.dispatch(modalActions.showModal(false));
            store.dispatch(tableActions.getData(data.getName, data.getURL, 'compute'));
        },
    }).setMethod('delete')
        .setUrl(`${data.url}/`)
        .setEvent('compute')
        .send());
}

function* deleteDataSaga() {
    yield takeEvery(constants.DELETE_ACTION, deleteData);
}

export default [
    deleteDataSaga(),
];
