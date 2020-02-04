import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import {
    Table,
    DatePicker,
    Menu,
    Dropdown,
    Icon,
    Popover,
    InputNumber,
    Col,
    Row,
} from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import get from 'lodash/get';
import split from 'lodash/split';
import lowerCase from 'lodash/lowerCase';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomButton from '../../components/ui-components/button/Button';
import TableStyle, { WithPictureStyle, SizeWrapper } from './assets/styles/table.style';
import * as actions from './actions';

/**
 * in cases that we need to show data with icon in table we use
 * itemWithIcon in render of that column
 * @param item contains an object with icon, title and possible detail
 * @param image contains url of static image
 * @param details contains an object
 * @returns react component contains image and data with style
 */
export const itemWithIcon = (item, image, details) => {
    const titles = ['cpu', 'ram', 'disk'];
    return (
        <WithPictureStyle>
            <img src={image} alt="item.icon" />
            <div className="title">
                <Ellipsis tooltip={true} length={8}>{item.name}</Ellipsis>
            </div>
            <div className="detail">
                {
                    !isEmpty(details)
                        ? map(titles, value => (
                            <span>
                        { value.toUpperCase() }
                                :
                                {`${details[value]} ${'disk' !== value ? '. ' : ''} `}
                    </span>
                        ))
                        : null
                }
            </div>
        </WithPictureStyle>
    );
};

export const itemWithUnit = (title, unit) => {
    return (
        <SizeWrapper>
            <div className="title">{title}</div>
            <div className="unit">({unit})</div>
        </SizeWrapper>
    );
};

/**
 * in cases that we need sort table
 * sortByalph in render of that column
 * @param a contains sortable item of data
 * @param b contains sortable item of data
 * @returns modify sort of items
 */
export const sortByalph = (a, b) => {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 0;
};

/*
Table container to show customize table in every component
 */
export const createTable = (name) => {
    class CustomTable extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentPage: 0,
                startTime: null, // for filters query
                endTime: null, // for filters query
                dropDownValue: get(props, 'filter.period', ''), // for filters query
                fromCost: 0, // for filters query
                toCost: 0, // for filters query
                otherFilters: '', // for filters query
                otherURL: get(props, 'defaultFilter.url', ''),
                paginate: false,
            }
        }

        // get data from server by dynamic data from component
        componentDidMount() {
            const { getData, url, interval, setFilter, defaultFilter } = this.props;
            if (defaultFilter) {
                setFilter(defaultFilter.url, defaultFilter.filter);
            } else {
                setFilter('', {});
            }
            if (!!interval) {
                this.fetchIntervalData();
                this.interval = setInterval(this.fetchIntervalData, interval * 1000);
            } else {
                getData(name, url);
            }
            // change sort up icon
            if (document.querySelector('.ant-table-column-sort')) {
                document.querySelector('.anticon-caret-up').classList.add('anticon-up');
                document.querySelector('.anticon-caret-up').classList.remove('anticon-caret-up');
                document.querySelector('.anticon-up > svg').setAttribute('data-icon', 'up');
                document.querySelector('.anticon-up > svg > path').setAttribute('d', 'M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 0 0 140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z');
                // change sort down icon
                document.querySelector('.anticon-caret-down').classList.add('anticon-down');
                document.querySelector('.anticon-caret-down').classList.remove('anticon-caret-down');
                document.querySelector('.anticon-down > svg').setAttribute('data-icon', 'down');
                document.querySelector('.anticon-down > svg > path').setAttribute('d', 'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z');
            }
        }

        componentWillUnmount() {
            const { setFilter, fetchTable } = this.props;
            setFilter('', {});
            fetchTable(name, []);
            /*
          when InstanceList unmounts from the page we broke continuous refreshing down.
          */
            clearInterval(this.interval);
        }

        fetchIntervalData = () => {
            const { getData, url } = this.props;
            getData(name, url, 'interval');
        };

        fetchPaginateData = (page) => {
            const { getData, url, setFilter, filters } = this.props;
            this.setState({paginate: true});
            Object.assign(filters, {pagination: `page=${page}`});
            setFilter(this.state.otherURL ? this.state.otherURL : url, {...filters});
            getData(name, url, 'interval');
        };

        getPaginationConfig = () => {
            const { tableData, tableDetail } = this.props;
            return {
                total: tableDetail.count || tableData.length,
                onChange: this.fetchPaginateData,
                current: parseInt(tableDetail.current_page),
            };
        };

        defaultPaginationConfig = () => {
            const { tableData } = this.props;
            return {
                total: tableData.length,
            };
        };

        onFilter = (value, type) => {
            const { getData, url, filter, setFilter, filters } = this.props;
            if (type === 'startDate') {
                this.setState({
                    startTime: value
                });
            } else {
                this.setState({
                    endTime: value
                });
            }
            const timeVars = get(filter, 'time', {startDate: 'start_datetime', endDate: 'end_datetime'});
            const query = this.state.startTime !== null && type === 'endDate' && value !== null
                ? `${timeVars.startDate}=${this.state.startTime}&${timeVars.endDate}=${value}`
                : this.state.startTime !== null && type === 'endDate'
                    ? `${timeVars.startDate}=${this.state.startTime}`
                    : this.state.endTime !== null && type === 'startDate' && value !== null
                        ? `${timeVars.endDate}=${this.state.endTime}&${timeVars.startDate}=${value}`
                        : this.state.endTime !== null && type === 'startDate'
                            ? `${timeVars.endDate}=${this.state.endTime}`
                            : value !== null
                                ? `${timeVars[type]}=${value}`
                                : undefined;
            if (query) {
                Object.assign(filters, {date: query});
                delete filters.pagination;
            } else {
                delete filters.date;
                delete filters.pagination;
            }
            setFilter(this.state.otherURL ? this.state.otherURL : url, {...filters});
            getData(name, url);
        };

        dropDownFilter = (value) => {
            const { getData, url, setFilter, filters } = this.props;
            this.setState({
                dropDownValue: value
            });
            const filterURL = value === 'Hourly' ? url : `${url}aggregated/`;
            const query = value === 'Hourly' ? undefined : `period=${lowerCase(value)}`;
            this.setState({
                otherURL: filterURL,
            });
            if (query) {
                Object.assign(filters, { period: query });
                delete filters.pagination;
            } else {
                delete filters.period;
                delete filters.pagination;
            }
            setFilter(filterURL, {...filters});
            getData(name, url);
        };

        costFilter = () => {
            const { getData, url, filter, setFilter, filters } = this.props;
            const costVars = get(filter, 'cost', {startCost: 'cost_from', endCost: 'cost_to',});
            const query = this.state.fromCost !== 0 && this.state.toCost !== 0 && this.state.fromCost !== null && this.state.toCost !== null
                ? `${costVars.startCost}=${this.state.fromCost}&${costVars.endCost}=${this.state.toCost}`
                : this.state.fromCost !== 0 && this.state.fromCost !== null
                    ? `${costVars.startCost}=${this.state.fromCost}`
                    : this.state.toCost !== 0 && this.state.toCost !== '∞' && this.state.toCost !== null
                        ? `${costVars.endCost}=${this.state.toCost}`
                        : undefined;
            if (query) {
                Object.assign(filters, { cost: query });
                delete filters.pagination;
            } else {
                delete filters.cost;
                delete filters.pagination;
            }
            setFilter(this.state.otherURL ? this.state.otherURL : url, {...filters});
            getData(name, url);
        };

        render() {
            /*
            tableData contains data form server
             */
            const {
                tableData,
                columns,
                expandedRowRender,
                loadData,
                dataSource,
                filter,
                noPaginate,
            } = this.props;
            const isLoading = loadData.showLoader
                && loadData.requestType === 'get'
                && split(name, '_')[0] !== 'SecurityGroups';
            const btnLoading = loadData.showLoader
                && loadData.requestType === 'get';
            const menu = (
                <Menu>
                    <Menu.Item>
                        <a
                            onClick={() => this.dropDownFilter('Hourly')}
                            className={this.state.dropDownValue === 'Hourly' ? 'selected' : null}
                        >
                            Hourly
                            {
                                this.state.dropDownValue === 'Hourly'
                                && <Icon type="check"/>
                            }
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a
                            onClick={() => this.dropDownFilter('Daily')}
                            className={this.state.dropDownValue === 'Daily' ? 'selected' : null}
                        >
                            Daily
                            {
                                this.state.dropDownValue === 'Daily'
                                && <Icon type="check"/>
                            }
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a
                            onClick={() => this.dropDownFilter('Monthly')}
                            className={this.state.dropDownValue === 'Monthly' ? 'selected' : null}
                        >
                            Monthly
                            {
                                this.state.dropDownValue === 'Monthly'
                                && <Icon type="check"/>
                            }
                        </a>
                    </Menu.Item>
                </Menu>
            );
            const popoverContent = (
                <Row>
                    <Col md={10}>
                    <div className="input-row">
                        <div className="title">From</div>
                        <InputNumber
                            value={this.state.fromCost !== null ? this.state.fromCost : 0}
                            onChange={value => this.setState({fromCost: value})}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </div>
                    </Col>
                    <Col md={4} />
                    <Col md={10}>
                        <div className="input-row">
                            <div className="title">To</div>
                            <InputNumber
                                value={this.state.toCost !== null ? this.state.toCost : 0}
                                onChange={value => this.setState({toCost: value})}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="∞"
                            />
                        </div>
                    </Col>
                    <div className="input-row">
                        <CustomButton
                            color="mediumLightBlue"
                            fullWidth={true}
                            onClick={this.costFilter}
                            loading={btnLoading}
                        >
                            Apply
                        </CustomButton>
                    </div>
                </Row>
            );
            return (
                <TableStyle {...this.props}>
                    {
                        filter
                        && <div className="filters">
                            {
                                filter.period
                                && <Dropdown
                                    overlayClassName="filter-dropdown"
                                    overlay={menu}
                                    placement="bottomLeft"
                                    trigger={['click']}
                                >
                                    <CustomButton color="mediumLightBlue">
                                        <Icon type="down" />
                                        {`Period: ${this.state.dropDownValue}`}
                                    </CustomButton>
                                </Dropdown>
                            }
                            {
                                filter.time
                                && <span className="date-pickers">
                                <DatePicker
                                    onChange={(value) => this.onFilter(value === null ? null : moment(value).unix(), 'endDate')}
                                    placeholder="To date"
                                />
                                <DatePicker
                                    onChange={(value) => this.onFilter(value === null ? null : moment(value).unix(), 'startDate')}
                                    placeholder="From date"
                                />
                            </span>
                            }
                            {
                                filter.cost
                                && <Popover
                                    placement="bottom"
                                    content={popoverContent}
                                    overlayClassName="filter-popover"
                                    trigger="click"
                                >
                                    <CustomButton color="mediumLightBlue">
                                        <Icon type="down" />
                                        {
                                            `Cost:
                                        ${this.state.fromCost !== null
                                                ? this.state.fromCost
                                                : 0} -
                                        ${this.state.toCost === null
                                                ? '∞'
                                                : this.state.toCost === 0
                                                    ? '∞'
                                                    : this.state.toCost}`
                                        }
                                    </CustomButton>
                                </Popover>
                            }
                        </div>
                    }
                    <Table
                        dataSource={dataSource || tableData}
                        columns={columns}
                        rowClassName="editable-row"
                        expandedRowRender={expandedRowRender}
                        loading={isLoading}
                        pagination={noPaginate ? this.defaultPaginationConfig() : this.getPaginationConfig()}
                    />
                </TableStyle>
            );
        }
    }

    /*
     mapDispatchToProps is a function that we
     use to dispatch actions from redux
     getTransactions is action for getting list of transactions from server
     */
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            getData: actions.getData,
            setFilter: actions.setFilter,
            fetchTable: actions.fetchTable,
        }, dispatch);
    }

    const mapStateToProps = state => ({
        lang: state.locale.lang,
        tableData: get(state.TableReducer, name, []),
        tableDetail: get(state.TableReducer, 'tableDetail', {}),
        filters: get(state.TableReducer, 'filter', []),
        loadData: get(state.LoadingReducer, 'loadData', {}),
        dynamicURL: get(state.TableReducer, 'dynamicURL', {}),
        selectedRegion: get(state, 'Authentication.selectedRegion', []),
    });
    CustomTable.propTypes = {
        intl: intlShape.isRequired,
        lang: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        getData: PropTypes.func.isRequired,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        headerButton: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        click: PropTypes.func.isRequired,
    };
    return injectIntl(connect(mapStateToProps, mapDispatchToProps)(CustomTable));
};


createTable.propTypes = {
    name: PropTypes.string.isRequired,
};
