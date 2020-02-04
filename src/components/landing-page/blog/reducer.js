import * as constants from './constants';

const defaultState = {
    blog: [],
};

/*
BlogReducer sets all given data in redux
 */
const BlogReducer = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SET_BLOGS:
        return {
            blog: action.payload.data,
        };
    default:
        return state;
    }
};

export default BlogReducer;
