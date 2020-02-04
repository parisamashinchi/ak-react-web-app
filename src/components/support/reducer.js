import * as constants from './constants';

const defaultState = {
    userInfo: {},
    ticketList: [],
    ticketStatusList: [],
    groups: [],
    singleIssue: {},
    articles: {},
    newTicket: 0,
};

/*
SupportReducer sets all given data in redux
$couponItem is properties of coupon which is given from posting coupon code
 */
const SupportReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_USER_INFO:
        return {
            ...state,
            userInfo: action.payload.userData,
        };
    case constants.SET_TICKET_STATUS:
        return {
            ...state,
            ticketStatusList: action.payload.data,
        };
    case constants.SET_TICKETS:
        return {
            ...state,
            ticketList: action.payload.data,
        };
    case constants.SET_SINGLE_TICKET:
        return {
            ...state,
            singleIssue: action.payload.ticket,
        };
    case constants.SET_ARTICLES:
        return {
            ...state,
            articles: {
                ...state.articles,
                [action.payload.articles[0].ticket_id]: action.payload.articles,
            },
        };
    case constants.SET_GROUPS:
        return {
            ...state,
            groups: action.payload,
        };
    case constants.SET_ATTACHMENT:
        return {
            ...state,
            attachment: action.payload.data,
        };
    case constants.SET_NEW_TICKET:
        return {
            ...state,
            newTicket: action.payload.data,
        };
    default:
        return state;
    }
};

export default SupportReducer;
