import * as constants from './constants';

// getWallet action for calling saga for ajax request to get wallet info from server
export const getWallet = () => ({
    type: constants.GET_WALLET,
});

// getLastTransaction
export const getLastTransaction = uuid => ({
    type: constants.GET_LAST_TRANSACTION,
    payload: {
        uuid,
    },
});

/*
set information of wallet in store.
this information will be used in wallet profile component.
wallet is the account info that we want to put in redux.
*/
export const setWallet = wallet => ({
    type: constants.SET_WALLET,
    payload: {
        wallet,
    },
});

/*
couponConfirm action for calling a saga to send coupon code to server
data: is an object and contains amount and coupon code
 */
export const couponConfirm = data => ({
    type: constants.COUPON_CONFIRM,
    payload: {
        data,
    },
});
/*
setCouponAmount action for calling a saga to set coupon data
including of payment amount and coupon amount to reducer
*/
export const setCouponAmount = couponItem => ({
    type: constants.SET_COUPON,
    payload: {
        couponItem,
    },
});

/*
walletCharge action for calling a saga to send request to post wallet  charge data
data: is an object and contains amount and coupon code and user_callback_url
 */
export const walletCharge = data => ({
    type: constants.WALLET_CHARGE,
    payload: {
        data,
    },
});

/*
setBill action for calling a saga to post bills
without data
*/
export const setBill = () => ({
    type: constants.SET_BILLS,
});

/*
get userProfile is an action which
gives user properties profile
 */
export const getUserProfile = () => ({
    type: constants.GET_USER_PROFILE,
});

/*
get userProfile is a function which
gives user properties profile
 */
export const setUserProfile = data => ({
    type: constants.SET_USER_PROFILE,
    payload: {
        data,
    },
});

/*
postInvitationCode is an action which
sends invitation code to the server
 */
export const postInvitationCode = data => ({
    type: constants.SET_INVITATION_CODE,
    payload: {
        data,
    },
});

/*
cashOut is an action which carries
id of affiliation
*/
export const cashOut = id => ({
    type: constants.CASH_OUT,
    payload: {
        id,
    },
});

/*
cashOutALL is an action which
cashes out all affiliation
*/
export const cashOutAll = () => ({
    type: constants.CASH_OUT_ALL,
});

/*
editPrsInfo is an action which
post new personal information data to the server
*/
export const editPrsInfo = (id, data) => ({
    type: constants.EDIT_USER_PROFILE,
    payload: {
        id,
        data,
    },
});

/*
getMember is an action which get
all invitation members
 */
export const getMembers = () => ({
    type: constants.GET_MEMBERS,
});

/*
setMembers is an action which set
all invited members in reducer
 */
export const setMembers = data => ({
    type: constants.SET_MEMBERS,
    payload: {
        data,
    },
});

/*
getReportDaily is an action which get
all required bill's  graph information in whole day
 */
export const getReportDaily = data => ({
    type: constants.GET_BILL_REPORT_DAILY,
});

/*
setReportDaily is an action which set
all graph info in reducer
 */
export const setReportDaily = data => ({
    type: constants.SET_BILL_REPORT_DAILY,
    payload: {
        data,
    },
});

/*
getReportWeekly is an action which get
all required bill's graph information in one weekly
 */
export const getReportWeekly = data => ({
    type: constants.GET_BILL_REPORT_WEEKLY,
});

/*
setReportWeekly is an action which set
all graph info in reducer
 */
export const setReportWeekly = data => ({
    type: constants.SET_BILL_REPORT_WEEKLY,
    payload: {
        data,
    },
});

/*
getReportMonthly is an action which get
all required bill's  graph information in one month
 */
export const getReportMonthly = data => ({
    type: constants.GET_BILL_REPORT_MONTHLY,
});

/*
setReportMonthly is an action which set
all graph info in reducer
 */
export const setReportMonthly = data => ({
    type: constants.SET_BILL_REPORT_MONTHLY,
    payload: {
        data,
    },
});

/*
getBillDetail is an action which get
bill details info
 */
export const getBillDetail = id => ({
    type: constants.GET_BILLS_DETAIL,
    payload: {
        id,
    },
});
/*
getBillDetail is an action which set
bill details info in reducer
 */
export const setBillDetail = data => ({
    type: constants.SET_BILLS_DETAIL,
    payload: {
        data,
    },
});

/*
changePassword action for calling a saga to send new password  to server
data: is an object and contains password value
 */
export const changePassword = data => ({
    type: constants.SET_NEW_PASSWORD,
    payload: {
        data,
    },
});

export const getPaymentPackages = () => ({
    type: constants.GET_PAYMENT_PACKAGES,
});

export const setPaymentPackages = (data) => ({
    type: constants.SET_PAYMENT_PACKAGES,
    payload: {
        data,
    },
});

export const getGatewayPackages = () => ({
    type: constants.GET_GATEWAY_PACKAGES,
});

export const setGatewayPackages = (data) => ({
    type: constants.SET_GATEWAY_PACKAGES,
    payload: {
        data,
    },
});
