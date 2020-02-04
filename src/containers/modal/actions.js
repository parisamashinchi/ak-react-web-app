import * as constants from './constants';

/**
showModal is an action in case of need show data in modal
@param show contains a boolean to tell show or hide modal
@param modalContent contains content that we need to show in modal
@param data contains data that we need in modal
@param footer contains data to show in case that we need footer section
 */
export const showModal = (show = false, modalContent = '', data = {}, footer = '') => ({
    type: constants.SHOW_MODAL,
    payload: {
        show,
        modalContent,
        data,
        footer,
    },
});
