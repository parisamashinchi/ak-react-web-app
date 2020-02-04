import * as constants from './constants';

const defaultState = {
    show: false,
    modalContent: '',
    data: {},
    footer: '',
};

/*
Modal is reducer to set data of modal content and show or hide boolean to redux store
 */

const Modal = (state = defaultState, action) => {
    switch (action.type) {
    case constants.SHOW_MODAL:
        return {
            show: action.payload.show,
            modalContent: action.payload.modalContent,
            data: action.payload.data,
            footer: action.payload.footer,
        };
    default:
        return state;
    }
};

export default Modal;
