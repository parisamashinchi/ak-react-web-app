import { call, takeEvery } from 'redux-saga/effects';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import join from 'lodash/join';
import { store } from 'src/store/ConfigureStore';
import Ajax from 'src/api/Ajax';
import * as constants from './constants';
import * as actions from './actions';

/*
 getData function is called when we need
 to get data list from server
 */
function* getData(action) {
    const {
        name,
        url,
        requestType,
        noPaginate,
    } = action.payload;
    const filterURL = get(store.getState().TableReducer, 'filterURL', '');
    const filter = get(store.getState().TableReducer, 'filter', {});
    const dynamicURL = noPaginate
        ? `${url}?skip_pagination=true`
        : !isEmpty(Object.keys(filter))
            ? `${!isEmpty(filterURL)
                ? filterURL
                : url}?${join(Object.values(filter), '&')}`
            : !isEmpty(filterURL) ? filterURL : url;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.fetchTable(noPaginate ? `${name}_noPaginate` : name, response.data.data));
            store.dispatch(actions.fetchTableDetail(response.data._pagination, dynamicURL));
        },
    }).setMethod('get').setUrl(dynamicURL).setEvent(requestType)
        .send());
}

function* getDataSaga() {
    yield takeEvery(constants.GET_DATA, getData);
}

export default [
    getDataSaga(),
];
