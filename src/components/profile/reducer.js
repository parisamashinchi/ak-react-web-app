import * as constants from './constants';

const defaultState = {
    wallet: '',
    BillDetails: {},
    BillDetails: {},
    paymentPackages: [],
    gatewayPackages: [],
};

/*
WalletReducer sets all given data in redux
$couponItem is properties of coupon which is given from posting coupon code
 */
const WalletReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_WALLET:
        return {
            ...state,
            wallet: action.payload.wallet,
        };
    case constants.SET_COUPON:
        return {
            ...state,
            couponItem: action.payload.couponItem,
        };
    case constants.SET_USER_PROFILE:
        return {
            ...state,
            userProfile: action.payload.data,
        };
    case constants.SET_MEMBERS:
        return {
            ...state,
            invitedMember: action.payload.data,
        };
    case constants.SET_BILL_REPORT_DAILY:
        return {
            ...state,
            billReportDaily: action.payload.data,
        };
    case constants.SET_BILL_REPORT_WEEKLY:
        return {
            ...state,
            billReportWeekly: action.payload.data,
        };
    case constants.SET_BILL_REPORT_MONTHLY:
        return {
            ...state,
            billReportMonthly: action.payload.data,
        };
    case constants.SET_BILLS_DETAIL:
        return {
            ...state,
            BillDetails: action.payload.data,
        };
    case constants.SET_PAYMENT_PACKAGES:
        return {
            ...state,
            paymentPackages: action.payload.data,
        };
    case constants.SET_GATEWAY_PACKAGES:
        return {
            ...state,
            gatewayPackages: action.payload.data,
        };
    default:
        return state;
    }
};

export default WalletReducer;
