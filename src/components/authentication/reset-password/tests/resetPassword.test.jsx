import React from 'react';
import expect, { spyOn } from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ResetPassword } from '../ResetPassword';

Enzyme.configure({ adapter: new Adapter() });

describe('ResetPassword', () => {
    it('should exist', () => {
        const props = {
            forgotPasswordData: { email: '', phone: '' },
            resetCounterValue: false,
            forgotPassword: test => test,
            resetCounter: test => test,
            resetPassword: test => test,
        };
        const component = shallow(
            <ResetPassword {...props} />,
        );
        expect(component).toExist();
    });
});
