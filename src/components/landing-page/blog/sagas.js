import {
    call, takeEvery,
} from 'redux-saga/effects';
import React from 'react';
import Ajax from 'api/Ajax';
import { store } from 'store/ConfigureStore';
import { alert } from 'containers/alert/Alerts';
import * as constants from './constants';
import * as actions from './actions';

/*
 getInstances function is called when we need
 to get instances list from server
 */

function* getBlogs() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setBlogs(response.data));
        },
    }).setMethod('get')
        .setUrl(constants.GET_BLOG_URL)
        .setEvent('blog')
        .send());
}

function* getBlogsSaga() {
    yield takeEvery(constants.GET_BLOGS, getBlogs);
}

export default [
    getBlogsSaga(),
];
