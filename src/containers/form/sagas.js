import { call, takeEvery } from 'redux-saga/effects';
import map from 'lodash/map';
import { store } from 'src/store/ConfigureStore';
import Ajax from 'src/api/Ajax';
import * as constants from './constants';
import * as actions from './actions';

/*
 postData function is called when we need
 to get data list from server
 */
function* postData(action) {
    const {
        data,
        url,
        type,
        onSuccess,
    } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            onSuccess(response);
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(actions.setErrors(reportedErrors));
            }
        },
    }).setMethod(type).setUrl(url)
        .setEvent('compute')
        .setData(data)
        .send());
}

function* postDataSaga() {
    yield takeEvery(constants.POST_FORM, postData);
}

export default [
    postDataSaga(),
];
