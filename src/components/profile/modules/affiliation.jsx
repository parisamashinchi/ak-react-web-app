import React, { Component } from 'react';
import {
    FormattedMessage,
    injectIntl,
    IntlProvider,
} from 'react-intl';
import { bindActionCreators } from 'redux';
import {
    Row,
    Col,
    Input,
    Icon,
    Drawer,
    Spin,
    Tooltip,
} from 'antd';
import { Menu } from "antd/lib/menu";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import split from 'lodash/split';
import findIndex from 'lodash/findIndex';
import connect from 'react-redux/es/connect/connect';
import { Scrollbars } from "react-custom-scrollbars";
import { Helmet } from 'react-helmet';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { spiritNumber } from 'src/utils/spiritNumber';
import { moments } from 'src/utils/moment';
import { createTable } from 'containers/table/Table';
import * as formActions from 'containers/form/actions';
import CustomButton from 'components/ui-components/button/Button';
import * as actions from '../actions';
import * as constants from '../constants';
import ProfileStyle from '../assets/styles/profile.style';
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

class Affiliation extends Component {
    constructor(props){
        super(props);
        this.state = {
            social: false,
            invitationCode: '',
            affiliationHistory: false,
            copied: false,
            pulse: false,
        };
        const isLoading = props.loadData.showLoader
            && props.loadData.requestType === 'post';
        this.table = createTable(constants.AFFILIATION_HISTORY);
        this.tableConf = {
            url: constants.GET_AFFILIATION_USAGE_URL,
            columns: [
                {
                    title: 'Guest ID     ',
                    dataIndex: 'affiliation',
                    key: 'affiliation',
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    key: 'amount',
                    render: value => spiritNumber(value),
                },
                {
                    title: 'Purchase Time',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    render: value => moments(value),
                },
                {
                    title: 'Withdraw Time',
                    dataIndex: 'paid_at',
                    key: 'paid_at',
                    render: (value) => value
                        ? moments(value)
                        : <p className="empty-item">
                            ---
                        </p>
                },
                {
                    title: 'Actions',
                    dataIndex: 'actions',
                    key: 'actions',
                    render: (text,itemData) => (
                        isEmpty(itemData.paid_at)
                                ? <Tooltip title={'Withdraw'}>
                                <CustomButton
                                    onClick={ () => this.cashOut(itemData.id)}
                                    loading={isLoading}
                                    fullWidth={true}
                                >
                                    <img className="actionIcon" src={images.cashOutIcon}/>
                                </CustomButton>
                            </Tooltip>
                                 : <p className="empty-item">
                                        ---
                                    </p>
                    ),
                },
            ],
        };
    }
    points = [
        ['30%','80%'],
        ['30%','20%'],
        ['40%','35%'],
        ['65%','80%'],
        ['70%','50%'],
        ['20%','70%'],
        ['30%','60%'],
        ['20%','40%'],
        ['70%','20%'],
        ['80%','40%'],
        ['80%','65%'],
    ];
    componentWillMount() {
        const { getUserProfile, getMembers } = this.props;
        getUserProfile();
        getMembers();
        this.props.setErrors([]);
    }
    componentDidMount = () => {
        setInterval(() => {
            this.setState({
                pulse: !this.state.pulse,
            });
        }, 10000);
    }

    componentDidUpdate() {
        const {invitedMember } = this.props;
        const el = document.querySelector('.solar-system');
        for (let i = 0; i < invitedMember.length; i++) {
            el.innerHTML += `
                        <img 
                             src=${images.red} 
                             class=${this.state.pulse ? 'pulse' : null}
                             alt="blue circle"
                             style="position: absolute;
                                    left: ${this.points[i][0]};
                                    bottom: ${this.points[i][1]};
                                    width: 10px;
                                    opacity: .7!important;"
                        />
                `
        }
    };

    //showSocial sets social state true to show social icons
    showSocial = () => {
        this.setState({
            social: true,
            copied: false,
        })
    };

    //onChangeInviteCode sets input value in invitationCode state
    onChangeInviteCode = e => {
        this.setState({
            invitationCode: e.target.value,
        })
    };

    //onEnterInviteCode posts invitation code
    onEnterInviteCode = () => {
        const { postInvitationCode } = this.props;
        const data = {
            host_affiliation_code: this.state.invitationCode,
        };
        postInvitationCode(data);
    };

    //showAffiliationHistory shows affiliation History
    showAffiliationHistory = () => {
        this.setState({
            affiliationHistory: true,
        })
    };

    //closeAffiliationHistory close affiliation History
    closeAffiliationHistory = () => {
        this.setState({
            affiliationHistory: false,
        });
    };

    /*cashOut cashes specific affiliation out
      $id is the id of affiliation
    */
    cashOut = (id) => {
      const{ cashOut } = this.props;
        cashOut(id);
    };

    //cashOutAll cashes all affiliation out
    cashOutAll = () => {
        const{ cashOutAll } = this.props;
        cashOutAll();
    };

    onCopy = () => {
        this.setState({
            copied: true,
        });
        setTimeout(() => this.setState({ copied: false }), 3000);
    };

    render() {
        /*
        $lang contains selected language and IntlProvider use it to show needed language
        $userProfile contains user profile information
        */
        const {
            lang ,
            userProfile,
            loadData,
            invitedMember,
            affiliation,
            userProject,
        } = this.props;
        const Table = this.table;
        const telegram_URL = '';
        const whatsApp_URL = '';
        const gmail_URL= '';
        const loading = loadData.showLoader
            && loadData.requestType === 'post';
        const imageName = get(userProject, 'zone.image_name', '');
        const editedName = split(imageName, '.')[0];
        const withdrawOption = findIndex(affiliation, {paid_at: null});
        const canWithdraw = withdrawOption !== -1;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        <title>Affiliate</title>
                    </Helmet>
                    <ProfileStyle>
                        <Col span={24} className="affiliation">
                            <Col span={24}>
                                <Col lg={5} xl={6} className="left-side">
                                    <h2><FormattedMessage id="profile.guest" /></h2>
                                    <p><FormattedMessage id="profile.guestText" /></p>
                                    <div className="more">
                                        <a
                                            target="_blank"
                                            href=""
                                        >
                                            <FormattedMessage id="profile.readMore" />
                                        </a>
                                    </div>
                                    <b>
                                        <span> {invitedMember.length} </span>
                                        <FormattedMessage id="profile.guestNum" />
                                    </b>
                                    {/*<div className="status">*/}
                                        {/*<p>*/}
                                            {/*<img src={images.blue} alt="red circle" />*/}
                                            {/*<FormattedMessage id="profile.active" />*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<img src={images.red} alt="blue circle" />*/}
                                            {/*<FormattedMessage id="profile.monster" />*/}
                                        {/*</p>*/}
                                        {/*<p className="text">*/}
                                            {/*<FormattedMessage id="profile.monsterText" />*/}
                                        {/*</p>*/}
                                    {/*</div>*/}
                                </Col>
                                <Col
                                    lg={13}
                                    xl={12}
                                    className="solar-system"
                                    style={{backgroundImage: `url(${images[`${editedName}WithBack`]}`}}
                                >
                                    <div className="solar-animate2" />
                                    <div className="solar-animate1" />
                            </Col>
                                <Col span={6} className="right-side">
                                    <div className="notif">
                                        <img src={images.dotCircle} alt="dot circle" />
                                        <div className="notif-content">
                                            <h3>
                                                <FormattedMessage id="profile.share" />
                                            </h3>
                                            <p>
                                                <FormattedMessage id="profile.shareText1" />
                                                <b> 1,000,000 </b>
                                                {constants.CURRENCY}
                                                <FormattedMessage id="profile.shareText2" />
                                            </p>
                                            <p>
                                                <FormattedMessage id="profile.shareText3" />
                                                <b> 8% </b>
                                                <FormattedMessage id="profile.shareText4" />
                                            </p>
                                            {!this.state.social &&
                                                <div className="ant-btn">
                                                    {
                                                        this.state.copied
                                                        && <span className="copied">
                                                            Copied
                                                        </span>
                                                    }
                                                {!isEmpty(userProfile.affiliation_code)
                                                    ? <Tooltip title="Copy">
                                                        <CopyToClipboard text={userProfile.affiliation_code} onCopy={this.onCopy} >
                                                            <button>
                                                                {userProfile.affiliation_code}
                                                            </button>
                                                        </CopyToClipboard>
                                                    </Tooltip>
                                                    : "your affiliation code"
                                                }
                                                    <Tooltip title="Share">
                                                        <img  onClick={this.showSocial} src={images.share} alt="sharing" />
                                                    </Tooltip>
                                                </div>
                                            }
                                            {this.state.social &&
                                                <div className="social">
                                                    <Col span={6}>
                                                        <a onClick={()=>this.setState({social:false})}>
                                                            <img src={images.back} alt="back" />
                                                        </a>
                                                    </Col>
                                                    <Col span={6}>
                                                        <a href={telegram_URL} target="_blank">
                                                            <img src={images.telegram} alt="telegram" />
                                                        </a>
                                                    </Col>
                                                    <Col span={6}>
                                                        <a href={whatsApp_URL} target="_blank">
                                                            <img src={images.wa} alt="whatsApp" />
                                                        </a>
                                                    </Col>
                                                    <Col span={6}>
                                                        <a href={gmail_URL} target="_blank">
                                                             <img src={images.gmail} alt="gmail" />
                                                        </a>
                                                    </Col>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {isEmpty(userProfile.invited_by) &&
                                        <div className="invite-code">
                                        <h3>
                                            <FormattedMessage id="profile.invitation"/>
                                        </h3>

                                        <Row>
                                            <Col span={17}>
                                                <div className={ this.props.backendErrors.includes('host_affiliation_code') ? 'on-demand-error' : ''}>
                                                    <Input
                                                        onChange={e => this.onChangeInviteCode(e)}
                                                    />
                                                </div>
                                            </Col>
                                            <Col span={5}>
                                                <CustomButton className="check-btn"
                                                              size="large"
                                                              onClick={this.onEnterInviteCode}
                                                >
                                                    {loading
                                                        ? <Spin spinning={loading}/>
                                                        : <Icon type="check"/>
                                                    }
                                                </CustomButton>

                                            </Col>
                                        </Row>

                                    </div>
                                    }
                                    <Col span={24} className="btn-history ">
                                        <CustomButton
                                            size="large"
                                            color="darkBlue"
                                            onClick={this.showAffiliationHistory}
                                        >
                                            <FormattedMessage id="profile.affiliate" />
                                        </CustomButton>
                                    </Col>
                                </Col>
                            </Col>
                            <Drawer
                                    placement="bottom"
                                    closable={false}
                                    onClose={this.closeAffiliationHistory}
                                    visible={this.state.affiliationHistory}
                                    className="history-drawer"
                                >
                                <Row>
                                    <Col span={12}>
                                        <CustomButton
                                                size="large"
                                                color="darkBlue"
                                                onClick={this.cashOutAll}
                                                className="cashOutAll"
                                                disabled={isEmpty(affiliation) && "disabled" || !canWithdraw && "disabled" }
                                        >
                                                <FormattedMessage id="profile.cashOutAll" />
                                        </CustomButton>
                                    </Col>
                                    <Col span={12}>
                                        <button className="close-button" onClick={this.closeAffiliationHistory}>
                                            <img className="arrow-image" src={images.arrow} alt="nothing" />
                                        </button>
                                    </Col>
                                </Row>
                                <Col span={24}>
                                    <Scrollbars className="scrollbar">
                                        <Table
                                            {...this.tableConf}
                                            {...this.props}
                                            hasPaginate={true}
                                        />
                                    </Scrollbars>
                                </Col>
                            </Drawer>
                        </Col>
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
 $invitedMember give affiliation history of invited memebr
 */
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
        userProfile: get(state.WalletReducer, 'userProfile', {}),
        userProject: get(state.WalletReducer, 'userProfile.user', {}),
        invitedMember: get(state.WalletReducer, 'invitedMember', {}),
        loadData: get(state.LoadingReducer, 'loadData', {}),
        affiliation: get(state.TableReducer, 'affiliation', []),
        backendErrors: get(state.FormReducer, 'errors' , []),
    };
};

/*
$getUserProfile is an action to get user profile
$getMembers is an action to get invited member
$postInvitationCode is an action to post invitation code
$cashOut is an action to send id to cash out
$cashOutAll is an action to cash out all affiliations
*/
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserProfile: actions.getUserProfile,
        getMembers: actions.getMembers,
        postInvitationCode: actions.postInvitationCode,
        cashOut: actions.cashOut,
        cashOutAll: actions.cashOutAll,
        setErrors: formActions.setErrors,
    }, dispatch);
}

Affiliation.propTypes = {
    lang: PropTypes.string.isRequired,
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Affiliation));
