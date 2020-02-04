import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { InlineLoader } from '../InlineLoader';
import { FullPageLoader } from '../FullPageLoader';
import LoadingReducer from '../reducer';
import * as actions from '../actions';
import * as actionTypes from '../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('Inline Loader', () => {
    const props = {
        loading: true,
        type: 'spin',
        color: 'blue',
        loaderClass: 'react-loading',
        showoverlay: false,
    };
    const component = shallow(
        <InlineLoader {...props} />,
    );
    it('should exist', () => {
        expect(component).toExist();
    });
});

describe('FullPage Loader', () => {
    const props = {
        loading: true,
        type: 'spin',
        color: 'blue',
        loaderClass: 'react-loading',
    };
    const component = shallow(
        <FullPageLoader {...props} />,
    );
    it('should exist', () => {
        expect(component).toExist();
    });
});

describe('actions', () => {
    it('should create show loading component', () => {
        const show = 'true';
        const expectedAction = {
            type: actionTypes.SHOW_LOADING_COMPONENT,
            payload: {
                show,
            },
        };
        expect(actions.showLoading(show)).toEqual(expectedAction);
    });
});

describe('loading reducer', () => {
    it('should exist', () => {
        expect(LoadingReducer([], {})).toExist();
    });
    it('should return the initial state', () => {
        expect(LoadingReducer(undefined, {})).toEqual({ showLoader: false });
    });
    it('should handle SHOW_LOADING_COMPONENT', () => {
        expect(
            LoadingReducer([], {
                type: actionTypes.SHOW_LOADING_COMPONENT,
                payload: { show: true },
            }),
        ).toEqual({ showLoader: true });
    });
});
