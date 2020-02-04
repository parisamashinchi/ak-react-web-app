import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { footer } from '../footer';
import { newsletter } from '../newsletter';

Enzyme.configure({ adapter: new Adapter() });

describe('footer', () => {
    it('should exist', () => {
        const props = {
            lang: 'fa',
        };
        const component = shallow(
            <footer {...props} />,
        );
        expect(component).toExist();
    });
});

describe('newsletter', () => {
    it('should exist', () => {
        const props = {
            intl: 'fa',
        };
        const component = shallow(
            <newsletter {...props} />,
        );
        expect(component).toExist();
    });
});
