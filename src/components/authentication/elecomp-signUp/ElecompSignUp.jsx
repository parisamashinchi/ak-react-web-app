import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {FormattedMessage, injectIntl, IntlProvider} from 'react-intl';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Yup from 'yup';
import { createForm } from 'containers/form/Form';
import AuthStyle from 'components/authentication/assets/styles/authentication.style';
import CustomButton from 'components/ui-components/button/Button';
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
export class ElecompSignUp extends Component {
    constructor(props) {
        super(props);
        this.form = createForm('signUp');
    }

    render() {
        const { signUp, signedData, lang } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <AuthStyle>
                    <div className="elecomp">
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
                        <div className="elecomp-detail">
                            <p><FormattedMessage id="elecomp.title1" /></p>
                            <p><FormattedMessage id="elecomp.title2" /></p>
                            <p className="blue-title"><FormattedMessage id="elecomp.title3" /></p>
                            <div className="form signUp">
                                <Form
                                    recaptcha={true}
                                    submitButton={{
                                        text: 'signUp.signUp',
                                    }}
                                    initialValues={{
                                        email: signedData.email || '',
                                        phone: signedData.phone || '',
                                        company_name: signedData.company_name || '',
                                        company_website: signedData.company_website || '',
                                        registration_code: Math.floor(100000 + Math.random() * 900000),
                                    }}
                                    disableFields={['registration_code']}
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
                                        company_name: {
                                            name: 'company_name',
                                            label: 'signUp.companyName',
                                            type: 'text',
                                        },
                                        company_website: {
                                            name: 'company_website',
                                            label: 'signUp.companyWebsite',
                                            type: 'text',
                                        },
                                    }}
                                    customSubmit={values => signUp(values, 'api/auth/elecomp_register/')}
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
    }, dispatch);
}

ElecompSignUp.propTypes = {
    lang: PropTypes.string.isRequired,
    signUp: PropTypes.func.isRequired,
    getCurrent: PropTypes.func.isRequired,
    signedData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ElecompSignUp));
