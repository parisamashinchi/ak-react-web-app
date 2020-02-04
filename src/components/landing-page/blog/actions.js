import * as constants from './constants';

export const getBlogs = () => ({
    type: constants.GET_BLOGS,
});

export const setBlogs = data => ({
    type: constants.SET_BLOGS,
    payload: {
        data,
    }
});
