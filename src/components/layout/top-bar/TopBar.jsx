import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
import { NavLink } from 'react-router-dom';
import {
    Layout,
    Menu,
    Tooltip,
    Icon,
    Popover,
    Col,
    Select,
} from 'antd';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import map from 'lodash/map';
import split from 'lodash/split';
import PropTypes from 'prop-types';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import Moment from 'react-moment';
import { Scrollbars } from "react-custom-scrollbars";
import * as colors from 'src/assets/styles/colors';
import { spiritNumber } from 'src/utils/spiritNumber';
import * as costActions from 'containers/zone/actions';
import * as profileActions from 'components/profile/actions';
import CustomButton from 'components/ui-components/button/Button';
import * as authActions from 'components/authentication/actions';
import LoadingStyle from 'containers/loading/assets/styles/loading.style';
import * as languageActions from 'containers/language/actions';
import * as tableActions from 'containers/table/actions';
import TopBarStyle from './assets/styles/topBar.style';
import * as images from './assets/images';
import * as actions from '../actions';
import * as constants from '../constants';
import fa from './translations/fa';
import en from './translations/en';

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = { fa, en };
const { Header } = Layout;
const Option = Select.Option;

// TopBar is a component to show in private pages
export class TopBar extends Component {
    constructor(props) {
        super(props);
        // showSearch holds a boolean to show or hide search input
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        const { getWallet, getNotifications, getCost, getUserProfile } = this.props;
        getWallet();
        getNotifications();
        getCost();
        getUserProfile();

    };

    changeArrowIcon = () => {
        if (!this.state.downIcon) {
            this.setState({
                downIcon: true,
            })
        } else {
            this.setState({
                downIcon: false,
            })
        }
    };

    //markedSeen is a method to post all notifications  marked as seen
    markedSeen = () => {
        const { markNotifications } = this.props;
        markNotifications();
    };

    //logOut is a method to log out user from dashboard
    logOut = () => {
        const { logoutUser } = this.props;
        setTimeout(
            () => this.setState({
                class: 'loading',
            }),
        );
        logoutUser();
    };

    show = () => {
        this.setState({
            show: !this.state.show
        });
    };

    selectRegion = (data) => {
        const {
            selectRegion,
            match,
            getData,
            getFolders,
            backupTab,
        } = this.props;
        selectRegion(data);
        if (match.path.split('/')[1] === 'compute' && match.path.split('/')[2] !== 'backups') {
            const tableName = match.path.split('/')[2] === 'virtual-machines'
                ? 'Instances'
                : match.path.split('/')[2] === 'external-disks'
                    ? 'Volumes'
                    : match.path.split('/')[2] === 'firewall'
                        ? 'SecurityGroups' : '';
            const tableURL = match.path.split('/')[2] === 'virtual-machines'
                ? 'api/v1/instances/'
                : match.path.split('/')[2] === 'external-disks'
                    ? 'api/v1/volumes/'
                    : match.path.split('/')[2] === 'firewall'
                        ? 'api/security_groups/'
                        : '';
            getData(tableName, tableURL, 'interval');
        } else if (match.path.split('/')[1] === 'compute' && match.path.split('/')[2] === 'backups') {
            const tableName = backupTab === 'virtualMachine'
                ? 'VirtualMachines'
                : backupTab === 'externalDisk'
                    ? 'ExternalDisk'
                    : backupTab === 'scheduler'
                        ? 'Scheduler'
                        : '';
            const tableURL = backupTab === 'virtualMachine'
                ? 'api/v1/images/'
                : backupTab === 'externalDisk'
                    ? 'api/v1/snapshots/'
                    : backupTab === 'scheduler'
                        ? 'api/v1/images/type/backup/'
                        : '';
            getData(tableName, tableURL, 'interval');
        } else if (match.path.split('/')[1] === 'object-storage') {
            getFolders();
        }
    };

    render() {
        /**
         * @theme define theme properties if theme is profile it will be changed to profile styles
         */
        const {
            wallet,
            lang,
            theme,
            userData,
            userProject,
            langLoading,
            regionList,
            selectedRegion,
            match,
            history,
        } = this.props;
        const walletData = get(wallet, 'wallet', {});
        const balanceColors = [
            colors.greenToRed0,
            colors.greenToRed1,
            colors.greenToRed2,
            colors.greenToRed3,
            colors.greenToRed4,
            colors.greenToRed5,
            colors.greenToRed6,
            colors.greenToRed7,
            colors.greenToRed8,
            colors.greenToRed9,
            colors.greenToRed10,
        ];
        const imageName = get(userProject, 'zone.image_name', '');
        const notification = (
            !isEmpty(this.props.notificationList)
                ? (
                    <div className="notifications">
                        <Scrollbars className="scrollbar" >
                            <Menu>
                                {map(Object.keys(this.props.notificationList), item => {
                                    return <Menu.Item>

                                        <Ellipsis tooltip={true} length={30}>
                                            {this.props.notificationList[item].text}
                                        </Ellipsis>
                                            <Moment
                                                format="D MMM YYYY HH:mm"
                                                date={this.props.notificationList[item].created_at}
                                            />
                                    </Menu.Item>
                                })}
                            </Menu>
                        </Scrollbars>
                        <div className="btn">
                            <CustomButton
                                size="large"
                                color="blue"
                                onClick={this.markedSeen}
                            >
                                <FormattedMessage id="topBar.mark"/>
                            </CustomButton>
                        </div>
                    </div>
                )
                : <div className="notifications-empty">
                    <FormattedMessage id="topBar.noData"/>
                </div>
        );
        const userName = split(userData.name, ' ');
        const shortUserName = split(userName[0], '', [7]);
        const currentRoute = match.path;
        const currentHistory = history.location.pathname;
        const instanceDetail = !currentHistory.split('/')[4];
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <TopBarStyle>
                    <LoadingStyle>
                        { this.state.class === 'loading' || langLoading
                            ? (
                                <div className="preloader-wrapper">
                                    <div className="preloader-container">
                                        <div className="dot dot-1">
                                            <div className="dot dot-2" />
                                            <div className="dot dot-3" />
                                        </div>
                                    </div>
                                </div>
                            )
                            : ''
                        }
                    </LoadingStyle>
                    <div className={`${theme === 'profile' ? 'profile' : 'default'} ${
                        !selectedRegion
                            && !(
                            currentRoute === '/profile/Information'
                            || currentRoute === '/profile/bill'
                            || currentRoute === '/profile/affiliate'
                            || currentRoute === '/profile/wallet'
                            || currentRoute === '/profile/change-password'
                            || currentHistory === '/compute/virtual-machines/create'
                            || currentRoute === '/support'
                        )
                            ? 'region-map' : null}`}>
                        <Header>
                            <Menu
                                theme="light"
                                mode="horizontal"
                            >
                                <Menu.Item key="3">
                                    <Popover overlayClassName="topbar-dropDown"
                                             onVisibleChange={this.show}
                                             trigger="click"
                                             placement="bottom"
                                             content={
                                            <Menu>
                                                <Menu.Item key="0">
                                                    <NavLink to="/profile/Information">
                                                        <Icon type="user"/>
                                                        <FormattedMessage id="topBar.profile"/>
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Divider/>
                                                <Menu.Item key="1">
                                                    <NavLink to="/profile/change-password">
                                                        <Icon type="lock" />
                                                        <FormattedMessage id="topBar.changePassword"/>
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Divider/>
                                                <Menu.Item key="2">
                                                    <a onClick={this.logOut}>
                                                        <Icon type="logout"/>
                                                        <FormattedMessage id="topBar.logOut"/>
                                                    </a>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <span className="user-section">
                                            <img className="zone-image" src={require('./assets/images/' + imageName)} alt="zone"/>
                                            <span className="user-name">
                                                <FormattedMessage id="topBar.dropDown.hi" />
                                            </span>
                                            <span className="user-name">
                                                {shortUserName || ''}
                                            </span>
                                            {
                                                this.state.show
                                                    ? <Icon type="up" />
                                                    : <Icon type="down" />
                                            }
                                        </span>
                                        </Popover>
                                </Menu.Item>
                                <span className="vl"/>
                                <Menu.Item className="balance" key="2">
                                    <NavLink to="/profile/wallet">
                                    <span className="balance-text">
                                        <FormattedMessage id="topBar.balance"/>
                                    </span>
                                        <Col span={12} className="amount" style={{
                                            color: Math.sign(walletData.balance) === -1
                                                ? colors.redead
                                                :balanceColors[Math.round(wallet.balance_percent / 10)],
                                        }}>
                                        {spiritNumber(walletData.balance)}
                                    </Col>
                                        <Col span={12} className="unit">
                                            {constants.CURRENCY}
                                        </Col>
                                    </NavLink>
                                </Menu.Item>
                                <span className="vl"/>
                                <Menu.Item key="3">
                                    <Tooltip title="Support">
                                        <NavLink to="/support">
                                            <img src={images.support} alt="nothing"/>
                                        </NavLink>
                                    </Tooltip>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Tooltip title="Notifications" placement="left">
                                        <Popover
                                            overlayClassName="topbar-notif"
                                            placement="bottom"
                                            content={notification}
                                            trigger="click"
                                        >
                                            {
                                                !isEmpty(this.props.notificationList)
                                                    ? <img className="bell-animate" src={images.notifOn} alt="nothing" />
                                                    : <img src={images.notifOff} alt="nothing" />
                                            }
                                        </Popover>
                                    </Tooltip>
                                </Menu.Item>
                                    {
                                        currentRoute !== '/profile/Information'
                                        && currentRoute !== '/profile/bill'
                                        && currentRoute !== '/profile/affiliate'
                                        && currentRoute !== '/profile/wallet'
                                        && currentRoute !== '/profile/change-password'
                                        && currentHistory !== '/compute/virtual-machines/create'
                                        && currentRoute !== '/support'
                                        && instanceDetail
                                        && <Menu.Item key="5" className="select">
                                            <Select
                                            onChange={this.selectRegion}
                                            defaultValue={selectedRegion || "Select your region"}
                                            placeholder="Select your region"
                                        >
                                            {
                                                map(regionList, option => {
                                                    return <Option
                                                        value={option.alias}
                                                        key={option.alias}
                                                    >
                                                        {option.name}
                                                    </Option>
                                                })
                                            }
                                        </Select>
                                        <img src={images.region} />
                                        </Menu.Item>
                                    }
                            </Menu>
                        </Header>
                    </div>
                </TopBarStyle>
            </IntlProvider>
        );
    };
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 lang in redux state will show us selected language
 userCredit is gets user credit
 */
const mapStateToProps = state => ({
    lang: state.locale.lang,
    notificationList: get(state.LayoutReducer, 'notifications', 0),
    userData: get(state.Authentication, 'userData', {}),
    regionList: get(state.Authentication, 'regionList', []),
    selectedRegion: get(state.Authentication, 'selectedRegion', []),
    wallet: get(state.WalletReducer, 'wallet', {}),
    userProject: get(state.WalletReducer, 'userProfile.user', {}),
    langLoading: state.locale.langLoading,
    backupTab: get(state, 'BackupReducer.selectedTab', ''),
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logoutUser: authActions.logoutUser,
        selectRegion: authActions.selectRegion,
        getWallet: profileActions.getWallet,
        getUserProfile: profileActions.getUserProfile,
        getNotifications: actions.getNotifications,
        markNotifications: actions.markNotifications,
        setLocaleLoading: languageActions.setLocaleLoading,
        getCost: costActions.getCost,
        getData: tableActions.getData,
    }, dispatch);
}

TopBar.propTypes = {
    lang: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TopBar));
