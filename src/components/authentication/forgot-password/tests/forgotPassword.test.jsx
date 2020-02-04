import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ForgotPassword } from '../ForgotPassword';

Enzyme.configure({ adapter: new Adapter() });

describe('ForgotPassword', () => {
    it('should exist', () => {
        const props = {
            forgotPassword: test => test,
        };
        const component = shallow(
            <ForgotPassword {...props} />,
        );
        expect(component).toExist();
    });
});
