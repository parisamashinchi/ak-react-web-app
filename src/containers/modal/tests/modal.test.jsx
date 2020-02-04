import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CustomModal } from '../Modal';
import Modal from '../reducer';
import * as actions from '../actions';
import * as actionTypes from '../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('modal', () => {
    const props = {
        modalShowed: true,
        modalContent: <div>Empty</div>,
        showModal: test => test,
        relatedData: {},
        lang: 'en',
    };
    const component = shallow(
        <CustomModal {...props} />,
    );
    it('should exist', () => {
        expect(component).toExist();
    });
});

describe('actions', () => {
    it('should create show Modal component', () => {
        const show = 'true';
        const modalContent = <div>Empty</div>;
        const data = {};
        const footer = null;
        const expectedAction = {
            type: actionTypes.SHOW_MODAL,
            payload: {
                show,
                modalContent,
                data,
                footer,
            },
        };
        expect(actions.showModal(show, modalContent, data)).toEqual(expectedAction);
    });
});

describe('modal reducer', () => {
    it('should exist', () => {
        expect(Modal([], {})).toExist();
    });
    it('should return the initial state', () => {
        expect(Modal(undefined, {})).toEqual(
            {
                show: false,
                modalContent: '',
                data: {},
                footer: null,
            },
        );
    });
    it('should handle SHOW_MODAL equal to false', () => {
        expect(
            Modal([], {
                type: actionTypes.SHOW_MODAL,
                payload: {
                    show: false,
                    modalContent: <div>Empty</div>,
                    data: {},
                    footer: null,
                },
            }),
        ).toEqual(
            {
                show: false,
                modalContent: <div>Empty</div>,
                data: {},
                footer: null,
            },
        );
    });

    it('should handle SHOW_MODAL equal to true', () => {
        expect(
            Modal([], {
                type: actionTypes.SHOW_MODAL,
                payload: {
                    show: true,
                    modalContent: <div>Empty</div>,
                    data: {},
                    footer: null,
                },
            }),
        ).toEqual(
            {
                show: true,
                modalContent: <div>Empty</div>,
                data: {},
                footer: null,
            },
        );
    });
});