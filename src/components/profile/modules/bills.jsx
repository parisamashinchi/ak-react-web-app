import React, { Component } from 'react';
import {
    FormattedMessage,
    injectIntl,
    IntlProvider,
} from 'react-intl';
import { Col, Tabs } from 'antd';
import { Menu } from "antd/lib/menu";
import {
    CartesianGrid,
    BarChart,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    Bar,
    ResponsiveContainer,
} from "recharts";
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';
import ProfileStyle from '../assets/styles/profile.style';
import BillTable from './billTable';
import * as actions from '../actions';
import * as constants from '../constants';
import en from '../translations/en.json';
import fa from '../translations/fa.json';

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    fa,
    en,
};
const { TabPane } = Tabs;

/*
Bills is component for showing list of bill to user.
 */
class Bills extends Component {
    componentDidMount() {
        const { getReportDaily, getReportWeekly, getReportMonthly} = this.props;
        getReportDaily();
        getReportWeekly();
        getReportMonthly();
    };

//CreateInvoice is function to post bill without data to show message
    CreateInvoice = () => {
        const { setBill } = this.props;
        setBill();
    };

    render() {
        // $lang contains selected language and IntlProvider use it to show needed language
        const { lang, billReportDaily, billReportWeekly, billReportMonthly } = this.props;
        const dailyRamUnit = get(billReportDaily[0], 'ram_unit.notation', '');
        const weeklyRamUnit = get(billReportWeekly[0], 'ram_unit.notation', '');
        const monthlyRamUnit = get(billReportMonthly[0], 'ram_unit.notation', '');
        const dailyCPUUnit = get(billReportDaily[0], 'cpu_unit.notation', '');
        const weeklyCPUUnit = get(billReportWeekly[0], 'cpu_unit.notation', '');
        const monthlyCPUUnit = get(billReportMonthly[0], 'cpu_unit.notation', '');
        const dailyDiskUnit = get(billReportDaily[0], 'disk_unit.notation', '');
        const weeklyDiskUnit = get(billReportWeekly[0], 'ram_unit.notation', '');
        const monthlyDiskUnit = get(billReportMonthly[0], 'ram_unit.notation', '');
        const filteredDailyReport = map(billReportDaily, item => {
            return {
                datetime: item.datetime,
                cpu: item.cpu.toFixed(2),
                ram: item.ram.toFixed(2),
                disk: item.disk.toFixed(2),
                label: item.label,
            }
        });
        const filteredWeeklyReport = map(billReportWeekly, item => {
            return {
                datetime: item.datetime,
                cpu: item.cpu.toFixed(2),
                ram: item.ram.toFixed(2),
                disk: item.disk.toFixed(2),
                label: item.label,
            }
        });
        const filteredMonthlyReport = map(billReportMonthly, item => {
            return {
                datetime: item.datetime,
                cpu: item.cpu.toFixed(2),
                ram: item.ram.toFixed(2),
                disk: item.disk.toFixed(2),
                label: item.label,
            }
        });
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        <title>Bills</title>
                    </Helmet>
                    <ProfileStyle  className="content">
                        <Col span={11} className="bill-chart">
                            <Col span={6}>
                                <h3><FormattedMessage id="profile.cost"  /></h3>
                            </Col>
                            <Col span={18}>
                                <Tabs type="card">
                                    <TabPane tab="Last day" key="1" className="container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={billReportDaily}
                                                      barSize={10}
                                            >
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#659eff" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#443a7b" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="datetime" tickFormatter={(datetime) => moment(datetime).format('HH')} padding={{ left: 5 }} width={50} padding={{ left: 5 }} width={50}/>
                                                <YAxis dataKey="total_payment" />
                                                <Tooltip
                                                    labelFormatter={function(value) {
                                                        return `Date: ${moment(value).format('MMMM Do YYYY, h') }`;
                                                    }}
                                                />
                                                <Legend />
                                                <Bar dataKey="total_payment" name={`Cost ${constants.CURRENCY}`} fill="url(#colorUv)"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </TabPane>
                                    <TabPane tab="Last week" key="2" className="container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={billReportWeekly}
                                                      barSize={10}
                                            >
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#659eff" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#443a7b" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="datetime" tickFormatter={(datetime) => moment(datetime).format('ddd')}/>
                                                <YAxis dataKey="total_payment"/>
                                                <Tooltip
                                                    labelFormatter={function(value) {
                                                        return `Date: ${moment(value).format('MMMM Do YYYY') }`;
                                                    }}
                                                />
                                                <Legend />
                                                <Bar dataKey="total_payment" name={`Cost ${constants.CURRENCY}`} fill="url(#colorUv)"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </TabPane>
                                    <TabPane tab="Last month" key="3" className="container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={billReportMonthly}
                                                      barSize={10}
                                            >
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#659eff" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#443a7b" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="datetime" tickFormatter={(datetime) => moment(datetime).format('DD')}/>
                                                <YAxis dataKey="total_payment"/>
                                                <Tooltip
                                                    labelFormatter={function(value) {
                                                        return `Date: ${moment(value).format('MMMM Do YYYY') }`;
                                                    }}
                                                />
                                                <Legend />
                                                <Bar dataKey="total_payment" name={`Cost ${constants.CURRENCY}`} fill="url(#colorUv)"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Col>
                        <Col span={11} className="bill-chart">
                            <Col span={6}>
                                <h3><FormattedMessage id="profile.usage"  /></h3>
                            </Col>
                            <Col span={18}>
                                <Tabs type="card">
                                    <TabPane tab="Last day" key="1" className="container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={800}
                                                height={300}
                                                data={filteredDailyReport}
                                            >
                                                <XAxis dataKey="datetime" tickFormatter={(datetime) => moment(datetime).format('HH')} padding={{left: 30, right: 30}}/>
                                                <YAxis />
                                                <Tooltip
                                                    labelFormatter={function(value) {
                                                        return `Date: ${moment(value).format('MMMM Do YYYY, h') }`;
                                                    }}
                                                />
                                                <Legend />
                                                <Line type="monotone"
                                                      dataKey="ram"
                                                      stroke="#2fcbbb"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`RAM (${dailyRamUnit})`}
                                                />
                                                <Line type="monotone"
                                                      dataKey="disk"
                                                      stroke="#64c0f0"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`Disk (${dailyDiskUnit})`}
                                                />
                                                <Line type="monotone"
                                                      dataKey="cpu"
                                                      stroke="#c45f67"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`CPU (${dailyCPUUnit})`}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </TabPane>
                                    <TabPane tab="Last week" key="2" className="container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={800}
                                                height={300}
                                                data={filteredWeeklyReport}
                                            >
                                                <XAxis dataKey="datetime" tickFormatter={(datetime) => moment(datetime).format('ddd')} padding={{left: 30, right: 30}}/>
                                                <YAxis />
                                                <Tooltip
                                                    labelFormatter={function(value) {
                                                        return `Date: ${moment(value).format('MMMM Do YYYY') }`;
                                                    }}
                                                />
                                                <Legend />
                                                <Line type="monotone"
                                                      dataKey="ram"
                                                      stroke="#2fcbbb"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`RAM (${weeklyRamUnit})`}
                                                />
                                                <Line type="monotone"
                                                      dataKey="disk"
                                                      stroke="#64c0f0"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`Disk (${weeklyDiskUnit})`}
                                                />
                                                <Line type="monotone"
                                                      dataKey="cpu"
                                                      name={`CPU (${weeklyCPUUnit})`}
                                                      stroke="#c45f67"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </TabPane>
                                    <TabPane tab="Last month" key="3" className="container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={800}
                                                height={300}
                                                data={filteredMonthlyReport}
                                            >
                                                <XAxis dataKey="datetime" tickFormatter={(datetime) => moment(datetime).format('DD')} padding={{left: 30, right: 30}}/>
                                                <YAxis />
                                                <Tooltip
                                                    labelFormatter={function(value) {
                                                        return `Date: ${moment(value).format('MMMM Do YYYY') }`;
                                                    }}
                                                />
                                                <Legend/>
                                                <Line type="monotone"
                                                      dataKey="ram"
                                                      stroke="#2fcbbb"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`RAM (${monthlyRamUnit})`}
                                                />
                                                <Line type="monotone"
                                                      dataKey="disk"
                                                      stroke="#64c0f0"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`Disk (${monthlyDiskUnit})`}
                                                />
                                                <Line type="monotone"
                                                      dataKey="cpu"
                                                      stroke="#c45f67"
                                                      activeDot={{r: 8}}
                                                      strokeWidth={3}
                                                      name={`CPU (${monthlyCPUUnit})`}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Col>
                        <Col span={24} className="bill-button">
                            {/*<CustomButton
                                size="large"
                                color="blue"
                                onClick={this.CreateInvoice}
                            >
                                <FormattedMessage id="profile.createInvoice" />
                            </CustomButton>*/}
                        </Col>
                        <Col span={24} >
                            <BillTable />
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
 */
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
        billReportDaily: get(state.WalletReducer, 'billReportDaily' , []),
        billReportWeekly: get(state.WalletReducer, 'billReportWeekly' , []),
        billReportMonthly: get(state.WalletReducer, 'billReportMonthly' , []),
    };
};
// $setBill is an action to set bill to post bill
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setBill: actions.setBill,
        getReportDaily: actions.getReportDaily,
        getReportWeekly: actions.getReportWeekly,
        getReportMonthly: actions.getReportMonthly,
    }, dispatch);
}

Bills.propTypes = {
    lang: PropTypes.string.isRequired,
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Bills));
