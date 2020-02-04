import React, { Component } from 'react';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
    Col,
    Drawer,
    Icon,
    InputNumber,
    Row,
    Divider,
    Input,
} from 'antd';
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import map from "lodash/map";
import split from "lodash/split";
import findIndex from "lodash/findIndex";
import { spiritNumber } from 'src/utils/spiritNumber';
import { createForm } from 'containers/form/Form';
import CustomButton from 'components/ui-components/button/Button';
import * as constants from '../constants';
import * as actions from '../actions';
import * as images from '../assets/images';
import fa from '../translations/fa';
import en from '../translations/en';
import QueueAnim from 'rc-queue-anim';

// messages is getting fa and en json files in case of using translation
const messages = {
    fa,
    en,
};

class DrawerWrapper extends Component {
    constructor(props) {
        super(props);
        this.state ={
            day: '-',
            price: 0,
            coupon_code: '',
            showPackages: true,
            showPay: false,
            showValue: 'default',
            box_num: 0,
            disable:false,
            active_next : false,
            payment_id : undefined,
            gateway_id : 0,
            couponItem:{}
        };
        this.form = createForm(constants.COUPON);
    };

    componentWillMount() {
        const { setCouponAmount } = this.props;
        const couponItem = {
            payment_amount: '',
            coupon_amount: '',
        };
        setCouponAmount(couponItem);
    };

    componentDidMount() {
        const { getGatewayPackages, getPaymentPackages, gatewayPackages } = this.props;
        getGatewayPackages();
        getPaymentPackages();
        const defaultIndex = findIndex(gatewayPackages, {is_default: true});
        const gatewayId = get(gatewayPackages[defaultIndex], 'id', 1);
        setTimeout(
            this.setState({
                gateway_id: gatewayId
            }),
            10000
        )
    };

    //componentDidUpdate change all state value to the default definition
    componentDidUpdate (prevProps) {
        if(prevProps.visible !== this.props.visible ) {
            this.setState({
                ...this.state,
                cardPrice: 0,
                price: null,
                coupon_code: '',
                showPackages: true,
                showPay: false,
                showValue: 'default',
                box_num: 0,
            })
        }
        if(prevProps.couponItem !== this.props.couponItem ) {
            this.setState({
                couponItem: this.props.couponItem
            })
        }
    }

    //onchangeInput function set value input in price state
    onchangeInput = value => {
        this.setState({
            ...this.state,
            price: value,
            cardPrice: 0,
            showValue: 'default',
            box_num: 0,
            active_next : value !== 0 && value !== null,
            payment_id : undefined,
            couponItem: {},
            coupon_code: ''
        })
    };

    /*onChangeCharge function set package days  in a charge text
    and price of package in price status */
    onChangeCharge = (daysVal, priceVal, boxNum, paymentID) =>{
        this.setState({
            ...this.state,
            day: daysVal,
            cardPrice: priceVal,
            price: null,
            coupon_code: '',
            box_num: boxNum,
            showValue: 'offer',
            disable: true,
            active_next : true,
            payment_id : paymentID,
        })
    };

    //onChangeConfirmCoupon is a function to change the coupon value in state
    onChangeConfirmCoupon =(value) =>{
        this.setState({
            ...this.state,
            coupon_code: value,
        })
    };

    //onConfirmCoupon is a function to post coupon code and price to the server
    onConfirmCoupon = (formData) =>{
      const { couponConfirm } = this.props;
      const data ={
          amount: this.state.price,
          coupon_code: this.state.coupon_code,
      };
        couponConfirm(data);
    };

    /*payMethod pass data to the server to charge wallet
    if coupon_code is empty we dont pass it with data
    after post data we could give appropriate url for redirecting to the bank
    */
    payMethod = () => {
        let data = {};
        if( this.state.coupon_code !== ''){
            if ( this.state.couponItem.success !== '' ) {
                data = {
                    amount: this.state.cardPrice !== 0 ? this.state.cardPrice : this.state.price,
                    coupon_code: this.state.coupon_code,
                    payment_gateway_id: this.state.gateway_id,
                    user_callback_url: `${process.env.REACT_APP_PROJECT_BASE_URL}/profile/wallet`,
                }
            } else {
                data = {
                    amount: this.state.cardPrice !== 0 ? this.state.cardPrice : this.state.price,
                    payment_gateway_id: this.state.gateway_id,
                    user_callback_url: `${process.env.REACT_APP_PROJECT_BASE_URL}/profile/wallet`,
                }
            }
        } else {
             data = {
                 amount: this.state.cardPrice !== 0 ? this.state.cardPrice : this.state.price,
                 payment_package_id: this.state.payment_id,
                 payment_gateway_id: this.state.gateway_id,
                 user_callback_url: `${process.env.REACT_APP_PROJECT_BASE_URL}/profile/wallet`,
            }
        }
        const { walletCharge } = this.props;
        walletCharge(data);
    };

    //onClickNext disappear the offered amounts and shows the payment section
    onClickNext = () => {
        this.setState({
            showPackages: !this.state.showPackages,
            showPay: !this.state.showPay,
        });
        if( this.state.price === 0 || this.state.cardPrice === 0 ){
            this.setState({
                active_next : false
            });
        }
    };

    //onClickBack back to offered amounts and disappears the payment section
    onClickBack = () => {
        this.setState({
            showPay: !this.state.showPay,
            showPackages: !this.state.showPackages,
        });
    };

    render() {
        const { lang, visible, onClose, paymentPackages, gatewayPackages } = this.props;
        const InputGroup = Input.Group;
        const packageColors = [
            images.purpleBack,
            images.blueback,
            images.redBack,
            images.greenBack,
            images.yellowBack,
        ];
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    afterVisibleChange={visible =>this.afterVisibleChange(visible)}
                >
                    <button className="close-button" onClick={onClose}>
                        <Icon type="close" />
                    </button>
                    <div className="charge">
                        <div className="queue-demo">
                            <QueueAnim delay={this.state.showPackages ? 500 : 0} className="queue-simple">
                                {this.state.showPackages ?
                                    [
                                    <div className="demo-thead" key="a">
                                        <Row>
                                            <p className="choose-text">
                                                <FormattedMessage id="profile.chooseText" />
                                            </p>
                                        </Row>
                                    </div>,
                                    <div className="demo-tbody" key="b">
                                        <Row>
                                            {
                                                map(paymentPackages, (item, index) => {
                                                    return <Col span={10}
                                                                className={
                                                                    this.state.box_num === index + 1
                                                                    || this.state.box_num === 0
                                                                        ?  "card hvr-ripple-out" : 'disable'
                                                                }
                                                                onClick={() => this.onChangeCharge(item.days, item.payment_amount, index + 1, item.id)}
                                                    >
                                                        {this.state.box_num === index + 1
                                                        || this.state.box_num === 0
                                                            ?  <img src={packageColors[index]} alt="blue back" />
                                                            : <div className="disable-card"></div>
                                                        }
                                                        <p className="price">
                                                            {spiritNumber(item.payment_amount + item.coupon_amount)}
                                                            <pre>IRR</pre>
                                                        </p>
                                                        <h4>
                                                            <div>
                                                                save {split(item.name, ' ')[3]}%
                                                            </div>
                                                            <div className="discount">
                                                                Discount: {spiritNumber(item.coupon_amount)}
                                                            </div>
                                                        </h4>
                                                    </Col>
                                                })
                                            }
                                        </Row>
                                        <Row className={`${this.state.day !== '-' ? 'charge-text show-charge-text' : 'charge-text'}`}>
                                            <p>
                                                <FormattedMessage id="profile.chargeText" />
                                                <span className="text-price">{this.state.day} days</span>
                                                <FormattedMessage id="profile.chargeText2" />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p className="choose-text">
                                                <FormattedMessage id="profile.chooseText2" />
                                            </p>
                                        </Row>
                                        <Row className="amount-input">
                                                <div className={ this.props.backendErrors.includes('amount') ? 'on-demand-error' : ''}>
                                                    <InputGroup compact>
                                                        <Col span={20}>
                                                            <InputNumber
                                                                className="h-40"
                                                                value={this.state.price}
                                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                onChange={e => this.onchangeInput(e)}
                                                            />
                                                        </Col>
                                                        <Col span={4}>
                                                            <Input className="currency-input" placeholder={constants.CURRENCY}  disabled />
                                                        </Col>
                                                    </InputGroup>
                                                </div>
                                        </Row>
                                    </div>
                                ]
                                    : null
                                }
                            </QueueAnim>
                        </div>
                        <div className="queue-demo">
                            <QueueAnim delay={this.state.showPay ? 700 : 0} className="queue-simple">
                                {this.state.showPay ? [
                                    <div className="demo-thead" key="a">
                                        <Row>
                                            { this.state.showValue === 'default'
                                                ?  <Col span={16}>
                                                        <Row className="default-price">
                                                            <span className="price">
                                                                {spiritNumber(this.state.price)}
                                                            </span>
                                                            <pre>IRR</pre>
                                                        </Row>
                                                    </Col>
                                                : <Col span={16}>
                                                    <Row className={`box-${this.state.box_num} default-price`}>
                                                            <span className="price">
                                                                {spiritNumber(this.state.cardPrice)}
                                                            </span>
                                                        <pre>IRR</pre>
                                                    </Row>
                                                </Col>
                                            }
                                            <Col span={7}>
                                                <CustomButton
                                                    size="large"
                                                    color="blue"
                                                    fullWidth={true}
                                                    onClick={this.onClickBack}
                                                    className="edit-btn"
                                                >
                                                    <FormattedMessage id="profile.edit" />
                                                </CustomButton>
                                            </Col>
                                        </Row>
                                        {
                                            this.state.box_num === 0
                                            && <Row className="coupon-section">
                                                <Col span={16}>
                                                    <label>
                                                        <FormattedMessage id="profile.couponCode" />
                                                    </label>
                                                    <div className={ this.props.backendErrors.includes('coupon_code') ? 'on-demand-error' : ''}>
                                                        <Input
                                                            className="h-40"
                                                            value={this.state.coupon_code}
                                                            onChange={(e) => this.onChangeConfirmCoupon(e.target.value)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col span={7}>
                                                    <CustomButton
                                                        size="large"
                                                        color="blue"
                                                        fullWidth={true}
                                                        onClick={(values) => this.onConfirmCoupon(values)}
                                                        className="coupon-btn"
                                                    >
                                                        <FormattedMessage id="profile.confirm" />
                                                    </CustomButton>
                                                </Col>
                                            </Row>
                                        }
                                    </div>,
                                    <div className="demo-tbody" key="b">
                                        {!isEmpty(this.state.couponItem) && this.state.couponItem.coupon_amount !== ''
                                        &&
                                        <Col span={24}>
                                            <p className="coupon-price">
                                                + {this.state.couponItem.coupon_amount}
                                                {constants.CURRENCY}
                                            </p>
                                            <p className="coupon-text">
                                                <FormattedMessage id="profile.couponText" />
                                            </p>
                                        </Col>
                                        }
                                        <Divider dashed />
                                        <p className="coupon-text">
                                            <FormattedMessage id="profile.choosePaymentMethodText1" />
                                        </p>
                                        {
                                            map(gatewayPackages, item => {
                                                return item.type_name !== 'crypto' && <img
                                                    src={images[item.alias]}
                                                    alt="stripe"
                                                    className={`payment-img ${this.state.gateway_id !== 0 && this.state.gateway_id !== item.id && 'inactive'}`}
                                                    onClick={() => this.setState({gateway_id: item.id})}
                                                />
                                            })
                                        }
                                        {
                                            findIndex(gatewayPackages, {type_name: 'crypto'}) !== -1
                                                && <span>
                                                    <p className="coupon-text">
                                                        <FormattedMessage id="profile.choosePaymentMethodText2" />
                                                    </p>
                                                    {
                                                        map(gatewayPackages, item => {
                                                            return item.type_name === 'crypto' && <img
                                                                src={images[item.alias]}
                                                                alt="savvy"
                                                                className={`payment-img ${this.state.gateway_id !== 0 && this.state.gateway_id !== item.id && 'inactive'}`}
                                                                onClick={() => this.setState({gateway_id: item.id})}
                                                            />
                                                        })
                                                    }
                                                </span>
                                        }
                                    </div>
                                ] : null}
                            </QueueAnim>
                        </div>
                            {this.state.showPackages
                                ? <CustomButton
                                    color="activrGreen"
                                    onClick={this.onClickNext}
                                    className={this.state.active_next === false ? 'next-btn disable-btn'  : "next-btn"}
                                    size="large"
                                    >
                                    Next
                                </CustomButton>
                                :
                                <div className="total-cost">
                                        <p className="total-text">
                                            <FormattedMessage id="profile.totalCost" />
                                            &nbsp;
                                            <span>
                                            {!isEmpty(this.state.couponItem) && this.state.couponItem.coupon_amount !== ''
                                                ? `${spiritNumber(this.state.couponItem.payment_amount)} ${constants.CURRENCY}`
                                                : `${spiritNumber(this.state.price || this.state.cardPrice)} ${constants.CURRENCY}`
                                            }
                                            </span>
                                        </p>
                                        <CustomButton
                                            size="large"
                                            color="activrGreen"
                                            fullWidth={true}
                                            onClick={this.payMethod}
                                            >
                                            <FormattedMessage id="profile.payment" />
                                        </CustomButton>
                                </div>
                            }
                        </div>
                </Drawer>
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
        couponItem: get(state.WalletReducer, 'couponItem', ''),
        backendErrors: get(state.FormReducer, 'errors' , []),
        paymentPackages: get(state.WalletReducer, 'paymentPackages.payment_packages' , []),
        gatewayPackages: get(state.WalletReducer, 'gatewayPackages' , []),
    };
};
/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 $walletCharge actions is an action to charge your wallet
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        couponConfirm: actions.couponConfirm,
        walletCharge: actions.walletCharge,
        setCouponAmount: actions.setCouponAmount,
        getPaymentPackages: actions.getPaymentPackages,
        getGatewayPackages: actions.getGatewayPackages,
    }, dispatch);
}

DrawerWrapper.propTypes = {
    lang: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(DrawerWrapper));
