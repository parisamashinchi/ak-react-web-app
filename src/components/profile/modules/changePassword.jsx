import React, { Component } from 'react';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Yup from "yup";
import {Col} from 'antd';
import { Helmet } from 'react-helmet';
import { createForm } from 'containers/form/Form';
import * as constants from '../constants';
import * as actions from '../actions';
import ProfileStyle from '../assets/styles/profile.style';
import fa from '../translations/fa';
import en from '../translations/en';

// messages is getting fa and en json files in case of using translation
const messages = {
    fa,
    en,
};

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.form = createForm(constants.CHANGE_PASSWORD);
    };

    //onChangePassword is a function to post password to the server
    onChangePassword = (formData) =>{
        const { changePassword } = this.props;
        const data ={
            old_password: formData.old_password,
            new_password: formData.new_password,
        };
        changePassword(data);
    };
    render() {
        const { lang } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <ProfileStyle>
                    <Helmet>
                        <title>Change password</title>
                    </Helmet>
                    <Col xs={{ span: 24}}
                         lg = {{ span: 6 }}
                         xxl={{ span: 5 }} className="change-pass">
                        <h2>
                            <FormattedMessage id="changePassword.title" />
                        </h2>
                        <p>
                            <FormattedMessage id="changePassword.text" />
                        </p>
                        <Form
                            submitButton={{
                                text: 'profile.confirm',
                                submitColor: 'blue',
                                customClass: 'btn reset-pass-submit-btn',
                            }}
                            validationSchema={Yup.object().shape({
                                old_password: Yup.string()
                                    .min(8, <FormattedMessage id="form.error.passwordLength" />)
                                    .required(<FormattedMessage id="form.error.required" />),
                                new_password: Yup.string()
                                    .min(8, <FormattedMessage id="form.error.passwordLength" />)
                                    .required(<FormattedMessage id="form.error.required" />),
                                confirm_password: Yup.string().oneOf(
                                    [Yup.ref('new_password')],
                                    'The password does not match.',
                                )
                            })}
                            fields={{
                                old_password: {
                                    name: 'old_password',
                                    type: 'password',
                                    label: 'changePassword.current',
                                },
                                new_password: {
                                    name: 'new_password',
                                    type: 'password',
                                    label: 'changePassword.password',
                                },
                                confirm_password: {
                                    name: 'confirm_password',
                                    type: 'password',
                                    label: 'changePassword.confirm',
                                },
                            }}
                            requestType="post"
                            customSubmit={(values) => this.onChangePassword(values)}
                        />
                    </Col>
                </ProfileStyle>
            </IntlProvider>
        );
    }
}
/*
$couponItem give a payment amount and coupon amount
 */
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
    };
};
/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePassword: actions.changePassword,
    }, dispatch);
}

ChangePassword.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
