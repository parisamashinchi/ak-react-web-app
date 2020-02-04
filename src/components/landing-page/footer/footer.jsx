import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import FooterStyle from './assets/styles/footer.style';
import { alert } from 'containers/alert/Alerts';
import { history } from '../../../routers/AppRouter';
import LazyLoad from 'react-lazyload';

export const FooterComponent = (props) => {
    const { intl, FAQ } = props;
    const handleAlert = () => {
        alert('info', 'create.comingSoon')
    };
    // add selected class to navbar item and scroll to its part in page
    const handleClick = (element) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (FAQ) {
            history.push('/');
            setTimeout(
                () => window.scrollTo({
                    top: document.querySelector(`#${element}`).getClientRects()[0].top + scrollTop - 100 ,
                    behavior: 'smooth'
                }),
                3000
            )
        } else {
            const elementTop = document.querySelector(`#${element}`).getClientRects()[0].top;
            window.scrollTo({
                top: elementTop + scrollTop - 100 ,
                behavior: 'smooth'
            });
        }
    };
    return (
        <FooterStyle id="contactUsMenu">
            <Row className="footer-1">
                <div className="footer-wrapper">
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 5 }}
                        xxl={{ span: 6 }}
                    >
                        <ul>
                            <li>
                                <a>
                                    {intl.formatMessage({ id:'footer.downloadCatalog' })}
                                </a>
                            </li>
                            <li>
                                <a>
                                    {intl.formatMessage({ id:'footer' })}
                                </a>
                            </li>
                            <li>
                                <a>
                                    {intl.formatMessage({ id:'footer.jobOpportunities' })}
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 5 }}
                        xxl={{ span: 6 }}
                    >
                        <ul>
                            <li>
                                <a onClick={() => handleClick('serviceMenu')}>
                                    {intl.formatMessage({ id:'footer.services' })}
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleClick('pricingMenu')}>
                                    {intl.formatMessage({ id:'footer.pricing' })}
                                </a>
                            </li>
                            <li>
                                <a>
                                    {intl.formatMessage({ id:'footer.Blog' })}
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 5 }}
                        xxl={{ span: 6 }}
                    >
                        <ul>
                            <li>
                                <NavLink exact to="/calculator" target="_blank">
                                    {intl.formatMessage({ id:'footer.calculator' })}
                                </NavLink>
                            </li>
                            <li>
                                <a onClick={handleAlert}>
                                    {intl.formatMessage({ id:'footer.aboutUs' })}
                                </a>
                            </li>
                            <li>
                                <NavLink exact to="/faq" target="_blank">
                                    {intl.formatMessage({ id:'footer.FAQ' })}
                                </NavLink>
                            </li>
                        </ul>
                    </Col>
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 7 }}
                        xxl={{ span: 6 }}
                    >
                        <ul>
                            <li>
                                <i className="fa fa-envelope" />
                                <a>
                                    example@gmail.com
                                </a>
                            </li>
                            <li>
                                <i className="fa fa-phone" />
                                <a href="tel:+02122221313">
                                    02122221313
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                >
                                    <i className="fa fa-map-marker" />
                                    tehran
                                </a>
                            </li>
                        </ul>
                    </Col>
                </div>
            </Row>
            <LazyLoad>
                <Row className="footer-3">
                    <div className="footer-wrapper">
                        <Col
                            className="text"
                            xs={{ span: 24 }}
                            md={{ span: 16 }}
                            lg={{ span: 16 }}
                            xl={{ span: 14 }}
                            xxl={{ span: 12 }}
                        >
                            <p>
                                description
                            </p>
                            <p className="copyright">
                                {intl.formatMessage({ id:'footer.footer6' })}
                            </p>
                        </Col>
                        <Col
                            className="logo"
                            xs={{ span: 24 }}
                            md={{ span: 8 }}
                            lg={{ span: 8 }}
                            xl={{ span: 10 }}
                            xxl={{ span: 12 }}
                        >
                        </Col>
                    </div>
                </Row>
            </LazyLoad>
        </FooterStyle>
    );
};

FooterComponent.propTypes = {
    intl: intlShape.isRequired,
    lang: PropTypes.string.isRequired,
};

export default injectIntl(FooterComponent);
