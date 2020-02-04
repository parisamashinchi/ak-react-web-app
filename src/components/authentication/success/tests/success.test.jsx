import React from 'react';
import expect, {spyOn} from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Success } from '../Success';

Enzyme.configure({ adapter: new Adapter() });

describe('success', () => {
    it('should exist', () => {
        const props = {
            lang: 'en',
        };
        const component = shallow(
            <Success {...props} />,
        );
        expect(component).toExist();
        const redirectSpy = spyOn(component.instance(), 'redirect');
        const button = component.find('#redirect-button');
        button.simulate('click');
        expect(redirectSpy).toHaveBeenCalled();
    });
});
