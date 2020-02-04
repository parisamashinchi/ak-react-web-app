import {
    call, takeEvery,
} from 'redux-saga/effects';
import React from 'react';
import map from 'lodash/map';
import Ajax from 'api/Ajax';
import { Row, Icon } from 'antd';
import { store } from 'store/ConfigureStore';
import { moments } from 'src/utils/moment';
import { alert } from 'containers/alert/Alerts';
import { spiritNumber } from 'src/utils/spiritNumber';
import * as modalActions from 'containers/modal/actions';
import * as formActions from 'containers/form/actions';
import * as tableActions from 'containers/table/actions';
import CustomButton from 'components/ui-components/button/Button';
import * as authActions from '../authentication/actions';
import * as constants from './constants';
import * as actions from './actions';

/*
 getInstances function is called when we need
 to get instances list from server
 */

function* getWallet() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setWallet(response.data.data));
        },
        error: () => {
            store.dispatch(actions.setWallet(false));
        },

    }).setMethod('get')
        .setUrl(constants.GET_WALLET_URL)
        .send());
}

/*
 getLastTransaction
 */

function* getLastTransaction(action) {
    const { uuid } = action.payload;
    const style = {
        width: '350px',
        className: 'billModal',
    };
    yield call(() => new Ajax({
        success: (response) => {
            const transactionDetail = () => {
                const hideModal = () => {
                    store.dispatch(modalActions.showModal(false));
                };
                return (
                    <div>
                        <h3 className="text-align-center">
                            {
                                response.data.data.status === 'succeeded'
                                    ? <Icon type="check-circle" />
                                    : <Icon type="close-circle" />
                            }
                            {
                                response.data.data.status === 'succeeded'
                                    ? 'Succeeded'
                                    : 'Failed'
                            }
                            &nbsp;
                            transaction
                        </h3>
                        <div className="content">
                            <div>
                                <span className="title">
                                    Amount:
                                </span>
                                <span className="value">
                                    {spiritNumber(response.data.data.amount)}
                                </span>
                            </div>
                            <div>
                                <span className="title">
                                    Date:
                                </span>
                                <span className="value">
                                    {moments(response.data.data.created)}
                                </span>
                            </div>
                            <div>
                                <span className="title">
                                    Type:
                                </span>
                                <span className="value">
                                    {response.data.data.type}
                                </span>
                            </div>
                            {
                                response.data.data.meta.payment_gateway_response.tracenumber
                                    ? (
                                        <div>
                                            <span className="title">
                                                Trace code:
                                            </span>
                                            <span className="value">
                                                {response.data.data.meta.payment_gateway_response.tracenumber}
                                            </span>
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                        <Row className="text-align-center">
                            <CustomButton
                                size="large"
                                color="blue"
                                onClick={hideModal}
                            >
                                OK
                            </CustomButton>
                        </Row>
                    </div>
                );
            };
            store.dispatch(modalActions.showModal(true, transactionDetail, style));
        },
    }).setMethod('get')
        .setUrl(`${constants.GET_LAST_TRANSACTION_URL}/${uuid}/`)
        .send());
}

/*
 couponConfirm function is called when we need
 to post coupon code to server
 */
function* couponConfirm(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            response.data.data["success"] = true;
            store.dispatch(actions.setCouponAmount(response.data.data));
        },
        error: (error) => {
            if (error.response) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
            data.coupon_code = '';
            data.coupon_amount = '';
            store.dispatch(actions.setCouponAmount(data));
        },
    }).setMethod('post')
        .setUrl(`${constants.COUPON_URL}`)
        .setData(data)
        .send());
}
/*
 walletCharge function is called when we need
 to post wallet charge properties to the server
 after success response it redirects us to teh bank url
 $response.data.data contains bank url
 */
function* walletCharge(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            window.location.replace(`http://${response.data.data.payment_url}`);
        },
        error: (error) => {
            if (error.response) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post')
        .setUrl(`${constants.WALLET_CHARGE_URL}`)
        .setData(data)
        .setEvent('interval')
        .send());
}

/*
 getBills function is called when we need
 to get bill list from server
 */

function* getBills() {
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
        },
    }).setMethod('get')
        .setUrl(constants.GET_BILLS_URL)
        .send());
}

/*
setBill posts bill and receive message to show in modal
&message is a content of modal. include of message text and done button
 */
function* setBill() {
    yield call(() => new Ajax({
        success: (response) => {
            const style = {
                width: '350px',
                className: 'billModal',
            }
            const message = () => {
                const hideModal = () => {
                    store.dispatch(modalActions.showModal(false));
                };
                return (
                    <div>
                        <p>
                            {response.data.message}
                        </p>
                        <Row className="bill-btn-wrap">
                            <CustomButton
                                size="large"
                                color="blue"
                                onClick={hideModal}
                            >
                                Done
                            </CustomButton>
                        </Row>
                    </div>
                );
            };
            store.dispatch(modalActions.showModal(true, message, style));
        },
    }).setMethod('post')
        .setUrl(`${constants.GET_BILLS_URL}`)
        .send());
}


/*
 getUserProfile function is called when we need
 to get personal user information
 after success response it set info in reducer
 */

function* getUserProfile() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setUserProfile(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.USER_PROFILE)
        .send());
}
/*
 walletCharge function is called when we need
 to post wallet charge properties to the server
 after success response it redirects us to teh bank url
 $response.data.data contains bank url
 */
function* postInvitationCode(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            store.dispatch(actions.getUserProfile());
        },
        error: (error) => {
            if (error.response) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post')
        .setUrl(`${constants.AFFILIATION_URL}`)
        .setData(data)
        .send());
}

/*
 cashOut function is called when we need to put
 affiliate id to the server to cashes out affiliate
 */
function* cashOut(action) {
    const { id } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            store.dispatch(
                tableActions.getData(
                    constants.AFFILIATION_HISTORY,
                    constants.GET_AFFILIATION_USAGE_URL,
                ),
            );
        },
    }).setMethod('put')
        .setUrl(`${constants.GET_AFFILIATION_USAGE_URL}${id}/`)
        .send());
}

/*
 cashOutAll function is called when we need to post
 all affiliation cash out
 */
function* cashOutAll() {
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            store.dispatch(
                tableActions.getData(
                    constants.AFFILIATION_HISTORY,
                    constants.GET_AFFILIATION_USAGE_URL,
                ),
            );
        },
    }).setMethod('post')
        .setUrl(`${constants.AFFILIATION_USAGE_URL_CHECKOUT}`)
        .send());
}


/*
 editPrsInfo function is called when we need to put
 personal information
 */
function* editPrsInfo(action) {
    const { id, data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
            store.dispatch(modalActions.showModal(false));
            store.dispatch(actions.getUserProfile(response.data.data));
            store.dispatch(authActions.setUserData(response.data.data));
        },
        error: (error) => {
            if (error.response) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                const errorDetails = {};
                map(Object.entries(error.response.data.data), item => {
                    return Object.assign(errorDetails, {[item[0]]: item[1][0]})
                });
                store.dispatch(formActions.setErrors(reportedErrors, errorDetails));
            }
        },
    })
        .setMethod('put').setUrl(constants.USER_PROFILE)
        .setData(data)
        .send());
}

/*
 getMembers function is called when we need
 to get invited members
 after success response it set members in reducer
 */

function* getMembers() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setMembers(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.AFFILIATION_URL)
        .send());
}


/*
 getReportDaily function is called when we need
 to get bill graph information in one day
 after success response it set info in reducer
 */

function* getReportDaily() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setReportDaily(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.GET_BILL_REPORT_URL)
        .send());
}

/*
 getReportWeekly function is called when we need
 to get bill graph information in one week
 after success response it set info in reducer
 */

function* getReportWeekly() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setReportWeekly(response.data.data));
        },
    }).setMethod('get')
        .setUrl(`${constants.GET_BILL_REPORT_URL}?range=weekly`)
        .send());
}

/*
 getReportMonthly function is called when we need
 to get bill graph information in one month
 after success response it set info in reducer
 */

function* getReportMonthly() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setReportMonthly(response.data.data));
        },
    }).setMethod('get')
        .setUrl(`${constants.GET_BILL_REPORT_URL}?range=monthly`)
        .send());
}
/*
 getBillDetail function is called when we need
 to get bill details information
 after success response it set info in reducer
 */

function* getBillDetail(action) {
    const { id } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setBillDetail(response.data.data));
        },
    }).setMethod('get')
        .setUrl(`${constants.GET_BILLS_URL}${id}/`)
        .send());
}
/*
 couponConfirm function is called when we need
 to post coupon code to server
 */
function* changePassword(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            alert('success', response.data.message);
        },
        error: (error) => {
            if (error.response) {
                const reportedErrors = map(Object.keys(error.response.data.data));
                store.dispatch(formActions.setErrors(reportedErrors));
            }
        },
    }).setMethod('post')
        .setUrl(`${constants.SET_NEW_PASSWORD_URL}`)
        .setData(data)
        .send());
}

function* getPaymentPackages() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setPaymentPackages(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.PAYMENT_PACKAGES_URL)
        .send());
}

function* getGatewayPackages() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setGatewayPackages(response.data.data));
        },
    }).setMethod('get')
        .setUrl(constants.GATEWAY_PACKAGES_URL)
        .send());
}

/** ******************************* */
function* getWalletSaga() {
    yield takeEvery(constants.GET_WALLET, getWallet);
}
function* getLastTransactionSaga() {
    yield takeEvery(constants.GET_LAST_TRANSACTION, getLastTransaction);
}
function* couponConfirmSaga() {
    yield takeEvery(constants.COUPON_CONFIRM, couponConfirm);
}
function* walletChargeSaga() {
    yield takeEvery(constants.WALLET_CHARGE, walletCharge);
}
function* getBillsSaga() {
    yield takeEvery(constants.GET_BILLS, getBills);
}
function* setBillSaga() {
    yield takeEvery(constants.SET_BILLS, setBill);
}
function* userProfileSaga() {
    yield takeEvery(constants.GET_USER_PROFILE, getUserProfile);
}
function* postInvitationCodeSaga() {
    yield takeEvery(constants.SET_INVITATION_CODE, postInvitationCode);
}
function* cashOutSaga() {
    yield takeEvery(constants.CASH_OUT, cashOut);
}
function* cashOutAllSaga() {
    yield takeEvery(constants.CASH_OUT_ALL, cashOutAll);
}
function* editPrsInfoSaga() {
    yield takeEvery(constants.EDIT_USER_PROFILE, editPrsInfo);
}
function* getMembersSaga() {
    yield takeEvery(constants.GET_MEMBERS, getMembers);
}
function* getReportDailySaga() {
    yield takeEvery(constants.GET_BILL_REPORT_DAILY, getReportDaily);
}
function* getReportWeeklySaga() {
    yield takeEvery(constants.GET_BILL_REPORT_WEEKLY, getReportWeekly);
}
function* getReportMonthlySaga() {
    yield takeEvery(constants.GET_BILL_REPORT_MONTHLY, getReportMonthly);
}
function* getBillDetailSaga() {
    yield takeEvery(constants.GET_BILLS_DETAIL, getBillDetail);
}
function* changePasswordSaga() {
    yield takeEvery(constants.SET_NEW_PASSWORD, changePassword);
}

function* getPaymentPackagesSaga() {
    yield takeEvery(constants.GET_PAYMENT_PACKAGES, getPaymentPackages);
}

function* getGatewayPackagesSaga() {
    yield takeEvery(constants.GET_GATEWAY_PACKAGES, getGatewayPackages);
}


export default [
    getWalletSaga(),
    couponConfirmSaga(),
    walletChargeSaga(),
    getBillsSaga(),
    setBillSaga(),
    userProfileSaga(),
    postInvitationCodeSaga(),
    cashOutSaga(),
    cashOutAllSaga(),
    editPrsInfoSaga(),
    getMembersSaga(),
    getLastTransactionSaga(),
    getReportDailySaga(),
    getReportWeeklySaga(),
    getReportMonthlySaga(),
    getBillDetailSaga(),
    changePasswordSaga(),
    getPaymentPackagesSaga(),
    getGatewayPackagesSaga(),
];
