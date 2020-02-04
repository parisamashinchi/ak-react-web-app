import React, { Component } from 'react';
import {
    FormattedMessage,
    injectIntl,
} from 'react-intl';
import { Col, Row } from 'antd';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import CustomButton from 'components/ui-components/button/Button';
import * as formActions from 'containers/form/actions';
import SupportStyle from '../assets/styles/support.style';
import * as actions from '../actions';

class SupportList extends Component {
    componentDidMount() {
        const { getTicketStatus } = this.props;
        getTicketStatus();
    }

    render() {
        const {
            ticketList,
            ticketStatusList,
            onClickTicketItem,
            onClickNewRequest,
        } = this.props;
        const currentTicket = get(this.props, 'selectedTicket', 0);
        return (
            <div>
                <SupportStyle>
                    <div className="ticket-list">
                        <Row>
                            <Col span={14}>
                                <h1><FormattedMessage id="support.required" /></h1>
                            </Col>
                            <Col span={10}>
                                <CustomButton
                                    color="blue"
                                    size="large"
                                    onClick={onClickNewRequest}
                                >
                                    <FormattedMessage id="support.buttonRequest" />
                                </CustomButton>
                            </Col>
                        </Row>
                        {
                            map(sortBy(ticketList, 'updated_at').reverse(), (item) => {
                                return (
                                    <div
                                        className={currentTicket === item.id ? 'selected-ticket-item  ticket-item' : 'ticket-item'}
                                        onClick={
                                            () => currentTicket === item.id
                                                ? null
                                                : onClickTicketItem(item.number, item.id)
                                        }
                                    >
                                        <h2>{item.title}</h2>
                                        <ul>
                                            <li>
                                                #
                                                {item.number}
                                            </li>
                                            <li> - </li>
                                            <li>
                                                Last update:
                                                &nbsp;
                                                { moment(item.updated_at).format('YYYY-MM-DD HH:mm') }
                                            </li>
                                        </ul>
                                        <label>
                                            <FormattedMessage id="support.state" />
                                            :&nbsp;
                                            {map(ticketStatusList, item_state => {
                                                if (item.state_id === item_state.id) {
                                                    return (
                                                        <span
                                                            className={
                                                                item_state.name === 'new'
                                                                    ? 'red-color'
                                                                    : item_state.name === 'closed'
                                                                        ? 'green-color'
                                                                        : 'blue-color'
                                                            }
                                                        >
                                                            {item_state.name}
                                                        </span>
                                                    );
                                                }
                                            })}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </SupportStyle>
            </div>
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
        ticketStatusList: get(state.SupportReducer, 'ticketStatusList', {}),
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setErrors: formActions.setErrors,
        getTicketStatus: actions.getTicketStatus,
    }, dispatch);
}

SupportList.propTypes = {
    ticketList: PropTypes.arrayOf(PropTypes.object).isRequired,
    ticketStatusList: PropTypes.arrayOf(PropTypes.object).isRequired,
    getTicketStatus: PropTypes.func.isRequired,
    onClickTicketItem: PropTypes.func.isRequired,
    onClickNewRequest: PropTypes.func.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SupportList));
