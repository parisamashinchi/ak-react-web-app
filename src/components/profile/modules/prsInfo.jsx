import React, { Component } from 'react';
import {
    FormattedMessage,
    injectIntl,
    IntlProvider,
} from 'react-intl';
import {Col, Row, Switch, Divider, Icon, Menu} from 'antd';
import isEmpty from "lodash/isEmpty";
import {NavLink} from "react-router-dom";
import { bindActionCreators } from "redux";
import { Helmet } from 'react-helmet';
import * as actions from "../actions";
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import connect from 'react-redux/es/connect/connect';
import * as modalActions from 'containers/modal/actions';
import * as notificationActions from 'components/layout/actions';
import * as zoneActions from 'containers/zone/actions';
import ProfileStyle from '../assets/styles/profile.style';
import EditPrsInfo from './editPrsInfo';
import * as images from '../assets/images';
import en from '../translations/en.json';
import fa from '../translations/fa.json';


/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    fa,
    en
};

/*
PrsInfo is component for showing list of personal info.
 */
class PrsInfo extends Component {
    componentDidMount() {
        const { getUserProfile, getNotificationsSetting, getFullZone } = this.props;
        getUserProfile();
        getNotificationsSetting();
        getFullZone();
    }

    editProfile = () => {
        const { showModal, userProfile } = this.props;
        const relatedData = {
            width: '400px',
            ...userProfile,
        };
        showModal(true, EditPrsInfo, relatedData);
    };

    handleNotificationSetting = (value, item) => {
        const { putNotificationsSetting, notificationSettingData } = this.props;
        notificationSettingData[item] = value;
        putNotificationsSetting(notificationSettingData);
    };

    render() {
        // $lang contains selected language and IntlProvider use it to show needed language
        const { lang, userProfile, userProject, notificationSettingData, loadData, zone } = this.props;
        const loading = loadData.showLoader
            && loadData.requestType === 'put';
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        <title>Information</title>
                    </Helmet>
                    <ProfileStyle className="content">
                        <Row className="prsInfo">
                            <img  onClick={this.editProfile} className="edit-profile"  src={images.editIcon} alt="edit"/>
                            <Col span={24} className="zone-back">
                                <Row className="profile-zone" >
                                    <Col span={6}>
                                        {map(zone, item => {
                                        const zoneName = get(item, 'zone.name', 0);
                                        const zoneImage = get(item, 'zone.image_name', 0);
                                        const userProjectName = get(userProject, 'zone.name', '');
                                        return (zoneName === userProjectName && !isEmpty(userProject.zone)
                                             &&
                                            <div>
                                                <img src={require('../assets/images/' + zoneImage)} alt="zone"/>
                                                <span className="zone">{userProjectName}</span>
                                            </div>
                                        )
                                        })}
                                    </Col>
                                    <Col span={18} className="align-center">
                                        {map(zone, item => {
                                            const zoneName = get(item, 'zone.name', 0);
                                            const zoneId = get(item, 'zone.id', 0);
                                            const zoneImage = get(item, 'zone.image_name', 0);
                                            const opacity = 0.8- zoneId/10;
                                            const userProjectName = get(userProject, 'zone.name', '');
                                            const userProjectID = get(userProject, 'zone.id', '');
                                            return (zoneName !== userProjectName && zoneId > userProjectID
                                                   && <img src={require('../assets/images/' + zoneImage)} style={{opacity: opacity}} alt="zone"/>
                                            )
                                        } )}
                                        <NavLink to="/planets">
                                            <h4>
                                                <FormattedMessage id="profile.upgrade" />
                                                <img src={images.upgrade} alt="arrow" width="20"/>
                                            </h4>
                                        </NavLink>

                                    </Col>
                                </Row>
                                    <Row>
                                        <Col span={12}>
                                            <h3>
                                                <FormattedMessage id="profile.information" />
                                            </h3>
                                            <p>
                                                <img src={images.companyName} alt="company name" />
                                                <FormattedMessage id="profile.companyName" />
                                            </p>
                                            {!isEmpty(userProfile.name)
                                               ? <pre>
                                                    {userProfile.name}
                                                 </pre>
                                                :
                                                <pre>
                                                    ---
                                                </pre>
                                            }
                                            <p>
                                                <img src={images.countryCity} alt="country city" />
                                                <FormattedMessage id="profile.country" />
                                            </p>
                                            {!isEmpty(userProfile.city)
                                                ? <pre>
                                                     {userProfile.city}
                                                  </pre>
                                                :
                                                <pre>
                                                    ---
                                                </pre>
                                            }
                                            <p>
                                                <img src={images.economicalNumber} alt="economical number" />
                                                <FormattedMessage id="profile.economicalNumber" />
                                            </p>
                                            { !isEmpty(userProfile.company_economical_number)
                                                ? <pre>
                                                     {userProfile.company_economical_number}
                                                  </pre>
                                                :
                                                <pre>
                                                    ---
                                                </pre>
                                            }
                                            <p>
                                                <img src={images.identityNumber} alt="identity number" />
                                                <FormattedMessage id="profile.identityNumber" />
                                            </p>
                                            {!isEmpty(userProfile.identity_number)
                                                ? <pre>
                                                     {userProfile.identity_number}
                                                </pre>
                                                :
                                                <pre>
                                                    ---
                                                </pre>
                                            }
                                        </Col>
                                        <Col span={12} className="m-t-5">
                                            <p>
                                                <img src={images.phone} alt="phone" />
                                                <FormattedMessage id="profile.phoneNumber" />
                                            </p>
                                            {!isEmpty(userProfile.phone_number)
                                                ? <pre>
                                            {userProfile.phone_number}
                                          </pre>
                                                :
                                                <pre>
                                            ---
                                        </pre>
                                            }
                                            <p>
                                                <img src={images.location} alt="location" />
                                                <FormattedMessage id="profile.companyAddress" />
                                            </p>
                                            {!isEmpty(userProfile.address)
                                                ? <pre className="address">
                                            {userProfile.address}
                                          </pre>
                                                :
                                                <pre>
                                            ---
                                        </pre>
                                            }
                                            <p>
                                                <img src={images.email} alt="email" />
                                                <FormattedMessage id="profile.email" />
                                            </p>
                                            {!isEmpty(userProfile)
                                                ? <pre>
                                            {userProfile.user.email}
                                          </pre>
                                                :
                                                <pre>
                                            ---
                                        </pre>
                                            }
                                        </Col>
                                    </Row>
                            </Col>
                            <Col span={24} className="notification" >
                                <h3>
                                    <FormattedMessage id="profile.notification" />
                                </h3>
                                <Col span={6}>
                                    <p>
                                        <FormattedMessage id="profile.SMS" />
                                        <Switch
                                            checked={notificationSettingData.sms}
                                            onChange={(value) => this.handleNotificationSetting(value, 'sms')}
                                            size="small"
                                            loading={loading}
                                        />
                                    </p>
                                </Col>
                                <Col span={2}>
                                    <Divider type="vertical" />
                                </Col>
                                <Col span={6}>
                                    <p>
                                        <FormattedMessage id="profile.email" />
                                        <Switch
                                            checked={notificationSettingData.email}
                                            onChange={(value) => this.handleNotificationSetting(value, 'email')}
                                            size="small"
                                            loading={loading}
                                        />
                                    </p>
                                </Col>
                                <Col span={2}>
                                    <Divider type="vertical" />
                                </Col>
                                <Col span={6}>
                                    <p>
                                        <FormattedMessage id="profile.internal" />
                                        <Switch
                                            checked={notificationSettingData.internal}
                                            onChange={(value) => this.handleNotificationSetting(value, 'internal')}
                                            size="small"
                                            loading={loading}
                                        />
                                    </p>
                                </Col>
                            </Col>
                        </Row>
                    </ProfileStyle>
                </div>
            </IntlProvider>
        );
    }
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 $lang in redux state will show us selected language
 $userProfile gives user profile information
*/
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
        userProfile: get(state.WalletReducer, 'userProfile', {}),
        userProject: get(state.WalletReducer, 'userProfile.user', {}),
        notificationSettingData: get(state.LayoutReducer, 'notificationSetting', {}),
        loadData: get(state.LoadingReducer, 'loadData', {}),
        zone: get(state.ZoneReducer, 'fullZone', []),
    };
};
/*
$getUserProfile is an action to get user profile
*/
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserProfile: actions.getUserProfile,
        showModal: modalActions.showModal,
        getNotificationsSetting: notificationActions.getNotificationsSetting,
        putNotificationsSetting: notificationActions.putNotificationsSetting,
        getFullZone: zoneActions.getFullZone,
    }, dispatch);
}

PrsInfo.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(PrsInfo));
