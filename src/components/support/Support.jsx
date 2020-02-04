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
import get from 'lodash/get';
import replace from 'lodash/replace';
import findIndex from 'lodash/findIndex';
import parseInt from 'lodash/parseInt';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Row } from 'antd';
import CustomButton from 'components/ui-components/button/Button';
import SupportStyle from './assets/styles/support.style';
import * as images from "./assets/images";
import en from './translations/en.json';
import fa from './translations/fa.json';
import * as actions from './actions';
import SupportList from './modules/SupportList';
import IssueDetail from './modules/IssueDetail';
import LoadingStyle from 'containers/loading/assets/styles/loading.style';

// $messages is getting fa and en json files in case of using translation
const messages = {
    fa,
    en
};

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            selected: false,
            empty: true,
            internal: 'move-back',
            showImage: false,
            moveStyle: false,
        };
    }

    componentDidMount() {
        const {
            getTickets,
            getUserInfo,
            history,
            ticketList,
            getArticles
        } = this.props;
        getTickets();
        getUserInfo();
        const currentTicket = get(history, 'location.hash', 1);
        const ticketId = replace(currentTicket, '#', '');
        const idNumber = parseInt(ticketId);
        if (ticketId !== '') {
            const findID = {id: idNumber};
            if (findIndex(ticketList, findID) !== -1 ) {
                this.setState({
                    selected_ticket: idNumber,
                    selected: true,
                    empty: false,
                    showForm: false,
                    showImage: false,
                    moveStyle: 'move-on',
                });
                getArticles(idNumber)
            }
        }

        // add fade in out to layout when component is in loading mode
        this.setState({
            internal: 'move-on',
            moveStyle: 'move-on',
        });
        setTimeout(
            () => this.setState({
                internal: 'move-back',
                moveStyle: 'move-back',
            }),
            100,
        );
    };

    onClickNewRequest = () => {
        this.setState({
            selected_ticket: 0,
            showForm: true,
            empty: false,
            selected: false,
            showImage: false,
            moveStyle: 'move-on',
        });
        setTimeout(
            () => this.setState({
                moveStyle: 'move-back',
            }),
            100,
        );
    };

    onClickTicketItem = (number, id) => {
        const { getArticles } = this.props;
        this.setState({
            selected_ticket: id,
            selected: true,
            empty: false,
            showForm: false,
            showImage: false,
            moveStyle: 'move-on',
        });
        getArticles(id);
        setTimeout(
            () => this.setState({
                moveStyle: 'move-back',
            }),
            100,
        );
    };

    onCancelForm= () => {
        this.setState({
            showForm: false,
            empty: true,
            selected: false,
            moveStyle: 'move-on',
        });
        setTimeout(
            () => this.setState({
                moveStyle: 'move-back',
            }),
            100,
        );
    };

    showHideImage = url => {
        this.setState({
            showImage: url
        });
    };
    render() {
        // $lang contains selected language and IntlProvider use it to show needed language
        const { lang , ticketList } = this.props;
        const {showForm} =  this.state;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        <title>Support</title>
                    </Helmet>
                    <LoadingStyle>
                        { this.state.class === 'loading'
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
                    <SupportStyle className="content">
                        {
                            isEmpty(ticketList) && !this.state.showForm
                                ? (
                                    <div className={`empty ${this.state.moveStyle}`}>
                                        <img src={images.graphic} alt="graph" />
                                        <div>
                                            <CustomButton
                                                color="blue"
                                                size="large"
                                                onClick={this.onClickNewRequest}
                                            >
                                                <FormattedMessage id="support.buttonRequest" />
                                            </CustomButton>
                                        </div>
                                    </div>
                                )
                                : isEmpty(ticketList) && this.state.showForm
                                ? <Row>
                                    <Col md={5} />
                                    <Col md={14} className={this.state.moveStyle}>
                                        <IssueDetail
                                            ticketList={ticketList}
                                            showForm={showForm}
                                            showImage={this.state.showImage}
                                            selectedTicket={this.state.selected_ticket}
                                            selected={this.state.selected}
                                            empty={this.state.empty}
                                            onCancelForm={this.onCancelForm}
                                            onClickTicketItem={this.onClickTicketItem}
                                            showHideImage={this.showHideImage}
                                        />
                                    </Col>
                                </Row>
                                : (
                                    <Row>
                                        <Col md={10}>
                                            <SupportList
                                                selectedTicket={this.state.selected_ticket}
                                                ticketList={ticketList}
                                                onClickTicketItem={this.onClickTicketItem}
                                                onClickNewRequest={this.onClickNewRequest}
                                            />
                                        </Col>
                                        <Col md={14} className={this.state.moveStyle}>
                                            <IssueDetail
                                                ticketList={ticketList}
                                                showForm={showForm}
                                                showImage={this.state.showImage}
                                                selectedTicket={this.state.selected_ticket}
                                                selected={this.state.selected}
                                                empty={this.state.empty}
                                                onCancelForm={this.onCancelForm}
                                                onClickTicketItem={this.onClickTicketItem}
                                                showHideImage={this.showHideImage}
                                            />
                                        </Col>
                                    </Row>
                                )
                        }
                    </SupportStyle>
                    </LoadingStyle>
                </div>
            </IntlProvider>
        );
    }
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 $lang in redux state will show us selected language
 */
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
        userInfo: get(state.SupportReducer, 'userInfo', {}),
        ticketList: get(state.SupportReducer, 'ticketList' , []),
        loadData: get(state.LoadingReducer, 'loadData', {}),
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserInfo: actions.getUserInfo,
        getTickets: actions.getTickets,
        getArticles: actions.getArticles,
    }, dispatch);
}

Support.propTypes = {
    lang: PropTypes.string.isRequired,
    getTickets: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Support));

