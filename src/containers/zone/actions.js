import * as constants from './constants';

export const getFullZone = data => ({
    type: constants.GET_FULL_ZONE,
    payload: {
        data,
    },
});
export const getZone = data => ({
    type: constants.GET_ZONE,
    payload: {
        data,
    },
});
export const setFullZone = data => ({
    type: constants.SET_FULL_ZONE,
    payload: {
        data,
    },
});
export const setZone = data => ({
    type: constants.SET_ZONE,
    payload: {
        data,
    },
});

export const getCost = data => ({
    type: constants.GET_COST,
    payload: {
        data,
    },
});

export const setCost = costData => ({
    type: constants.SET_COST,
    payload: {
        costData,
    },
});
