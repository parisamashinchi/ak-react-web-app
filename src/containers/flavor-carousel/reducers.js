import * as constants from './constants';

const defaultState = {
    flavorList: [],
    selectedFlavor: '',
};

/*
 FlavorsReducer has 2 cases in case set flavors sets all given flavors in redux
 in case set selected flavor sets wanted flavor data in redux store
 */
const FlavorsReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_SELECTED_FLAVOR:
        return { ...state, selectedFlavor: action.payload.flavor };
    case constants.SET_FLAVORS:
        return { ...state, flavorList: action.payload.flavorList };
    default:
        return state;
    }
};
export default FlavorsReducer;
