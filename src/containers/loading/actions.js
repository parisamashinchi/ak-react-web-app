import * as constants from './constants';

/**
 * showLoading is an action to manage show or hide loading
 * @param loadData contains an object with loading data
 */
export const showLoading = loadData => ({
    type: constants.SHOW_LOADING,
    payload: {
        loadData,
    },
});

/**
 * showLoading is an action to manage show or hide loading
 * @param show contains a boolean to show loading status
 */
export const showIntervalLoading = show => ({
    type: constants.SHOW_INTERVAL_LOADING,
    payload: {
        show,
    },
});
