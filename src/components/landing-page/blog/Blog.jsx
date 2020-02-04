import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import BlogStyle from './assets/styles/blog.style';

// is a component to get Blogs dynamically and show them
export class Blog extends Component {
    render () {
        const { intl } = this.props;
        return (
            <div id="blogMenu">
                <BlogStyle>
                    <h2 className="align-center mb-40">
                        blogs
                    </h2>
                    <Row>
                        <Col
                            xs={24}
                        >
                            <div className="blog">
                                <Col
                                    xs={{ span: 24 }}
                                    md={{ span: 9 }}
                                    xxl={{ span: 8 }}
                                >
                                    <div className="grid box-1">
                                        <a>
                                            <figure className="effect-chico">
                                                <figcaption className="first">
                                                    <i className="fa fa-arrow-right" />
                                                    <h2>
                                                        blog 1
                                                    </h2>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </div>
                                    <div className="grid box-2">
                                        <a>
                                            <figure className="effect-chico">
                                                <figcaption className="fourth">
                                                    <i className="fa fa-arrow-right" />
                                                    <h2>
                                                        blog 2
                                                    </h2>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </div>
                                </Col>
                                <Col
                                    xs={{ span: 24 }}
                                    md={{ span: 7 }}
                                    xxl={{ span: 6 }}
                                >
                                    <div className="grid box-3">
                                        <a>
                                            <figure className="effect-chico">
                                                <figcaption className="second">
                                                    <i className="fa fa-arrow-right" />
                                                    <h2>
                                                        blog 3
                                                    </h2>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </div>
                                    <div className="grid box-4">
                                        <a>
                                            <figure className="effect-chico">
                                                <figcaption className="first">
                                                    <i className="fa fa-arrow-right" />
                                                    <h2>
                                                        blog 4
                                                    </h2>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </div>
                                </Col>
                                <Col
                                    xs={{ span: 24 }}
                                    md={{ span: 8 }}
                                    xxl={{ span: 10 }}
                                >
                                    <div className="grid box-5">
                                        <a>
                                            <figure className="effect-chico">
                                                <figcaption className="second">
                                                    <i className="fa fa-arrow-right" />
                                                    <h2>
                                                        blog 5
                                                    </h2>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </div>
                                    <div className="grid box-6">
                                        <a>
                                            <figure className="effect-chico">
                                                <figcaption className="third">
                                                    <i className="fa fa-arrow-right" />
                                                    <h2>
                                                        blog 6
                                                    </h2>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </BlogStyle>
            </div>
        );
    }
};

Blog.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Blog);
