import * as constants from './constants';

/**
 * selectFlavor is an action in order to select one flavor and set its id into redux store
 * @param flavor contains selected flavor id
 */
export const selectFlavor = flavor => ({
    type: constants.SET_SELECTED_FLAVOR,
    payload: {
        flavor,
    },
});

/**
 * getFlavors is an action in order to get all flavors from server
 */
export const getFlavors = () => ({
    type: constants.GET_FLAVORS,
});

/**
 * setFlavors is an action in order to set list of flavors into redux saga
 * @param flavorList is contains list of flavors
 */
export const setFlavors = flavorList => ({
    type: constants.SET_FLAVORS,
    payload: {
        flavorList,
    },
});
