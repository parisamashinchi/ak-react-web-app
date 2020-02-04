import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import DashboardStyle from './assets/styles/dashboard.style';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
    });
}

export class Dashboard extends Component {
    render() {
        return(
            <DashboardStyle>
                <Row>
                    <Col span={14} className="graphs">
                        <div>
                        </div>
                    </Col>
                    <Col span={9} className="graphs">
                        <div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={9} className="graphs graph3">
                        <div>
                            Virtual
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                    </Col>
                    <Col span={14} className="graphs">
                    </Col>
                </Row>
            </DashboardStyle>
        );
    }
}

export default Dashboard;
