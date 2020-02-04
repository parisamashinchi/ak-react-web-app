import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Yup from 'yup';
import { createForm } from 'containers/form/Form';
import * as actions from '../actions';
import * as constants from '../constants';
import {Helmet} from 'react-helmet';
import {Statistic} from 'antd';
import {NavLink} from 'react-router-dom';

/*
 ResetPassword is a component to reset password
 */
export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        /*
         startCounter contains boolean to start counter
         */
        this.state = {
            startCounter: true,
        };
        this.form = createForm(constants.CONFIRM_CODE_FORM);
    }

    /**
     * confirmCode to handle sending confirmation code to server using confirmCode action
     * @param value contains confirmation code
     */
    confirmCode = (values) => {
        const { resetPassword, forgotPasswordData } = this.props;
        const data = {
            ...values,
            email: forgotPasswordData.email,
            phone: forgotPasswordData.phone,
        };
        resetPassword(data);
    };

    /*
     tryAgain to call signUp action to get a new code
     */
    tryAgain = () => {
        const { forgotPassword, forgotPasswordData } = this.props;
        forgotPassword(forgotPasswordData);
        this.setState({
            startCounter: true,
        });
    };

    render() {
        const { lang } = this.props;
        const Form = this.form;
        const noneRequired = this.state.startCounter ? [] : ['code', 'password', 'confirmPassword'];
        const Countdown = Statistic.Countdown;
        const deadline = Date.now() + 120000; // Moment is also OK
        return (
            <div className="form-with-header">
                <Helmet>
                    {lang === 'en'
                        ? <title>Reset Password</title>
                        : <title>بازیابی رمز عبور</title>
                    }
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=yes minimum-scale=1 maximum-scale=3"
                    />
                </Helmet>
                {this.state.startCounter
                    ? <Countdown
                        value={deadline}
                        onFinish={() => this.setState({startCounter: false})}
                        format="mm:ss"
                    />
                    : <span className="count-down">00:00</span>
                }
                <h3>
                    <FormattedMessage id="confirmCode.title" />
                </h3>
                <p>
                    <FormattedMessage id="confirmCode.text" />
                </p>
                <Form
                    submitButton={{
                        text: this.state.startCounter
                            ? 'confirmCode.form.button.done'
                            : 'confirmCode.form.button.resend',
                        class: 'btn btn-block confirm-btn',
                        submitColor: this.state.startCounter
                            ? 'blue'
                            : 'greenCreate',
                    }}
                    noneRequired={noneRequired}
                    validationSchema={Yup.object().shape({
                        confirm_code: Yup.string()
                            .required(<FormattedMessage id="form.error.required" />),
                        password: Yup.string()
                            .min(8, <FormattedMessage id="signUp.error.passwordLength" />)
                            .required(<FormattedMessage id="signUp.error.required" />)
                        ,
                        confirmPassword: Yup.string().oneOf(
                            [Yup.ref('password')],
                            'The password does not match.',
                        )
                            .required(<FormattedMessage id="signUp.error.required" />)
                    })}
                    fields={{
                        code: {
                            name: 'code',
                            label: 'form.input.placeholder.code',
                            type: 'text',
                            icon: 'fa-mobile-alt',
                        },
                        password: {
                            name: 'password',
                            label: 'signUp.password',
                            type: 'password',
                            icon: 'fa-lock',
                        },
                        confirmPassword: {
                            name: 'confirmPassword',
                            label: 'signUp.confirmPassword',
                            type: 'password',
                            icon: 'fa-check-circle',
                        },
                    }}
                    customSubmit={(values) => {
                        this.state.startCounter
                            ? this.confirmCode(values)
                            : this.tryAgain();
                    }}
                    requestType="post"
                />
            </div>
        )
    }
}

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 resetPassword is action to handle reset password request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetPassword: actions.resetPassword,
        forgotPassword: actions.forgotPassword,
    }, dispatch);
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 forgotPasswordData in redux state will show us user data for forgot password
 */
const mapStateToProps = state => ({
    lang: state.locale.lang,
    forgotPasswordData: get(state.Authentication, 'forgotPassword', {}),
});

ResetPassword.propTypes = {
    forgotPasswordData: PropTypes.oneOfType([
        PropTypes.shape({
            email: PropTypes.string.isRequired,
            phone: PropTypes.number.isRequired,
        }),
    ]).isRequired,
    resetPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
