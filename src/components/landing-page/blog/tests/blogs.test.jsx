import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { blog } from '../Blog';

Enzyme.configure({ adapter: new Adapter() });

describe('blogs', () => {
    it('should exist', () => {
        const props = {
            lang: 'fa',
        };
        const component = shallow(
            <blog {...props} />,
        );
        expect(component).toExist();
    });
});
