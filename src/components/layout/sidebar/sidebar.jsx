import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { history } from 'src/routers/AppRouter';
import CustomButton from 'components/ui-components/button/Button';
import SideBarStyle from './assets/styles/sideBar.style';
import * as images from './assets/images';
import en from './translations/en.json';
import fa from './translations/fa.json';

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = { fa, en };
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: ['sub1'],
        };
    }

    componentWillMount() {
        if(this.props.match.path === '/object-storage/statistics'
            || this.props.match.path === '/object-storage/directories'
            || this.props.match.path === '/object-storage/APIs') {
            this.state = {
                openKeys: ['sub2'],
            };
        } else if(this.props.match.path === '/profile/Information'
            || this.props.match.path === '/profile/bill'
            || this.props.match.path === '/profile/affiliate'
            || this.props.match.path === '/profile/wallet'
            || this.props.match.path === '/profile/change-password') {
            this.state = {
                openKeys: ['sub3'],
            };
        } else if(this.props.match.path === '/compute/virtual-machines'
            || this.props.match.path === '/compute/virtual-machines'
            || this.props.match.path === '/compute/external-disks'
            || this.props.match.path === '/compute/backups'
            || this.props.match.path === '/compute/firewall'
            || this.props.match.path === '/compute/one-click'
        ) {
            this.state = {
                openKeys: ['sub1'],
            };
        }
    };
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? this.state.openKeys.concat(latestOpenKey) : this.state.openKeys,
            });
        }
    };

    render() {
        const {
            lang,
            match,
        } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <SideBarStyle>
                    <Sider className="sidebar">
                        <div className="logo">
                            <NavLink to="/">
                                <img src={images.logo} alt="logo" />
                            </NavLink>
                        </div>
                        <div className="side-btn">
                            <CustomButton
                                color="greenCreate"
                                size="large"
                                fullWidth={true}
                                onClick={() => history.push('/create')}
                            >
                                <FormattedMessage id="sideBar.create" />
                            </CustomButton>
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                        >
                            <SubMenu
                                key="sub1"
                                title={(
                                    <span>
                                        <img src={images.compute} alt="compute" />
                                        <FormattedMessage id="sideBar.compute" />
                                    </span>
                                )}
                            >
                                <Menu.Item
                                    key="2"
                                    className={match.path === '/compute/virtual-machines' ? 'selected' : null}
                                >
                                    <NavLink to="/compute/virtual-machines/list">
                                        {/*
                                        <span className="number">
                                            ({ instances.length })
                                        </span>
                                        */}
                                        <FormattedMessage id="sideBar.virtualMachine" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="17"
                                    className={match.path === '/compute/one-click' ? 'selected' : null}
                                >
                                    <NavLink to="/compute/one-click" >
                                        <FormattedMessage id="sideBar.oneClick" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="3"
                                    className={match.path === '/compute/external-disks' ? 'selected' : null}
                                >
                                    <NavLink to="/compute/external-disks">
                                        <FormattedMessage id="sideBar.volumes" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="4"
                                    className={match.path === '/compute/backups' ? 'selected' : null}
                                >
                                    <NavLink to="/compute/backups">
                                        <FormattedMessage id="sideBar.backups" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="5"
                                    className={match.path === '/compute/firewall' ? 'selected' : null}
                                >
                                    <NavLink to="/compute/firewall">
                                        <FormattedMessage id="sideBar.securityGroup" />
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={(
                                    <span>
                                        <img src={images.objectStorageIcon} alt="object storage " />
                                        <FormattedMessage id="sideBar.objectStorage" />
                                        <p className="beta">(New)</p>
                                    </span>
                                )}
                            >
                                {/*<Menu.Item*/}
                                {/*    key="6"*/}
                                {/*    className={match.path === '/object-storage/statistics' ? 'selected' : null}*/}
                                {/*>*/}
                                {/*    <NavLink to="/object-storage/statistics">*/}
                                {/*        <FormattedMessage id="sideBar.statistics" />*/}
                                {/*    </NavLink>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item
                                    key="7"
                                    className={match.path === '/object-storage/directories' ? 'selected' : null}
                                >
                                    <NavLink to="/object-storage/directories">
                                        <FormattedMessage id="sideBar.folders" />
                                    </NavLink>
                                </Menu.Item>
                                {/*<Menu.Item*/}
                                {/*    key="8"*/}
                                {/*    className={match.path === '/object-storage/APIs' ? 'selected' : null}*/}
                                {/*>*/}
                                {/*    <NavLink to="/object-storage/APIs">*/}
                                {/*        <FormattedMessage id="sideBar.APIs" />*/}
                                {/*    </NavLink>*/}
                                {/*</Menu.Item>*/}
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={(
                                    <span>
                                        <img src={images.profile} alt="planet" />
                                        <FormattedMessage id="sideBar.profile" />
                                    </span>
                                )}
                            >
                                <Menu.Item
                                    key="9"
                                    className={match.path === '/profile/Information' ? 'selected' : null}
                                >
                                    <NavLink to="/profile/Information">
                                        <FormattedMessage id="sideBar.prsInfo" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="10"
                                    className={match.path === '/profile/bill' ? 'selected' : null}
                                >
                                    <NavLink to="/profile/bill">
                                        <FormattedMessage id="sideBar.bill" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="11"
                                    className={match.path === '/profile/affiliate' ? 'selected' : null}
                                >
                                    <NavLink to="/profile/affiliate">
                                        <FormattedMessage id="sideBar.affiliation" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="12"
                                    className={match.path === '/profile/wallet' ? 'selected' : null}
                                >
                                    <NavLink to="/profile/wallet">
                                        <FormattedMessage id="sideBar.wallet" />
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="13"
                                    className={match.path === '/profile/change-password' ? 'selected' : null}
                                >
                                    <NavLink to="/profile/change-password">
                                        <FormattedMessage id="sideBar.changePassword" />
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                key="14"
                            >
                                <NavLink to="/planets" target="_blank">
                                    <img src={images.planet} alt="planet" />
                                    <FormattedMessage id="sideBar.planets" />
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item
                                key="15"
                            >
                                <NavLink to="/calculator" target="_blank">
                                    <img src={images.calculator} alt="planet" />
                                    <FormattedMessage id="sideBar.calculator" />
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item
                                key="16"
                                className={match.path === '/test-lab' ? 'selected' : null}
                            >
                                <NavLink to="/test-lab">
                                    <img src={images.testLabOff} alt="planet" />
                                    <FormattedMessage id="sideBar.testLab" />

                                </NavLink>
                            </Menu.Item>

                        </Menu>
                    </Sider>
                </SideBarStyle>
            </IntlProvider>
        );
    }
}
/*
    mapStateToProps is a function that we
    use to get data from redux state
    lang in redux state will show us selected language
*/
const mapStateToProps = state => ({
    lang: state.locale.lang,
});

SideBar.propTypes = {
    lang: PropTypes.string.isRequired,
    match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default injectIntl(connect(mapStateToProps)(SideBar));
