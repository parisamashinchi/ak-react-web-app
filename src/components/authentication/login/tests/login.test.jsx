import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginComponent } from '../Login';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginComponent', () => {
    it('should exist', () => {
        const props = {
            login: test => test,
            getCurrent: test => test,
        };
        const component = shallow(
            <LoginComponent {...props} />,
        );
        expect(component).toExist();
    });
});
