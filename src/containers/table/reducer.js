import * as constants from './constants';

const defaultState = {
    tableDetail: {},
    filter: {
        cost: '',
        date: '',
        period: 'daily',
    },
    filterURL: '',
    dynamicURL: '',
};

/*
TableReducer sets all given data in redux
 */
const TableReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.FETCH_TABLE:
        return {
            ...state,
            [action.payload.name]: action.payload.data,
        };
    case constants.FETCH_TABLE_DETAIL:
        return {
            ...state,
            tableDetail: action.payload.data,
            dynamicURL: action.payload.dynamicURL,
        };
    case constants.SET_FILTER:
        return {
            ...state,
            filter: action.payload.filter,
            filterURL: action.payload.url,
        };
    default:
        return state;
    }
};

export default TableReducer;
