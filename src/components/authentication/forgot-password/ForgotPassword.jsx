import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Row } from 'antd';
import Yup from 'yup';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { createForm } from 'containers/form/Form';
import * as actions from '../actions';
import * as constants from '../constants';
import en from '../translations/en.json';
import fa from '../translations/fa.json';

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    fa,
    en,
};

/*
 ForgotPassword is a component to show a form for forgot password
 */
export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.form = createForm(constants.FORGOT_PASSWORD_FORM);
    }

    render() {
        const { forgotPassword, lang } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        {lang === 'en'
                            ? <title>Forgot password</title>
                            : <title>فراموشی رمز عبور</title>
                        }
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=yes minimum-scale=1 maximum-scale=3"
                        />
                    </Helmet>
                    <div className="form-with-header">
                        <Row>
                            <NavLink exact to="/authentication/login" className="back-button">
                                <i className="fa fa-angle-left" />
                                <FormattedMessage id="forgotPassword.back" />
                            </NavLink>
                        </Row>
                        <h2>
                            <FormattedMessage id="forgotPassword.title" />
                        </h2>
                        <p>
                            <FormattedMessage id="forgotPassword.text" />
                        </p>
                        <Form
                            submitButton={{
                                text: 'forgotPassword.form.button.submit',
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email(<FormattedMessage id="form.error.email" />)
                                    .required(<FormattedMessage id="form.error.required" />),
                                phone: Yup.string()
                                    .required(<FormattedMessage id="form.error.required" />)
                                    .matches(/^\d+$/, <FormattedMessage id="form.error.phoneNumberOnlyNumeric" />)
                                    .min(11, <FormattedMessage id="form.error.passwordLength" />)
                            })}
                            fields={{
                                email: {
                                    name: 'email',
                                    label: 'form.input.email',
                                    type: 'text',
                                    placeholder: 'email@sample.com',
                                    icon: 'fa-user',
                                },
                                phone: {
                                    name: 'phone',
                                    label: 'form.input.phoneNumber',
                                    type: 'tel',
                                    icon: 'fa-phone',
                                    placeholder: '09*********',
                                },
                            }}
                            customSubmit={(values) => forgotPassword(values)}
                            requestType="post"
                        />
                    </div>
                </div>
            </IntlProvider>
        );
    }
}
/*
 mapStateToProps is a function that we
 use to get data from redux state
 */
const mapStateToProps = state => ({
    lang: state.locale.lang,
});
/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 forgotPassword is action to handle forgot password request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        forgotPassword: actions.forgotPassword,
    }, dispatch);
}

ForgotPassword.propTypes = {
    lang: PropTypes.string.isRequired,
    forgotPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
