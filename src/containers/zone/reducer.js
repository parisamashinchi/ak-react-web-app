import * as constants from './constants';

const defaultState = {
    cost: {},
};

const ZoneReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_FULL_ZONE:
        return {
            ...state,
            fullZone: action.payload.data,
        };
    case constants.SET_ZONE:
        return {
            ...state,
            zone: action.payload.data,
        };
    case constants.SET_COST:
        return {
            ...state,
            cost: action.payload.costData,
        };
    default:
        return state;
    }
};

export default ZoneReducer;
