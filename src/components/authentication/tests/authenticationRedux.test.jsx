import React from 'react';
import expect from 'expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthReducer from '../reducer';
import * as actions from '../actions';
import * as actionTypes from '../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('actions', () => {
    it('create get current action', () => {
        const currentData = {
            name: 'test',
            phone: 13221322227,
        };
        const expectedAction = {
            type: actionTypes.GET_CURRENT,
            payload: {
                currentData,
            },
        };
        expect(actions.getCurrent(currentData)).toEqual(expectedAction);
    });
    it('create is authentication action', () => {
        const isAuth = true;
        const expectedAction = {
            type: actionTypes.IS_AUTHENTICATED,
            payload: {
                isAuth,
            },
        };
        expect(actions.isAuthenticated(isAuth)).toEqual(expectedAction);
    });
    it('create save token action', () => {
        const token = 13221322227;
        const expectedAction = {
            type: actionTypes.SAVE_TOKEN,
            payload: {
                token,
            },
        };
        expect(actions.saveToken(token)).toEqual(expectedAction);
    });
    it('create forgot password action', () => {
        const data = {
            email: 'test@test.com',
            phone: 13221322227,
        };
        const expectedAction = {
            type: actionTypes.FORGOT_PASSWORD,
            payload: {
                data,
            },
        };
        expect(actions.forgotPassword(data)).toEqual(expectedAction);
    });
    it('should create set forgot password action', () => {
        const data = {
            email: 'test@test.com',
            phone: 13221322227,
        };
        const expectedAction = {
            type: actionTypes.SET_FORGOT_PASSWORD,
            payload: {
                data,
            },
        };
        expect(actions.setForgotPassword(data)).toEqual(expectedAction);
    });
    it('should create log out user action', () => {
        const expectedAction = {
            type: actionTypes.LOGOUT_USER,
        };
        expect(actions.logoutUser()).toEqual(expectedAction);
    });
    it('should create set log out user action', () => {
        const expectedAction = {
            type: actionTypes.SET_LOGOUT_USER,
        };
        expect(actions.setLogOutUser()).toEqual(expectedAction);
    });
    it('should create login user action', () => {
        const data = {
            email: 'test@test.com',
            phone: 13221322227,
            password: 'password',
        };
        const expectedAction = {
            type: actionTypes.LOGIN_USER,
            payload: {
                data,
            },
        };
        expect(actions.login(data)).toEqual(expectedAction);
    });
    it('should create reset counter action', () => {
        const value = true;
        const expectedAction = {
            type: actionTypes.RESET_COUNTER,
            payload: {
                value,
            },
        };
        expect(actions.resetCounter(value)).toEqual(expectedAction);
    });
    it('should create reset password action', () => {
        const data = {
            email: 'string',
            phone: 'string',
            password: 'string',
            code: 'string',
        };
        const expectedAction = {
            type: actionTypes.RESET_PASSWORD,
            payload: {
                data,
            },
        };
        expect(actions.resetPassword(data)).toEqual(expectedAction);
    });
    it('should create sign up action', () => {
        const data = {
            email: 'string',
            phone: 'string',
            password: 'string',
        };
        const expectedAction = {
            type: actionTypes.SIGN_UP,
            payload: {
                data,
            },
        };
        expect(actions.signUp(data)).toEqual(expectedAction);
    });
    it('should create set sign up action', () => {
        const data = {
            email: 'string',
            phone: 'string',
            password: 'string',
        };
        const expectedAction = {
            type: actionTypes.SET_SIGN_UP,
            payload: {
                data,
            },
        };
        expect(actions.setSignUp(data)).toEqual(expectedAction);
    });
    it('should create confirm code action', () => {
        const data = {
            confirm_code: 'string',
            email: 'string',
            phone: 'string',
        };
        const expectedAction = {
            type: actionTypes.CONFIRM_CODE,
            payload: {
                data,
            },
        };
        expect(actions.confirmCode(data)).toEqual(expectedAction);
    });
});

describe('authentication reducer', () => {
    it('should exist', () => {
        expect(AuthReducer([], {})).toExist();
    });
    it('should return the initial state', () => {
        expect(AuthReducer(undefined, {})).toEqual({
            isAuth: false,
            token: '',
            forgotPassword: {},
            resetCounter: true,
            currentData: {
                state: '',
                itemHeight: 0,
            },
            signedData: {},
        });
    });
    it('should handle IS_AUTHENTICATED', () => {
        expect(
            AuthReducer({}, {
                type: actionTypes.IS_AUTHENTICATED,
                payload: {
                    isAuth: true,
                },
            }),
        ).toEqual({
            isAuth: true,
        });
    });
    it('should handle SET_FORGOT_PASSWORD', () => {
        const data = {
            email: 'test@test.com',
            phone: 13221322227,
        };
        expect(
            AuthReducer({}, {
                type: actionTypes.SET_FORGOT_PASSWORD,
                payload: {
                    data,
                },
            }),
        ).toEqual({
            forgotPassword: {
                email: 'test@test.com',
                phone: 13221322227,
            },
        });
    });
    it('should handle SAVE_TOKEN', () => {
        const token = 13221322227;
        expect(
            AuthReducer({}, {
                type: actionTypes.SAVE_TOKEN,
                payload: {
                    token,
                },
            }),
        ).toEqual({
            token: 13221322227,
        });
    });
    it('should handle RESET_COUNTER', () => {
        const value = true;
        expect(
            AuthReducer({}, {
                type: actionTypes.RESET_COUNTER,
                payload: {
                    value,
                },
            }),
        ).toEqual({
            resetCounter: true,
        });
    });
    it('should handle GET_CURRENT', () => {
        const currentData = {
            name: 'test',
            phone: 13221322227,
        };
        expect(
            AuthReducer({}, {
                type: actionTypes.GET_CURRENT,
                payload: {
                    currentData,
                },
            }),
        ).toEqual({
            currentData: {
                name: 'test',
                phone: 13221322227,
            },
        });
    });
    it('should handle SET_SIGN_UP', () => {
        const data = {
            email: 'string',
            phone: 'string',
            password: 'string',
        };
        expect(
            AuthReducer({}, {
                type: actionTypes.SET_SIGN_UP,
                payload: {
                    data,
                },
            }),
        ).toEqual({
            signedData: {
                email: 'string',
                phone: 'string',
                password: 'string',
            },
        });
    });
});
