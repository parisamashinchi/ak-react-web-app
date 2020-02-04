import React from 'react';
import expect, { spyOn } from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Authentication } from '../Authentication';

Enzyme.configure({ adapter: new Adapter() });

describe('Authentication', () => {
    const props = {
        lang: 'en',
        match: {},
        currentData: {},
        getCurrent: test => test,
        setSignUp: test => test,
    };
    const component = shallow(
        <Authentication {...props} />,
    );
    it('should exist', () => {
        expect(component).toExist();
    });
    it('should handle changePathAndPos', () => {
        const changePathAndPosSpy = spyOn(component.instance(), 'changePathAndPos');
        const signUpLink = component.find('.accountExit');
        signUpLink.simulate('click');
        expect(changePathAndPosSpy).toHaveBeenCalled();
        const loginLink = component.find('.login');
        loginLink.simulate('click');
        expect(changePathAndPosSpy).toHaveBeenCalled();
    });
});
