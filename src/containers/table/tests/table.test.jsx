import React from 'react';
import expect, { spyOn } from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import volumes from 'components/volumes/assets/images/volumes.png';
import { createTable } from '../Table';
import * as actionTypes from '../constants';
import * as actions from '../actions';
import TableReducer from '../reducer';

Enzyme.configure({ adapter: new Adapter() });
const sampleColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
]
describe('Table', () => {
    it('should exist', () => {
        const props = {
            name: 'name',
            columns: sampleColumns,
            headerButton: 'button text',
            header: 'header title',
            desc: 'desc text',
            image: volumes,
            click: test => test,
        };
        const component = shallow(
            <createTable {...props} />,
        );
        expect(component).toExist();
        it('should get header', () => {
            const h1 = component.find('h1');
            expect(h1).toHaveText('header title');
        });
        it('should get desc', () => {
            const h2 = component.find('h2');
            expect(h2).toHaveText('desc text');
        });
        it('should get header', () => {
            const image = component.find('img');
            expect(image).toEqual('<img  src={volumes} alt={header} />');
        });
    });
});

describe('actions', () => {
    it('create fetch data action', () => {
        const name = 'test';
        const data = [{ id: 1 }];
        const expectedAction = {
            type: actionTypes.FETCH_TABLE,
            payload: {
                name,
                data,
            },
        };
        expect(actions.fetchTable(name, data)).toEqual(expectedAction);
    });
    it('create get data action', () => {
        const name = 'test';
        const url = 'test';
        const expectedAction = {
            type: actionTypes.GET_DATA,
            payload: {
                name,
                url,
            },
        };
        expect(actions.getData(name, url)).toEqual(expectedAction);
    });
});

describe('table reducer', () => {
    it('should exist', () => {
        expect(TableReducer([], {})).toExist();
    });
    it('should return the initial state', () => {
        expect(TableReducer(undefined, {})).toEqual({});
    });
    it('should handle FETCH_TABLE', () => {
        const name = 'test';
        const data = [{ id: 1 }];
        expect(
            TableReducer([], {
                type: actionTypes.FETCH_TABLE,
                payload: {
                    name,
                    data,
                },
            }),
        ).toEqual({
            [name]: data,
        });
    });
});
