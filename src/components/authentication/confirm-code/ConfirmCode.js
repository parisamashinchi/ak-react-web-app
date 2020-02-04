import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Statistic } from 'antd';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Yup from 'yup';
import { createForm } from 'containers/form/Form';
import * as actions from '../actions';
import * as constants from '../constants';

/*
 ConfirmCode is a component to show user form of confirmation code
 */
export class ConfirmCode extends Component {
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
        const { confirmCode, signedData } = this.props;
        const data = {
            ...values,
            email: signedData.email,
            phone: signedData.phone,
        };
        confirmCode(data);
    };

    /*
     tryAgain to call signUp action to get a new code
     */
    tryAgain = () => {
        const { signUp, signedData } = this.props;
        signUp(signedData);
        this.setState({
            startCounter: true,
        });
    };

    render() {
        const { signedData, lang } = this.props;
        const Form = this.form;
        const noneRequired = this.state.startCounter ? [] : ['confirm_code', 'password', 'confirmPassword'];
        const Countdown = Statistic.Countdown;
        const deadline = Date.now() + 120000; // Moment is also OK
        return (
            <div className="form-with-header">
                <Helmet>
                    {lang === 'en'
                        ? <title>Confirm Code</title>
                        : <title>تایید کد</title>
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
                <div className="confirmCode-number">
                    <span>{signedData.phone ? signedData.phone : 'empty number?'}</span>
                    <NavLink to="sign-up">
                        <FormattedMessage id="confirmCode.link.edit" />
                    </NavLink>
                </div>
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
                        confirm_code: {
                            name: 'confirm_code',
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
};

/*
 mapStateToProps is a function that we
 use to get data from redux state
 forgotPasswordData in redux state will show us user data for forgot password
 resetCounterValue in redux state will show us boolean of reset counter
 */
const mapStateToProps = state => ({
    signedData: get(state.Authentication, 'signedData', {}),
    lang: state.locale.lang,
});

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 showModal is action to handle show or hide modal
 confirmCode is action to send confirmation code to server
 signUp is action to handle sign up request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        confirmCode: actions.confirmCode,
        signUp: actions.signUp,
    }, dispatch);
};

ConfirmCode.propTypes = {
    signedData: PropTypes.objectOf(PropTypes.string).isRequired,
    confirmCode: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ConfirmCode));
