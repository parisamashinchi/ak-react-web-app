import * as constants from './constants';

const defaultState = {
    loadData: {
        showLoader: false,
        requestType: '',
        requestName: '',
        intervalLoader: false,
        requestURL: [],
        errorType: '',
    },
};

/*
 LoadingReducer gets status from action.payload and sets it in redux store
 */
export const LoadingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.SHOW_LOADING:
        return {
            ...state,
            loadData: {
                ...state.loadData,
                ...action.payload.loadData,
            }
        };
    case constants.SHOW_INTERVAL_LOADING:
        return {
            ...state,
            loadData:{
                ...state.loadData,
                ...action.payload.loadData,
            },
        };
    default:
        return state;
    }
};

export default LoadingReducer;
