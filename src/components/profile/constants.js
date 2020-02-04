// name
export const WALLET = 'Wallet';
export const COUPON = 'coupon';
export const BILL = 'bill';
export const AFFILIATION_HISTORY = 'affiliation';
export const EDIT_PRSINFO = 'edit personal info';
export const CHANGE_PASSWORD = 'Change password';
export const CURRENCY = process.env.REACT_APP_CURRENCY;


// urls
export const GET_WALLET_URL = 'api/v1/wallet/';
export const GET_WALLET_TRANSACTIONS_URL = 'api/v1/wallet/transactions/';
export const COUPON_URL = 'api/v1/coupon/verify/';
export const WALLET_CHARGE_URL = 'api/v1/wallet/charge/';
export const GET_BILLS_URL = 'api/v1/billing/bills/';
export const USER_PROFILE = 'api/v1/profile/';
export const AFFILIATION_URL = 'api/v1/collaboration/';
export const GET_AFFILIATION_USAGE_URL = 'api/v1/collaboration/usage/';
export const AFFILIATION_USAGE_URL_CHECKOUT = 'api/v1/collaboration/usage/withdraw/';
export const GET_LAST_TRANSACTION_URL = 'api/wallet/transactions/';
export const GET_BILL_REPORT_URL = 'api/v1/billing/bill_items/report/';
export const SET_NEW_PASSWORD_URL = 'api/v1/auth/change_password/';
export const PAYMENT_PACKAGES_URL = 'api/v1//wallet/payment_packages/';
export const GATEWAY_PACKAGES_URL = 'api/v1/wallet/payment_gateways/';

// action types
export const GET_WALLET = 'GET_WALLET';
export const SET_WALLET = 'SET_WALLET';
export const COUPON_CONFIRM = 'COUPON_CONFIRM';
export const WALLET_CHARGE = 'WALLET_CHARGE';
export const SET_COUPON = 'SET_COUPON';
export const GET_BILLS = 'GET_BILLS';
export const SET_BILLS = 'SET_BILLS';
export const GET_BILLS_DETAIL = 'GET_BILLS_DETAIL';
export const SET_BILLS_DETAIL = 'SET_BILLS_DETAIL';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_INVITATION_CODE = 'SET_INVITATION_CODE';
export const CASH_OUT = 'CASH_OUT';
export const CASH_OUT_ALL = 'CASH_OUT_ALL';
export const EDIT_USER_PROFILE = 'EDIT_USER_PROFILE';
export const GET_MEMBERS = 'GET_MEMBERS';
export const SET_MEMBERS = 'SET_MEMBERS';
export const GET_LAST_TRANSACTION = 'GET_LAST_TRANSACTION';
export const GET_BILL_REPORT_DAILY = 'GET_BILL_REPORT_DAILY';
export const GET_BILL_REPORT_WEEKLY = 'GET_BILL_REPORT_WEEKLY';
export const GET_BILL_REPORT_MONTHLY = 'GET_BILL_REPORT_MONTHLY';
export const SET_BILL_REPORT_DAILY = 'SET_BILL_REPORT_DAILY';
export const SET_BILL_REPORT_WEEKLY = 'SET_BILL_REPORT_WEEKLY';
export const SET_BILL_REPORT_MONTHLY = 'SET_BILL_REPORT_MONTHLY';
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const GET_PAYMENT_PACKAGES = 'GET_PAYMENT_PACKAGES';
export const SET_PAYMENT_PACKAGES = 'SET_PAYMENT_PACKAGES';
export const GET_GATEWAY_PACKAGES = 'GET_GATEWAY_PACKAGES';
export const SET_GATEWAY_PACKAGES = 'SET_GATEWAY_PACKAGES';
