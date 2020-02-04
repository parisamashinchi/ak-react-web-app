import React, { Component } from 'react';
import {
    FormattedMessage,
    injectIntl,
    IntlProvider,
} from 'react-intl';
import { Col, Icon} from 'antd';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import isEmpty from 'lodash/isEmpty';
import split from 'lodash/split';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { returnBoolean } from 'src/utils/returnBoolean';
import { moments } from 'src/utils/moment';
import { spiritNumber } from 'src/utils/spiritNumber';
import * as colors from 'src/assets/styles/colors';
import CustomButton from 'components/ui-components/button/Button';
import { createTable , itemWithUnit } from 'containers/table/Table';
import DrawerWrapper from './Drawer';
import * as formActions from 'containers/form/actions';
import * as actions from '../actions';
import * as constants from '../constants';
import ProfileStyle from '../assets/styles/profile.style';
import en from '../translations/en.json';
import fa from '../translations/fa.json';
import * as images from "../assets/images";

// $messages is getting fa and en json files in case of using translation
const messages = {
    fa,
    en
};

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        this.table = createTable(constants.WALLET);
        this.tableConf = {
            url: constants.GET_WALLET_TRANSACTIONS_URL,
            columns: [
                {
                    title: 'Date',
                    dataIndex: 'modified',
                    key: 'modified',
                    render: value => moments(value),
                },
                {
                    title:itemWithUnit('Amount', constants.CURRENCY),
                    dataIndex: 'amount',
                    key: 'amount',
                    render: value => spiritNumber(value),
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => returnBoolean(text === 'succeeded', text)
                },
                {
                    title: 'Method',
                    dataIndex: 'method',
                    key: 'method',
                },
                {
                    title: 'Transaction Type',
                    dataIndex: 'type',
                    key: 'type',
                    render:  (text) => (
                        text === 'increase'
                            ?   <div><Icon className="green-arrow" type="arrow-up" /> {text}</div>
                            :   <div><Icon className="red-arrow" type="arrow-down" /> {text}</div>
                    )
                },
                {
                    title: 'Trace Code',
                    dataIndex: 'meta.payment_gateway_response',
                    key: 'meta.payment_gateway_response',
                    render:  (text) =>
                        !isEmpty(text)
                            ?   !isUndefined(text.tracenumber) ? text.tracenumber :   <p className="empty-item"> --- </p>
                            :
                            <p className="empty-item">
                                ---
                            </p>
                },
            ],
        };
    };

    componentDidMount() {
        const { getWallet, getLastTransaction, location } = this.props;
        const locationQuery = split(location.search, '=');
        getWallet();
        if(locationQuery[1]) {
            getLastTransaction(locationQuery[1]);
        }
    };

    // open drawer from the right side
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    //close the drawer
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.setErrors([])
    };

    render() {
        // $lang contains selected language and IntlProvider use it to show needed language
        const { lang, wallet } = this.props;
        const Table = this.table;
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
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        <title>Wallet</title>
                    </Helmet>
                    <ProfileStyle  className="content">
                        <Col span={24} className="wallet-img">
                            <Col span={12} className="wallet-text">
                                <h1>
                                    <img src={images.iconBalance} alt="balance" />
                                    <FormattedMessage id="profile.balance" />
                                </h1>
                                <p>
                                    <span
                                        style={{
                                            color: balanceColors[Math.round(wallet.balance_percent / 10)],
                                        }}
                                    >
                                        {!isEmpty(wallet)
                                        && (
                                            spiritNumber(wallet.wallet.balance)
                                        )
                                        }
                                    </span>
                                    <span>
                                        {constants.CURRENCY}
                                    </span>
                                </p>
                            </Col>
                            <Col span={12} className="wallet-button">
                                <CustomButton
                                    size="large"
                                    color="blue"
                                    onClick={this.showDrawer}
                                >
                                    <FormattedMessage id={<FormattedMessage id="profile.chargeAccount" />} />
                                </CustomButton>
                            </Col>
                        </Col>
                        <Col span={24} >
                            <Table
                                {...this.tableConf}
                                {...this.props}
                                filter={{
                                    time: {
                                        startDate: 'datetime_from',
                                        endDate: 'datetime_to',
                                    },
                                    cost: {
                                        startCost: 'amount_from',
                                        endCost: 'amount_to',
                                    },
                                }}
                            />
                        </Col>
                        <DrawerWrapper
                            visible={this.state.visible}
                            onClose ={this.onClose}
                        />
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
 $wallet give a account properties balance and balance percent
 */
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
        wallet: get(state.WalletReducer, 'wallet', {}),
    };
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWallet: actions.getWallet,
        getLastTransaction: actions.getLastTransaction,
        setErrors: formActions.setErrors,
    }, dispatch);
}

Wallet.propTypes = {
    lang: PropTypes.string.isRequired,
    getWallet: PropTypes.func.isRequired,
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Wallet));
