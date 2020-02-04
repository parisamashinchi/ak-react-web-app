import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { history } from 'src/routers/AppRouter';
import AuthStyle from 'components/authentication/assets/styles/authentication.style';
import halfCircle from 'components/authentication/assets/images/halfCircle.png';
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
 SignUp is a component to show sign up form to user
 */
export class AuthenticationPurple extends Component {

    componentDidMount(){
        document.querySelector('.accountExit').classList.add('ready');
        document.querySelector('.login').classList.add('disabled');
    }
    changePathAndPos = (value) => {
        const { getCurrent, currentData } = this.props;
        const path = this.props.match.path;
        if(value !== currentData.state) {
            if(value === 'login') {
                history.push(`${path}/login`);
                setTimeout(()=> {
                    document.querySelector('.login').classList.add("disabled");
                    document.querySelector('.login').classList.remove("ready");
                    document.querySelector('.accountExit').classList.remove("disabled");
                    document.querySelector('.accountExit').classList.add('ready');
                }, 200);
            } else if (value === 'sign-up') {
                history.push(`${path}/sign-up`);
                setTimeout(()=> {
                    document.querySelector('.accountExit').classList.add("disabled");
                    document.querySelector('.accountExit').classList.remove("ready");
                    document.querySelector('.login').classList.remove("disabled");
                    document.querySelector('.login').classList.add('ready');
                }, 200);
            }
            const currentData = {
                state: value,
                itemHeight: value === 'login'
                    ? document.querySelector('.login').getBoundingClientRect().top
                    : document.querySelector('.accountExit').getBoundingClientRect().top,
            };
            setTimeout(getCurrent(currentData), 1000);
        }
    };

    render() {
        const { lang, match, currentData } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <AuthStyle>
                        <Layout>
                            <Row>
                                <div className="background" >
                                    <Col  span={20} >
                                        <Col span={12} className="left">
                                        <NavLink exact to="/" className="back-button">
                                            <i className="fa fa-angle-left"/>
                                            <FormattedMessage id="signUp.home"/>
                                        </NavLink>
                                        <div className="description">
                                            <h1><FormattedMessage id="signUp.header"/></h1>
                                            <p><FormattedMessage id="signUp.description1"/></p>
                                            <p><FormattedMessage id="signUp.description2"/></p>
                                        </div>
                                        <div className="login-status">
                                            <div className="accountExit"  onClick={() => this.changePathAndPos('sign-up')}>
                                                <FormattedMessage id="signUp.accountExit"/>
                                            </div>
                                            <div className="login"  onClick={() => this.changePathAndPos('login')}>
                                                <FormattedMessage id="signUp.login" />
                                            </div>
                                        </div>
                                    </Col>

                                        <Col span={12} className="right">
                                                <div style={{top: currentData.itemHeight - 100}}>
                                                    <img src={halfCircle} className="half-circle"  />
                                                    <i className="fa fa-angle-right"  />
                                                </div>
                                                    <Route path={`${match.path}/sign-up`} component={signUp}/>
                                                    <Route path={`${match.path}/login`} component={Login}/>
                                                    <Route path={`${match.path}/reset-password`} component={ResetPassword}/>
                                                    <Route path={`${match.path}/forgot-password`} component={ForgotPassword}/>
                                                    <Route path={`${match.path}/confirm-code`} component={ConfirmCode}/>

                                        </Col>
                                    </Col>
                                    <Col span={24} >
                                        <p className="copyRight">  <FormattedMessage id="signUp.copyRight"/></p>
                                    </Col>
                                </div>
                            </Row>
                        </Layout>
                    </AuthStyle>
                </div>
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
    }, dispatch);
}

AuthenticationPurple.propTypes = {
    lang: PropTypes.string.isRequired,
    match: PropTypes.oneOfType([
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }),
    ]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthenticationPurple));
