import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {Statistic} from 'antd';
import {FormattedMessage, injectIntl, IntlProvider} from 'react-intl';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import Yup from 'yup';
import {createForm} from 'containers/form/Form';
import AuthStyle from 'components/authentication/assets/styles/authentication.style';
import * as actions from '../actions';
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
 SignUp is a component to show sign up form to user
 */
export class ElecompConfirmCode extends Component {
    constructor(props) {
        super(props);
        this.form = createForm('signUp');
        this.state = {
            startCounter: true,
        };
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
        confirmCode(data, 'elecomp');
    };

    /*
     tryAgain to call signUp action to get a new code
     */
    tryAgain = () => {
        const {signUp, signedData} = this.props;
        signUp(signedData, 'api/auth/elecomp_register/');
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
            <IntlProvider locale={lang} messages={messages[lang]}>
                <AuthStyle>
                    <div className="elecomp">
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
                        <div className="elecomp-detail elecomp-confirm">
                            {this.state.startCounter
                                ? <Countdown
                                    value={deadline}
                                    onFinish={() => this.setState({startCounter: false})}
                                    format="mm:ss"
                                />
                                : <span className="count-down">00:00</span>
                            }
                            <h3>
                                <FormattedMessage id="confirmCode.title"/>
                            </h3>
                            <p>
                                <FormattedMessage id="confirmCode.text"/>
                            </p>
                            <div className="confirmCode-number">
                                <span>{signedData.phone ? signedData.phone : 'empty number?'}</span>
                                <NavLink to="/elecomp/sign-up">
                                    <FormattedMessage id="confirmCode.link.edit"/>
                                </NavLink>
                            </div>
                            <div className="form signUp">
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
                                    initialValues={{
                                        email: signedData.email || '',
                                        phone: signedData.phone || '',
                                        company_name: signedData.company_name || '',
                                        company_website: signedData.company_website || '',
                                    }}
                                    disableFields={['registration_code']}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string()
                                            .email(<FormattedMessage id="signUp.error.required"/>)
                                            .required(<FormattedMessage id="signUp.error.required"/>),
                                        phone: Yup.string()
                                            .required(<FormattedMessage id="signUp.error.required"/>)
                                            .matches(/^\d+$/, <FormattedMessage
                                                id="signUp.error.phoneNumberOnlyNumeric"/>)
                                            .test('length', <FormattedMessage
                                                id="signUp.error.phoneNumberLength"/>, (val) => {
                                                if (val) {
                                                    return (val.length === 11);
                                                }
                                            }),
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
                        </div>
                    </div>
                </AuthStyle>
            </IntlProvider>
        );
    }
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 resetCounterValue in redux state will show us boolean of reset counter
 */
const mapStateToProps = state => ({
    lang: state.locale.lang,
    signedData: get(state.Authentication, 'signedData', {}),
});

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 showModal is action to handle show or hide modal
 signUp is action to handle sign up request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signUp: actions.signUp,
        getCurrent: actions.getCurrent,
        confirmCode: actions.confirmCode,
    }, dispatch);
}

ElecompConfirmCode.propTypes = {
    lang: PropTypes.string.isRequired,
    signUp: PropTypes.func.isRequired,
    getCurrent: PropTypes.func.isRequired,
    signedData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ElecompConfirmCode));
