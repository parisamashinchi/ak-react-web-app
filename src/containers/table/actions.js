import * as constants from './constants';

/**
 * fetch list is action for set data into redux
 * @param name is contains name of component that holds table
 * @param data is contains list of data that's suppose to set
 */
export const fetchTable = (name, data) => ({
    type: constants.FETCH_TABLE,
    payload: {
        data,
        name,
    },
});

/**
 * fetch list is action for set data into redux
 * @param data is contains list of data that's suppose to set
 */
export const fetchTableDetail = (data, dynamicURL) => ({
    type: constants.FETCH_TABLE_DETAIL,
    payload: {
        data,
        dynamicURL,
    },
});

/**
 * get data action for calling saga for ajax request
 * @param name is contains name of component that holds table
 * @param url contains url to get data from server
 */
export const getData = (name, url, requestType, noPaginate) => ({
    type: constants.GET_DATA,
    payload: {
        url,
        name,
        requestType,
        noPaginate,
    },
});

export const setFilter = (url, filter) => ({
    type: constants.SET_FILTER,
    payload: {
        url: url,
        filter: filter,
    },
});
