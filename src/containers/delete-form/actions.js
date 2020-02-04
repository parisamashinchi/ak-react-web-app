import * as constants from './constants';

// action for call saga to handle delete
export const deleteAction = data => ({
    type: constants.DELETE_ACTION,
    payload: {
        data,
    },
});
