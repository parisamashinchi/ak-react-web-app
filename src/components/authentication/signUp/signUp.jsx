import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {FormattedMessage, injectIntl, IntlProvider} from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Yup from 'yup';
import { alert } from 'containers/alert/Alerts';
import { createForm } from 'containers/form/Form';
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
export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.form = createForm('signUp');
    }

     handleAlert = () => {
        alert('info', 'create.comingSoon')
    };

    render() {
        const { signUp, signedData, lang } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        {lang === 'en'
                            ? <title>Create my account</title>
                            : <title>ثبت نام</title>
                        }
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=yes minimum-scale=1 maximum-scale=3"
                        />
                    </Helmet>
                    <div className="form signUp">
                        <Form
                            recaptcha={true}
                            submitButton={{
                                text: 'signUp.signUp',
                            }}
                            initialValues={{
                                email: signedData.email || '',
                                phone: signedData.phone || '',
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email(<FormattedMessage id="signUp.error.required" />)
                                    .required(<FormattedMessage id="signUp.error.required" />),
                                phone: Yup.string()
                                    .required(<FormattedMessage id="signUp.error.required" />)
                                    .matches(/^\d+$/, <FormattedMessage id="signUp.error.phoneNumberOnlyNumeric" />)
                                    .test('length', <FormattedMessage id="signUp.error.phoneNumberLength" />, (val) => {
                                        if (val) {
                                            return (val.length === 11);
                                        }
                                    }),
                            })}
                            fields={{
                                email: {
                                    name: 'email',
                                    label: 'signUp.email',
                                    type: 'text',
                                    placeholder: 'email@sample.com',
                                    icon: 'fa-user',
                                },
                                phone: {
                                    name: 'phone',
                                    label: 'signUp.phoneNumber',
                                    type: 'tel',
                                    icon: 'fa-phone',
                                    placeholder: '09*********',
                                },
                            }}
                            customSubmit={values => signUp(values)}
                            requestType="post"
                        />
                        {/*
                        <div className="or">
                            <span>
                                <FormattedMessage id="signUp.or" />
                            </span>
                        </div>
                        <Col span={24} className="images">
                            <img src={images.github} alt="github" />
                            <img src={images.gmail} alt="gmail" />
                            <img src={images.linkdin} alt="linkdin" />
                        </Col>
                        */}
                        <div className="agreement">
                            <span>
                                <FormattedMessage id="signUp.agreement" />
                            </span>
                            <a to="" onClick={this.handleAlert}>
                                <span>
                                    <FormattedMessage id="signUp.terms" />
                                </span>
                            </a>
                            <span>
                                <FormattedMessage id="signUp.and" />
                            </span>
                            <a onClick={this.handleAlert}>
                                <span>
                                    <FormattedMessage id="signUp.condition" />
                                </span>
                            </a>
                            <span>
                                <FormattedMessage id="signUp.conditionText" />
                            </span>
                        </div>
                    </div>
                </div>
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
    }, dispatch);
}

SignUp.propTypes = {
    lang: PropTypes.string.isRequired,
    signUp: PropTypes.func.isRequired,
    getCurrent: PropTypes.func.isRequired,
    signedData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SignUp));
