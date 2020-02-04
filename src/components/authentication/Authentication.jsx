import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage, IntlProvider} from 'react-intl';
import {NavLink, Route, withRouter} from 'react-router-dom';
import {Layout, Row, Col} from 'antd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import CustomModal from 'containers/modal/Modal';
import * as modalActions from 'containers/modal/actions';
import AuthStyle from 'components/authentication/assets/styles/authentication.style';
import signUp from './signUp/signUp';
import Login from './login/Login';
import ResetPassword from './reset-password/ResetPassword';
import ForgotPassword from './forgot-password/ForgotPassword';
import ConfirmCode from './confirm-code/ConfirmCode';
import en from './translations/en.json';
import fa from './translations/fa.json';
import * as actions from './actions';

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    fa,
    en,
};

/*
 Authentication is a component to manage and show
 login, signUp, forgotPassword, resetPassword.
 */
export class Authentication extends Component {

    componentWillMount() {
        const {showModal} = this.props;
        showModal(false);
    };

    componentWillUnmount() {
        /*
            setSignUp makes signUp data empty
            setLocaleLoading makes full page loading off
        */
        const {setSignUp} = this.props;
        setSignUp({});
    };

    render() {
        /*
            lang gets current language
            match is props from react router
            currentData gets current height for moving shape
        */
        const {lang, match, currentData} = this.props;
        const path = this.props.match.path;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <AuthStyle>
                    <CustomModal/>
                    <Layout>
                        <Row>
                            <Col span={24}>
                                <Col
                                    xs={0}
                                    md={{span: 12}}
                                    className="left"
                                >
                                    <NavLink exact to="/" className="home-button">
                                        <i className="fa fa-angle-left"/>
                                        <FormattedMessage id="signUp.home"/>
                                    </NavLink>
                                    <div className="description">
                                        <h1><FormattedMessage id="signUp.header"/></h1>
                                    </div>
                                    <div className="login-status">
                                        <div className="accountExit"
                                             onClick={() => this.changePathAndPos('sign-up')}>
                                            <FormattedMessage id="signUp.accountExit"/>
                                        </div>
                                        <div className="login"
                                             onClick={() => this.changePathAndPos('login')}>
                                            <FormattedMessage id="signUp.login"/>
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    xs={24}
                                    md={{span: 12}}
                                    className="right"
                                >
                                    {
                                        this.state.mobile &&
                                        <NavLink exact to="/" className="home-button">
                                            <i className="fa fa-angle-left"/>
                                            <FormattedMessage id="signUp.home"/>
                                        </NavLink>
                                    }
                                    <div className="logo-type">
                                        <img src={logoType} alt="logo-type"/>
                                        <p>Cloud Computing</p>
                                    </div>
                                    <div style={{top: currentData.itemHeight - 18}}>
                                        <img src={halfCircle} className="half-circle"/>
                                    </div>
                                    <Route
                                        path={`${match.path}/sign-up`}
                                        component={signUp}
                                    />
                                    <Route
                                        path={`${match.path}/login`}
                                        component={Login}
                                    />
                                    <Route
                                        path={`${match.path}/reset-password`}
                                        component={ResetPassword}
                                    />
                                    <Route
                                        path={`${match.path}/forgot-password`}
                                        component={ForgotPassword}
                                    />
                                    <Route
                                        path={`${match.path}/confirm-code`}
                                        component={ConfirmCode}
                                    />
                                    {
                                        this.state.mobile &&
                                        <div>
                                            <NavLink
                                                to={currentData.state === 'login' ? `${path}/sign-up` : `${path}/login`}
                                                className="mobile-link"
                                            >
                                                {
                                                    currentData.state === 'login'
                                                        ? <FormattedMessage
                                                            id="signUp.accountExit"/>
                                                        : <FormattedMessage
                                                            id="signUp.login"/>
                                                }
                                            </NavLink>
                                        </div>
                                    }
                                </Col>
                            </Col>
                        </Row>
                    </Layout>
                    {/*}*/}
                </AuthStyle>
            </IntlProvider>
        );
    }
};

/*
 mapStateToProps is a function that we
 use to get data from redux state
 lang in redux state will show us selected language
 */
const mapStateToProps = state => ({
    lang: state.locale.lang,
    currentData: get(state.Authentication, 'currentData', {}),
});

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 login is action to handle login request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCurrent: actions.getCurrent,
        setSignUp: actions.setSignUp,
        showModal: modalActions.showModal,
    }, dispatch);
}

Authentication.propTypes = {
    lang: PropTypes.string.isRequired,
    match: PropTypes.oneOfType([
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }),
    ]).isRequired,
    getCurrent: PropTypes.func.isRequired,
    setSignUp: PropTypes.func.isRequired,
    currentData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authentication));
