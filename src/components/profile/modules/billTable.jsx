import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Popover, Tooltip } from 'antd';
import { Menu } from "antd/lib/menu";
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import round from 'lodash/round';
import { Scrollbars } from 'react-custom-scrollbars';
import { createTable, itemWithUnit } from 'containers/table/Table';
import { returnBoolean } from 'src/utils/returnBoolean';
import { spiritNumber } from 'src/utils/spiritNumber';
import { moments } from 'src/utils/moment';
import * as images from '../assets/images';
import * as constants from '../constants';
import * as actions from '../actions';
import DrawerWrapper from './Drawer';
import lowerCase from 'lodash/lowerCase';

/*
BillTable is component for showing list of bill to user.
 */
class BillTable extends Component {
    constructor(props) {
        super(props);
        this.table = createTable(constants.BILL);
        this.state = {
            visible: '',
            lastPosition: 0,
        }
    };

    componentDidMount() {
        document.querySelector('.profile-back').addEventListener('scroll', this.hidePopover);
    };

    componentWillUnmount() {
        document.querySelector('.profile-back').removeEventListener('scroll', this.hidePopover);
    };

    hidePopover = ()=> {
        if(!isEmpty( document.querySelector('.ant-popover'))) {
            this.setState({
                visible: '',
            });
        }
    };

    handleVisibleChangePopover = (id) => {
        if(this.state.visible === id ){
            this.setState({ visible: '' });
        } else {
            this.setState({ visible: id });
        }
    };

    render() {
        // $lang contains selected language and IntlProvider use it to show needed language
        const Table = this.table;
        const tableConf = {
            url: constants.GET_BILLS_URL,
            columns: [
                {
                    title: 'Invoice ID',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: itemWithUnit('Total Cost', constants.CURRENCY),
                    dataIndex: 'total_cost',
                    key: 'total_cost',
                    render: value => spiritNumber(value),
                },
                {
                    title: 'From Date',
                    dataIndex: 'start_datetime',
                    key: 'start_datetime',
                    render: value => moments(value),
                },
                {
                    title: 'To Date',
                    dataIndex: 'end_datetime',
                    key: 'end_datetime',
                    render: value => moments(value),
                },
                {
                    title: 'Status',
                    dataIndex: 'is_paid',
                    key: 'is_paid',
                    render: value => returnBoolean(value),
                },
                {
                    title: 'Actions',
                    dataIndex: 'actions',
                    key: 'actions',
                    render: (value, itemData) => (
                        <span>
                            <Tooltip
                                title="Bill detail"
                                placement="bottom"
                            >
                                <Popover content={<div className="content-wrapper">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th><FormattedMessage id="bill.popover.name"/></th>
                                            <th><FormattedMessage id="bill.popover.consumption"/></th>
                                            <th>
                                                <FormattedMessage id="bill.popover.price"/>
                                                <br />
                                                <span className="unit">
                                                    ({constants.CURRENCY})
                                                </span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {map(itemData.items, item => {
                                            return <tr>
                                                <td>{item.resource_type.name}</td>
                                                <td>
                                                    {item.resource_type.name === 'Tax' ? '9%' : round(item.amount, 2)}
                                                    {
                                                        !isEmpty(item.unit)
                                                        ? item.unit.notation === 'GB/Month'
                                                            ? ' GB/h'
                                                            : item.unit.notation === 'Month'
                                                                ? ' hour'
                                                                : ` ${item.unit.notation}`
                                                        : ''
                                                    }
                                                    </td>
                                                <td>{item.cost === 0 ? 'Free' : spiritNumber(item.cost)}</td>
                                            </tr>
                                        })}

                                        </tbody>
                                    </table>
                                </div>
                                }
                                         placement="bottomRight"
                                         trigger="click"
                                         overlayClassName="bill_popover"
                                         visible={this.state.visible === itemData.id}
                                         onVisibleChange={()=>this.handleVisibleChangePopover(itemData.id)}
                                         overlayStyle={{
                                             width: "460px"
                                         }}
                                >
                                    <button>
                                        <img className="actionIcon" src={images.offEye} />
                                    </button>
                                </Popover>
                            </Tooltip>
                        </span>
                    ),
                },
            ],
        };
        return (
            <Table
                {...tableConf}
                {...this.props}
                hasPaginate={true}
                filter={{
                    time: {
                        startDate: 'start_datetime',
                        endDate: 'end_datetime',
                    },
                    cost: {
                        startCost: 'cost_from',
                        endCost: 'cost_to',
                    },
                    period: 'Daily',
                }}
                defaultFilter={{url: `${constants.GET_BILLS_URL}aggregated/`, filter: {period: 'period=daily'}}}
            />
        );
    }
}

export default BillTable;
