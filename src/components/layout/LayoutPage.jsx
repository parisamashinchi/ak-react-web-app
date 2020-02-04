import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Layout } from 'antd';
import split from 'lodash/split';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import CustomModal from 'containers/modal/Modal';
import LoadingStyle from 'containers/loading/assets/styles/loading.style';
import * as loadingActions from 'containers/loading/actions';
import * as modalActions from 'containers/modal/actions';
import * as languageActions from 'containers/language/actions';
import CustomButton from 'components/ui-components/button/Button';
import PrivateStyle from './assets/styles/private.style';
import TopBar from './top-bar/TopBar';
import SideBar from './sidebar/sidebar';
import * as actions from './actions';
import * as images from './assets/images';
import {store} from '../../store/ConfigureStore';

const { Content } = Layout;

export class LayoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'loading',
            internal: 'move-back',
        };
    }

    componentWillMount() {
        const {
            showModal,
            setLastLocation,
            location,
            showLoading,
        } = this.props;
        showModal(false);
        setLastLocation(location.pathname);
        showLoading({
            showLoader: false,
            pulse: false,
        });
    }

    componentDidMount() {
        const { showModal } = this.props;
        const style = {
            width: '500px',
            className: 'landscapeModal',
        };
        const withMessage = () => {
            const hideModal = () => {
                store.dispatch(modalActions.showModal(false));
            };
            return (
                <div className="wrapper">
                    <div>
                        Please use the Landscape orientation for better performance.
                    </div>
                    <CustomButton onClick={hideModal}>
                        Ok
                    </CustomButton>
                </div>
            );
        };
        if (window.outerWidth < 700) {
            showModal(true, withMessage, style);
        }
        setTimeout(
            () => this.setState({
                class: false,
            }),
            3000,
        );
        setInterval(() => {
            this.setState({
                pulse: !this.state.pulse,
            });
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        const { location, setLastLocation } = this.props;
        const prevLocation = split(location.pathname, '/', 3);
        const nextLocation = split(prevProps.location.pathname, '/', 3);
        if (prevLocation[1] !== nextLocation[1] || prevLocation[2] !== nextLocation[2]) {
            this.setState({
                internal: 'move-on',
            });
            setLastLocation(location.pathname);
            setTimeout(
                () => this.setState({
                    internal: 'move-back',
                }),
                300,
            );
        }
    }

    render() {
        const {
            children,
            fullPage,
            selectedRegion,
            langLoading,
        } = this.props;
        return (
            <PrivateStyle fullPage={fullPage}>
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
                    <Layout>
                        <SideBar {...this.props} />
                        {
                            (
                                !selectedRegion && !(
                                    this.props.match.path === '/profile/Information'
                                    || this.props.match.path === '/profile/bill'
                                    || this.props.match.path === '/profile/affiliate'
                                    || this.props.match.path === '/profile/wallet'
                                    || this.props.match.path === '/profile/change-password'
                                    || this.props.match.path === '/support'
                                    || this.props.match.path === '/compute/virtual-machines/create'
                                ) && <div className="map">
                                    <div className="text-section">
                                        <div>
                                            AK
                                            in different locations.
                                        <br />
                                            Choose your desired region from drop-down above.
                                        </div>
                                    </div>
                                    <img
                                        className="pins one"
                                        src={images.pin}
                                        alt="one"
                                    />
                                    <img
                                        className={`pins-shadow one ${this.state.pulse ? 'pulse' : null}`}
                                        src={images.pinOn}
                                        alt="one"
                                    />
                                    <img
                                        className="pins two"
                                        src={images.pin}
                                        alt="two"
                                    />
                                    <img
                                        className={`pins-shadow two ${this.state.pulse ? 'pulse' : null}`}
                                        src={images.pinOn}
                                        alt="two"
                                    />
                                    <img
                                        className="pins three"
                                        src={images.pin}
                                        alt="three"
                                    />
                                    <img
                                        className={`pins-shadow three ${this.state.pulse ? 'pulse' : null}`}
                                        src={images.pinOn}
                                        alt="three"
                                    />
                                    <img
                                        className="pins four"
                                        src={images.pin}
                                        alt="four"
                                    />
                                            <img
                                                className={`pins-shadow four ${this.state.pulse ? 'pulse' : null}`}
                                                src={images.pinOn}
                                                alt="four"
                                            />
                                            <img
                                                className="pins five"
                                                src={images.pin}
                                                alt="five"
                                            />
                                            <img
                                                className={`pins-shadow five ${this.state.pulse ? 'pulse' : null}`}
                                                src={images.pinOn}
                                                alt="five"
                                            />
                                            <img
                                                src={images.map}
                                                alt="map"
                                                className="map-image"
                                            />
                                        </div>
                                    )
                                }
                                <Layout className={(
                                    this.props.match.path === '/profile/Information'
                                    || this.props.match.path === '/profile/bill'
                                    || this.props.match.path === '/profile/affiliate'
                                    || this.props.match.path === '/profile/wallet'
                                    || this.props.match.path === '/profile/change-password'
                                )
                                    ? 'profile-back inner-layout'
                                    : 'inner-layout'}
                                >
                                    <TopBar
                                                    {...this.props}
                                                    theme={(
                                                        this.props.match.path === '/profile/Information'
                                                        || this.props.match.path === '/profile/bill'
                                                        || this.props.match.path === '/profile/affiliate'
                                                        || this.props.match.path === '/profile/wallet'
                                                        || this.props.match.path === '/profile/change-password'
                                                        || this.props.match.path === '/support'
                                                        || this.props.match.path === '/compute/virtual-machines/create'
                                                    )
                                                        ? 'profile'
                                                        : ''}
                                                />
                                    <span className="drag-here">
                                        Upload file...
                                    </span>
                                    <Content className={`${this.state.internal} ${
                                        !selectedRegion
                                            && !(
                                            this.props.match.path === '/profile/Information'
                                            || this.props.match.path === '/profile/bill'
                                            || this.props.match.path === '/profile/affiliate'
                                            || this.props.match.path === '/profile/wallet'
                                            || this.props.match.path === '/profile/change-password'
                                            || this.props.match.path === '/support'
                                            || this.props.match.path === '/compute/virtual-machines/create'
                                        )
                                        && 'show-map'}`}>
                                        <CustomModal />
                                            {children}
                                        </Content>
                                </Layout>
                            </Layout>
                </LoadingStyle>
            </PrivateStyle>
        );
    }
};

function mapStateToProps(state) {
    return {
        isAuth: get(state.Authentication, 'isAuth', false),
        selectedRegion: get(state.Authentication, 'selectedRegion', []),
        langLoading: state.locale.langLoading,
    };
}

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 login is action to handle login request to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showModal: modalActions.showModal,
        setLocale: languageActions.setLocale,
        setLastLocation: actions.setLastLocation,
        showLoading: loadingActions.showLoading,
    }, dispatch);
}

LayoutPage.propTypes = {
    children: PropTypes.node.isRequired,
    showModal: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPage);
