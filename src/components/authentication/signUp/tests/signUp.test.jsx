import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { intlShape } from 'react-intl';
import { SignUp } from '../signUp';

Enzyme.configure({ adapter: new Adapter() });

describe('SignUp', () => {
    it('should exist', () => {
        const props = {
            intl: {
                intlShape,
            },
            signUp: test => test,
            getCurrent: test => test,
        };
        const component = shallow(
            <SignUp {...props} />,
        );
        expect(component).toExist();
    });
});
