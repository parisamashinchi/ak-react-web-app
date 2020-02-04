import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Col, Popover, Row } from 'antd';
import PropTypes from 'prop-types';
import CustomButton from 'components/ui-components/button/Button';
import PageHeaderStyle from './assets/styles/PageHeader.style';

const PageHeader = (props) => {
    const {
        children,
        title,
        icon,
        header,
        headerDesc,
        headerStatus,
        buttonText,
        buttonAction,
        buttonColor,
        buttonText2,
        buttonAction2,
        buttonColor2,
        dynamicItems,
        cost,
        noHeader,
        instanceButtonClass,
        headerID,
    } = props;
    return (
        <PageHeaderStyle>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {
                noHeader
                    ? null
                    : (
                        <Row className="header-row">
                            <Col
                                xs={11}
                                sm={{ span: 10 }}
                                md={{ span: 9 }}
                                lg={{ span: 8 }}
                                xl={{ span: 7 }}
                            >
                                <Row>
                                    {
                                        icon
                                            ? (
                                                <img className="header-img" src={icon} alt={<FormattedMessage id="volume.header" />} />
                                            )
                                            : null
                                    }
                                    <span className="text-wrapper">
                                        {window.location.pathname.includes(headerID)
                                            ? (
                                                <Popover
                                                    placement="top"
                                                    content={header}
                                                >
                                                    <h1 className="header-title">
                                                        {header}
                                                    </h1>
                                                </Popover>
                                            )
                                            :
                                            (
                                                <h1 className="header-title">
                                                    {header}
                                                </h1>
                                            )
                                        }
                                        <h3 className="header-desc">
                                            {headerDesc}
                                        </h3>
                                        <h2 className="header-status">
                                            {headerStatus}
                                        </h2>
                                    </span>
                                </Row>
                            </Col>
                            <Col span={10}>
                                {dynamicItems}
                            </Col>
                            {buttonText
                        && (
                            buttonText2
                                ? (
                                    <Col
                                        xs={5}
                                        sm={{ span: 5 }}
                                        md={{ span: 5 }}
                                        lg={{ span: 4 }}
                                        xl={{ span: 4 }}
                                        xxl={{ span: 3 }}
                                        className="btn-wrapper"
                                    >
                                        <CustomButton
                                            id="create-button"
                                            className={instanceButtonClass}
                                            color={buttonColor ? buttonColor : 'blue'}
                                            size="large"
                                            onClick={buttonAction}
                                        >
                                            {buttonText}
                                        </CustomButton>
                                    </Col>
                                )
                                : (
                                    <Col
                                        xs={5}
                                        sm={{ span: 5 }}
                                        md={{ span: 5 }}
                                        lg={{ span: 5 }}
                                        xl={{ span: 6 }}
                                        xxl={{ span: 7 }}
                                        className="btn-wrapper"
                                    >
                                        <CustomButton
                                            id="create-button"
                                            className={instanceButtonClass}
                                            color={buttonColor ? buttonColor : 'blue'}
                                            size="large"
                                            onClick={buttonAction}
                                        >
                                            {buttonText}
                                        </CustomButton>
                                    </Col>
                                ))
                            }
                            {buttonText2
                            && (
                                <Col
                                    xs={5}
                                    sm={{ span: 5 }}
                                    md={{ span: 5 }}
                                    lg={{ span: 5 }}
                                    xl={{ span: 6 }}
                                    xxl={{ span: 7 }}
                                    className="btn-wrapper"
                                >
                                    <CustomButton
                                        id="create-button"
                                        className={instanceButtonClass}
                                        color={buttonColor2 ? buttonColor2 : 'blue'}
                                        size="large"
                                        onClick={buttonAction2}
                                    >
                                        {buttonText2}
                                    </CustomButton>
                                </Col>
                            )
                            }
                            {cost
                            && (
                                <Col span={4}>
                                    {cost}
                                </Col>
                            )
                            }
                        </Row>
                    )
            }
            {children}
        </PageHeaderStyle>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    icon: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    headerDesc: PropTypes.string.isRequired,
    headerStatus: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonAction: PropTypes.func.isRequired,
    dynamicItems: PropTypes.node.isRequired,
    cost: PropTypes.node.isRequired,
    noHeader: PropTypes.bool.isRequired,
    instanceButtonClass: PropTypes.string.isRequired,
    headerID: PropTypes.string.isRequired,
};

export default PageHeader;
