import React from 'react';
import expect, { spyOn } from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ConfirmCode } from '../ConfirmCode';

Enzyme.configure({ adapter: new Adapter() });

describe('confirmCode', () => {
    it('should exist', () => {
        const props = {
            signedData: {},
            confirmCode: test => test,
            signUp: test => test,
        };
        const state = {
            startCounter: true,
        };
        const component = shallow(
            <ConfirmCode {...props} {...state} />,
        );
        expect(component).toExist();
    });
    it('should handle confirm code', () => {
        const props = {
            signedData: {},
            confirmCode: test => test,
            signUp: test => test,
        };
        const state = {
            startCounter: true,
        };
        const component = shallow(
            <ConfirmCode {...props} {...state} />,
        );
        const confirmCodeSpy = spyOn(component.instance(), 'confirmCode');
        const button = component.find('#form-submit-button');
        expect(button.text).toEqual('Done');
        button.simulate('click');
        expect(confirmCodeSpy).toHaveBeenCalled();
    });
    it('should handle try again', () => {
        const props = {
            signedData: {},
            confirmCode: test => test,
            signUp: test => test,
        };
        const state = {
            startCounter: false,
        };
        const component = shallow(
            <ConfirmCode {...props} {...state} />,
        );
        const tryAgainSpy = spyOn(component.instance(), 'tryAgain');
        const button = component.find('#form-submit-button');
        expect(button.text).toEqual('Resend');
        button.simulate('click');
        expect(tryAgainSpy).toHaveBeenCalled();
    });
});
