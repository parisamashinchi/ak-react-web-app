import {
    call,
    takeEvery,
} from 'redux-saga/effects';
import map from 'lodash/map';
import { store } from 'src/store/ConfigureStore';
import React from 'react';
import concat from 'lodash/concat';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Icon, Row } from 'antd';
import Ajax from 'src/api/Ajax';
import { history } from 'src/routers/AppRouter';
import { alert } from 'containers/alert/Alerts';
import * as languageActions from 'containers/language/actions';
import * as loadingActions from 'containers/loading/actions';
import * as formActions from 'containers/form/actions';
import * as modalActions from 'containers/modal/actions';
import * as layoutActions from 'components/layout/actions';
import CustomButton from 'components/ui-components/button/Button';
import * as constants from './constants';
import * as actions from './actions';

/*
 forgotPassword function is called when we need
 to send reset password request to server and show next form
 */
function* forgotPassword(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            if (response.data.status === 'SUCCESS') {
                store.dispatch(actions.setForgotPassword(data));
                alert('success', response.data.message);
                history.push('reset-password');
            }
            if (data.tryAgain) {
                store.dispatch(actions.resetCounter(true));
            }
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post').setUrl(constants.FORGOT_PASSWORD_URL).setData(data)
        .send());
}

/*
 login function is called when we need
 to check user data with server
 */
function* login(action) {
    const { data } = action.payload;
    const supportData = btoa(`${process.env.REACT_APP_SUPPORT_USERNAME_PREFIX}${data.username}:${data.password}`);
    const selectedRegion = store.getState().Authentication.selectedRegion;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.getSupportToken(
                supportData,
                response.data.data.profile.user.zone_meters,
            ));
            store.dispatch(actions.saveToken(`${response.data.data.token_type} ${response.data.data.token}`));
            store.dispatch(actions.setRegions(response.data.data.authenticated_regions));
            store.dispatch(actions.selectRegion(selectedRegion || false));
            store.dispatch(actions.setUserData(response.data.data.profile));
            store.dispatch(actions.isAuthenticated(true));
            store.dispatch(actions.setSignUp({}));
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post').setUrl(constants.LOGIN_URL).setData(data)
        .send());
}

/*
 resetPassword function is called when we need
 to send reset password request to server
 */
function* resetPassword(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            if (response.data.status === 'SUCCESS') {
                alert('success', response.data.message);
            }
            history.push('login');
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post').setUrl(constants.RESET_PASSWORD_URL).setData(data)
        .send());
}

/*
 signUp function is called when we need
 to send sign up request to server
 */
function* signUp(action) {
    const { data, elecomp } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            history.push(elecomp ? '/elecomp/confirm-code' : 'confirm-code');
            alert('success', response.data.message);
            store.dispatch(actions.setSignUp(data));
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
                if (reportedErrors[0] === 'g_recaptcha_response') {
                    if (elecomp) {
                        history.push('/elecomp/confirm-code');
                    } else{
                        history.push('sign-up');
                    }
                }
            }
        },
    }).setMethod('post').setUrl(elecomp ? elecomp : constants.SIGN_UP_URL).setData(data)
        .send());
}

/*
 confirmCode function is called when we need
 to send confirmation code request to server
 */
function* confirmCode(action) {
    const { data, type } = action.payload;
    const signUpData = store.getState().Authentication.signedData;
    const style = {
        width: '350px',
        className: 'registerCodeModal',
    };
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            history.push(type ? '/authentication/login' : 'login');
            const successModal = () => {
                const hideModal = () => {
                    store.dispatch(modalActions.showModal(false));
                };
                return (
                    <div className="wrapper">
                        <div>
                            Your registration code is:
                        </div>
                        <div>
                            {signUpData.registration_code}
                        </div>
                        <CustomButton onClick={hideModal}>
                            Ok
                        </CustomButton>
                    </div>
                );
            };
            if (type) {
                store.dispatch(modalActions.showModal(true, successModal, style));
            }
        },
        error: (error) => {
            if (error.response && error.response.data && error.response.data.data) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post').setUrl(constants.CONFIRM_CODE_URL).setData(data)
        .send());
}

/*
 getSupportToken function is called when we need
 to check user get token for support
 */
function* getSupportToken(action) {
    const { data, zoneMeters } = action.payload;
    const sentToLogin = store.getState().LayoutReducer.sentToLogin;
    const lastLocation = store.getState().LayoutReducer.lastLocation;
    const requestURL = get(store.getState().LoadingReducer.loadData, 'requestURL', []);
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(languageActions.setLocale('en'));
            store.dispatch(loadingActions.showLoading({
                showLoader: true,
                requestType: 'post',
                requestURL: concat(requestURL, constants.LOGIN_URL),
            }));
            store.dispatch(actions.setSupportToken(response.data.name));
            if (sentToLogin) {
                store.dispatch(layoutActions.sentToLogin(false));
                window.location.replace(lastLocation);
            } else if (zoneMeters.cpu === 0 && zoneMeters.ram === 0 && zoneMeters.disk === 0) {
                window.location.replace('/create');
            } else if (!isEmpty(store.getState().FlavorsReducer.selectedFlavor)) {
                window.location.replace('/compute/virtual-machines/create');
            } else {
                window.location.replace('/compute/virtual-machines/list');
            }
        },
    }).setMethod('post')
        .setUrl(constants.SUPPORT_URL)
        .setEvent('support')
        .setToken(data)
        .setData({
            "label": "portal token",
            "permission": ["cti.agent","ticket.agent"],
        })
        .send());
}

/*
 logoutUser function is called when we need
 to send logout user request to server
 */
function* logoutUser(action) {
    const { redirect } = action.payload;
    yield call(() => new Ajax({
        success: () => {
            store.dispatch(actions.saveToken(''));
            store.dispatch(actions.isAuthenticated(false));
            store.dispatch(actions.setLogOutUser());
            window.location.replace(redirect ? redirect : '/');
        },
    }).setMethod('get').setUrl(constants.LOGIN_URL).send());
}

function* forgotPasswordSaga() {
    yield takeEvery(constants.FORGOT_PASSWORD, forgotPassword);
}

function* loginSaga() {
    yield takeEvery(constants.LOGIN_USER, login);
}

function* resetPasswordSaga() {
    yield takeEvery(constants.RESET_PASSWORD, resetPassword);
}
export function* signUpSaga() {
    yield takeEvery(constants.SIGN_UP, signUp);
}

function* confirmCodeSaga() {
    yield takeEvery(constants.CONFIRM_CODE, confirmCode);
}

function* getSupportTokenSaga() {
    yield takeEvery(constants.GET_SUPPORT_TOKEN, getSupportToken);
}

function* logoutUserSaga() {
    yield takeEvery(constants.LOGOUT_USER, logoutUser);
}

export default [
    forgotPasswordSaga(),
    loginSaga(),
    resetPasswordSaga(),
    signUpSaga(),
    confirmCodeSaga(),
    getSupportTokenSaga(),
    logoutUserSaga(),
];
