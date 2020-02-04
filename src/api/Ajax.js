import axios from 'axios';
import replace from 'lodash/replace';
import pull from 'lodash/pull';
import get from 'lodash/get';
import concat from 'lodash/concat';
import split from 'lodash/split';
import NProgress from 'nprogress';
import { history } from 'src/routers/AppRouter';
import { store } from 'src/store/ConfigureStore';
import { alert } from 'containers/alert/Alerts';
import * as loadingActions from 'containers/loading/actions';
import * as authActions from 'components/authentication/actions';
import * as layoutActions from 'components/layout/actions';
import * as constants from './constants';

export default class ajax {
    constructor(params = {}) {
        this.data = params.data || {};
        this.method = params.method || 'GET';
        this.url = params.url;
        this.event = params.event || '';
        this.show_message = params.show_message || false;
        this.config = params.config || {};
        this.loading = params.loading || true;
        this.token = params.token || '';

        this.success = (res) => {
            const requestURL = get(store.getState().LoadingReducer.loadData, 'requestURL', '');
            if (this.loading === true) {
                window.ajaxInstanceRun--;
                if (window.ajaxInstanceRun == 0) {

                }
            }
            if (res.data.status === 'UNAUTHORIZED') {
                store.dispatch(authActions.isAuthenticated(false));
                store.dispatch(authActions.setLogOutUser());
                window.location.replace('/authentication/login');
            }
            if (params.runOnSuccess) params.runOnSuccess(res);
            if (params.success) {
                if (typeof params.success === 'function') {
                    params.success(res);
                }
            } else if (this.event !== '') {
                store.dispatch({ type: this.event, success: true, data: res });
            }
            if (this.event === 'interval') {
                NProgress.done();
            } else if (this.url !== 'api/v1/auth/') {
                store.dispatch(loadingActions.showLoading({
                    showLoader: false,
                    requestType: this.method,
                    requestURL: pull(requestURL, this.url),
                }));
            }
        };
        this.error = (error) => {
            const requestURL = get(store.getState().LoadingReducer.loadData, 'requestURL', '');
            const errorType = get(store.getState().LoadingReducer.loadData, 'errorType', '');
            const selectedRegion = store.getState().Authentication.selectedRegion;

            console.log('error in ajax', error);
            if (error.response) {
                if (error.response.status === 400 && selectedRegion === false) {
                }
                if (error.response.status === 401) {
                    store.dispatch(authActions.isAuthenticated(false));
                    store.dispatch(authActions.setLogOutUser());
                    if (this.url !== 'api/v1/profile/') {
                        store.dispatch(layoutActions.sentToLogin(true));
                        history.push('/authentication/login');
                        if (errorType !== error.response.status) {
                            alert('error', 'Your session is expired. you may login again.');
                        }
                    }
                } else if (error.response.status === 404) {
                    if (error.response.data.message) {
                        alert('error', error.response.data.message);
                    } else {
                        alert('error', 'not found');
                    }
                } else if (error.response.data.message !== undefined && selectedRegion !== false) {
                    alert('error', error.response.data.message);
                } else if (selectedRegion !== false) {
                    alert('error', 'Internal server error');
                }
                store.dispatch(loadingActions.showLoading({
                    errorType: error.response.status,
                }));
            } else {
                if (errorType !== split(error)[0]) {
                    alert('error', 'Check your connection.');
                    store.dispatch(loadingActions.showLoading({
                        errorType: split(error)[0],
                    }));
                }
            }

            if (this.event === 'interval') {
                NProgress.done();
            } else {
                store.dispatch(loadingActions.showLoading({
                    showLoader: false,
                    requestType: this.method,
                    requestURL: pull(requestURL, this.url),
            }));
            }
            // handle local error
            if (params.error) params.error(error);
        };
    }

    send() {
        const token = store.getState().Authentication.token;
        const supportToken = store.getState().Authentication.supportToken;
        const selectedRegion = store.getState().Authentication.selectedRegion;
        const language = store.getState().locale.lang;
        const withoutV1 = replace(this.url, '/v1/', '/');
        const withHeaderOption = {
            url: constants.BASE_API_URL + withoutV1,
            method: this.method,
            data: this.data,
            config: this.config,
            timeout: 50000,
            headers: {
                Authorization: token,
                'Accept-Language': language,
            },
        };
        const computeHeaderOption = {
            url: constants.BASE_API_URL + withoutV1,
            method: this.method,
            data: this.data,
            config: this.config,
            timeout: 50000,
            headers: {
                Authorization: token,
                'Accept-Language': language,
                region: selectedRegion,
            },
        };
        const noHeaderOption = {
            url: constants.BASE_API_URL + withoutV1,
            method: this.method,
            data: this.data,
            config: this.config,
            timeout: 50000,
        };
        const noTokenURL = [
            'api/auth/',
            'api/auth/forgot_password/',
            'api/auth/reset_password/',
            'api/auth/register/',
            'api/auth/confirm_register/',
            'api/zones/?include_zero_zone=true',
            'api/auth/elecomp_register/',
        ];
        const blogOption = {
            url: this.url,
            method: 'GET',
        };
        const supportOption = {
            url: this.url,
            method: this.method,
            headers: {
                'Authorization': this.token
                    ? `Basic ${this.token}`
                    : `Token ${supportToken}`,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
            },
            data: this.data,
        };
        const supportImageOption = {
            url: this.url,
            method: this.method,
            headers: {
                'Authorization': this.token
                    ? `Basic ${this.token}`
                    : `Token ${supportToken}`,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
            },
            responseType: 'blob',
            data: this.data,
        };
        const formDataOption = {
            url: constants.BASE_API_URL + withoutV1,
            method: this.method,
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
                region: selectedRegion,
            },
            data: this.data,
        };
        const requestURL = get(store.getState().LoadingReducer.loadData, 'requestURL', []);
        const options = noTokenURL.includes(withoutV1) && this.method === 'post'
            ? noHeaderOption
            : withoutV1 === 'api/zones/?include_zero_zone=true'
                ? noHeaderOption
                : withoutV1 === 'api/zones/'
                    ? noHeaderOption
                    : this.event === 'blog'
                        ? blogOption
                        : this.event === 'support'
                            ? supportOption
                            : this.event === 'supportImage'
                                ? supportImageOption
                                : this.event === 'formData'
                                    ? formDataOption
                                    : this.event === 'interval'
                                        ? computeHeaderOption
                                        : this.event === 'compute'
                                            ? computeHeaderOption
                                            : withHeaderOption;
        if (window.ajaxInstanceRun == undefined) window.ajaxInstanceRun = 0;
        window.ajaxInstanceRun++;
        if (this.event === 'interval') {
            NProgress.configure({ showSpinner: false });
            NProgress.start();
        } else if (this.url === 'https://support.pishrocloud.com/api/v1/user_access_token') {
            store.dispatch(loadingActions.showLoading({
                showLoader: true,
                requestType: 'post',
                requestURL: concat(requestURL, 'api/auth/'),
            }));
        } else {
            store.dispatch(loadingActions.showLoading({
                showLoader: true,
                requestType: this.method,
                requestURL: concat(requestURL, this.url),
            }));
        }
        axios(options).then((this.success)).catch(this.error);
    }

    setMethod(method) {
        this.method = method;
        return this;
    }

    setToken(token) {
        this.token = token;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setEvent(event) {
        this.event = event;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setConfigs(config) {
        this.config = config;
        return this;
    }

    setConfig(key, value) {
        this.config[key] = value;
        return this;
    }

    needloading(loading) {
        this.loading = loading;
        return this;
    }
}
