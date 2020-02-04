import React, {Component} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {Row, Col} from 'antd';
import {history} from 'src/routers/AppRouter';
import {direction} from 'containers/layouts/withDirection';
import CustomButton from 'components/ui-components/button/Button';
import HeadStyle from './assets/styles/head.style';
import {earth} from './assets/earth';

// is a component wo show data at top of landing page
export class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            earth: false,
        };
    }

    componentDidUpdate(nextProps, nextState) {
        const {langLoading, loadData} = this.props;
        if (document.querySelector('#earth') && !this.state.earth) {
            const selector = document.querySelector('#earth');
            earth(selector);
            this.setState({
                earth: true,
            });
        }
    }

    render() {
        const {intl} = this.props;
        const responsive = {
            0: {items: 1},
            600: {items: 1},
            1024: {items: 1},
            1500: {items: 1},
        };
        return (
            <HeadStyle id="services">
                <div className="main-banner">
                    <Row>
                        <Col
                            xs={{span: 24}}
                            sm={{span: 12}}
                            className="head-wrapper"
                        >
                            <div className="head">
                                <h1>{intl.formatMessage({id: 'head.title'})}</h1>
                                <div className="mt-30">
                                    <p>
                                        {intl.formatMessage({id: 'head.summery'})}
                                    </p>
                                </div>
                                <Col
                                    xs={5}
                                    sm={0}
                                />
                                <Col
                                    xs={14}
                                    sm={{span: 20}}
                                    md={{span: 18}}
                                    lg={{span: 14}}
                                    xl={{span: 18}}
                                    xxl={{span: 14}}
                                >

                                </Col>
                                <Col
                                    xs={5}
                                    sm={0}
                                />
                            </div>
                        </Col>
                        <Col
                            xs={{span: 0}}
                            sm={{span: 12}}
                            xl={{span: 12}}
                        >
                        </Col>
                    </Row>
                </div>
            </HeadStyle>
        );
    }
}

Head.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Head);
