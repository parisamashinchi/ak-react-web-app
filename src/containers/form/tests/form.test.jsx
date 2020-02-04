import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { intlShape } from 'react-intl';
import { createForm } from '../Form';

Enzyme.configure({ adapter: new Adapter() });

const fields = {
    username: {
        name: 'username',
        type: 'text',
        placeholder: 'form.input.email',
        class: 'form-control',
        icon: 'fa-user',
    },
    email: {
        name: 'password',
        type: 'password',
        placeholder: 'form.input.password',
        class: 'form-control',
        icon: 'fa-lock',
    },
}

const submitButton = {
    text: 'button.login',
}

const validationSchema = {
    username: 'email is required',
    password: 'password is required',
}

const initialValues = {
    username: 'got2@email.com',
    password: '12345678',
}

describe('form', () => {
    const props = {
        intl: {
            intlShape,
            formatMessage: () => {},
        },
        lang: 'fa',
        recaptcha: 'recaptcha',
        fields: fields,
        submitButton: submitButton,
        validationSchema: validationSchema,
        initialValues: initialValues,
        onSubmit: test => test,
        customSubmit: test => test,
    };
    const component = shallow(
        <createForm {...props} />,
    );
    it('should exist', () => {
        expect(component).toExist();
    });
});
