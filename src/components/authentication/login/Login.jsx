import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
import Yup from 'yup';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
 LoginComponent is a component to show login form
 */
export class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.form = createForm(constants.LOGIN_FORM);
    }

    render() {
        const { loginAction, lang } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        {lang === 'en'
                            ? <title>Login</title>
                            : <title>ورود</title>
                        }
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=yes minimum-scale=1 maximum-scale=3"
                        />
                    </Helmet>
                    <div className="form">
                        <Form
                            submitButton={{
                                text: 'button.login',
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                    .email(<FormattedMessage id="form.error.email" />)
                                    .required(<FormattedMessage id="form.error.required" />),
                                password: Yup.string()
                                    .min(8, <FormattedMessage id="form.error.passwordLength" />)
                                    .required(<FormattedMessage id="form.error.required" />),
                            })}
                            fields={{
                                username: {
                                    name: 'username',
                                    label: 'form.input.email',
                                    type: 'text',
                                    placeholder: 'email@sample.com',
                                    class: 'form-control',
                                    icon: 'fa-user',
                                },
                                password: {
                                    name: 'password',
                                    label: 'form.input.password',
                                    type: 'password',
                                    class: 'form-control',
                                    icon: 'fa-lock',
                                },
                            }}
                            customSubmit={values => loginAction(values)}
                            requestType="post"
                        />
                        <div className="login-options">
                           {/* <Checkbox>
                                <FormattedMessage id="signUp.remember" />
                            </Checkbox>*/}
                            <NavLink to="forgot-password">
                                <FormattedMessage id="login.button.forgotPassword" />
                            </NavLink>
                        </div>
                        {/*
                        <div className="or">
                            <span><FormattedMessage id="signUp.or" /></span>
                        </div>
                        <Col span={24} className="images">
                            <img src={images.github} alt="github" />
                            <img src={images.gmail} alt="gmail" />
                            <img src={images.linkdin} alt="linkdin" />
                        </Col>
                        */}
                    </div>
                </div>
            </IntlProvider>
        );
    }
};

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
 login is action to handle login request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginAction: actions.login,
        getCurrent: actions.getCurrent,
    }, dispatch);
}

LoginComponent.propTypes = {
    lang: PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired,
    getCurrent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
