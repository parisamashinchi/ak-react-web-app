import React, {Component} from 'react';
import {connect} from "react-redux";
import {injectIntl, intlShape} from 'react-intl';
import {NavLink} from 'react-router-dom';
import {Menu, Row, Col, Icon, Dropdown, Button} from 'antd';
import {bindActionCreators} from 'redux';
import split from 'lodash/split';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {history} from 'src/routers/AppRouter';
import {alert} from 'containers/alert/Alerts';
import LanguageSwitcher from 'containers/language/LanguageSwitcher';
import * as languageActions from 'containers/language/actions';
import CustomButton from 'components/ui-components/button/Button';
import * as authActions from 'components/authentication/actions';
import NavStyle from './assets/styles/navBar.style';

export class NavBar extends Component {
    constructor(props) {
        super(props);
        // to hold scroll size
        this.state = {
            lastPosition: '',
            current: 'services',
            collapsed: false,
        }
    }

    // to remove event listener
    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateNav);
    }

    sendToDashboard = () => {
        const {setLocale} = this.props;
        setLocale('en');
        setTimeout(() => window.location.replace('/compute/virtual-machines/list'), 250);
    };

    // to set scroll size into state
    updateNav = () => {
        const {FAQ, planet} = this.props;
        this.setState({
            lastPosition: window.scrollY,
        });
    };

    logOut = () => {
        const {logoutUser} = this.props;
        logoutUser();
    };
    toggleCollapsed = () => {
        if (this.state.collapsed === false) {
            document.querySelector('.ant-menu').style.display = 'block';
        } else {
            document.querySelector('.ant-menu').style.display = 'none';
        }
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const {
            isAuth,
            userData,
            intl,
            FAQ = false,
            planet = false,
            userProject,
        } = this.props;
        const dropDownMenu = (
            <Menu>
                <Menu.Item key="0">
                    <NavLink to="/profile/Information">
                        <Icon type="user"/>
                        {intl.formatMessage({id: 'publicHeader.profile'})}
                    </NavLink>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="1">
                    <NavLink to="/profile/change-password">
                        <Icon type="lock"/>
                        {intl.formatMessage({id: 'publicHeader.changePassword'})}
                    </NavLink>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="2" onClick={this.logOut}>
                    <NavLink to="/">
                        <Icon type="logout"/>
                        {intl.formatMessage({id: 'publicHeader.logOut'})}
                    </NavLink>
                </Menu.Item>
            </Menu>
        );
        const imageName = get(userProject, 'zone.image_name', 'flare.png');
        const userName = split(userData.name, ' ');
        const shortUserName = split(userName[0], '', [5]);
        return (
            <NavStyle>
                <Row className={this.state.lastPosition > 50 ? "scroll-nav" : ""}>
                    <Col
                        xs={{span: 4}}
                        xxl={{span: 3}}
                    >
                        <NavLink activeClassName="active-public-navbar-link" exact to="/"
                                 className="nav-link">

                        </NavLink>
                    </Col>
                    <Col
                        className="button-section"
                        xs={{span: 20}}
                        xxl={{span: 21}}
                    >
                        <Button className="collapse-btn" type="primary"
                                onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                        </Button>
                        <Menu
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            inlineCollapsed={this.state.collapsed}
                        >
                            {
                                isAuth
                                    ?
                                    <Menu.Item className="log-section only-full-page">
                                        <Dropdown overlay={dropDownMenu} trigger={['click']}>
                                            <a className="ant-dropdown-link" href="nothing">
                                                        <span className="hi-text">
                                                            {intl.formatMessage({id: 'publicHeader.hi'})}
                                                        </span>
                                                <span className="user-name">
                                                            {shortUserName || ''}
                                                        </span>
                                                <img
                                                    className="avatar-image"
                                                    src={require('./assets/images/' + imageName)}
                                                    alt="user-zone"
                                                    width={40}
                                                    height={40}
                                                />
                                            </a>
                                        </Dropdown>
                                    </Menu.Item>
                                    : <Menu.Item className="log-section">
                                        <NavLink to="authentication/sign-up">
                                            <CustomButton fullWidth={true}>
                                                {intl.formatMessage({id: 'publicHeader.navbar.signUp'})}
                                            </CustomButton>
                                        </NavLink>
                                    </Menu.Item>
                            }
                            {
                                isAuth
                                    ? <Menu.Item className="log-section only-full-page">
                                        <a onClick={this.sendToDashboard}>
                                            {intl.formatMessage({id: 'publicHeader.dashboard'})}
                                        </a>
                                    </Menu.Item>
                                    : <Menu.Item className="log-section">
                                        <a href="authentication/login">
                                            {intl.formatMessage({id: 'publicHeader.navbar.login'})}
                                        </a>
                                    </Menu.Item>
                            }
                        </Menu>
                    </Col>
                </Row>
            </NavStyle>
        );
    }
}

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 login is action to handle login request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logoutUser: authActions.logoutUser,
        setLocale: languageActions.setLocale,
    }, dispatch);
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 */
const mapStateToProps = (state) => {
    return {
        isAuth: get(state.Authentication, 'isAuth', false),
        userData: get(state.Authentication, 'userData', {}),
        userProject: get(state.WalletReducer, 'userProfile.project', {}),
    };
};

NavBar.propTypes = {
    intl: intlShape.isRequired,
    isAuth: PropTypes.bool.isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NavBar));
