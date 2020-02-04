import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import LoadingStyle from 'containers/loading/assets/styles/loading.style';
import * as loadingActions from 'containers/loading/actions';
import * as languageActions from 'containers/language/actions';
import * as profileActions from '../profile/actions';
import NavBar from './navbar/NavBar';
import Head from './head/Head';
import Blog from './blog/Blog';
import FooterComponent from './footer/footer';
import LandingStyle from './assets/styles/landing.style';
import en from './translations/en.json';
import fa from './translations/fa.json';

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    fa,
    en,
};

const { Header, Footer, Content } = Layout;

/*
LandingPage is a component for to show components and handle loading
*/
export class LandingPage extends Component {
    constructor(props) {
        super(props);
        /*
        class to handle full page loading
        */
        this.state = {
            class: 'loading',
        };
    }

    componentWillMount() {
        const { showLoading } = this.props;
        /*
        runs loading of page
        */
        showLoading({
            showLoader: false,
        })
    };

    componentDidMount() {
        /*
        getUserProfile to get user data to show name
        isAuth to check user auth status
        setLocaleLoading to show loading in case of change language
        lang show current language
        */
        const {
            getUserProfile,
            isAuth,
            setLocaleLoading,
            lang,
        } = this.props;
        if (isAuth) {
            getUserProfile();
        };
        const htmlLang = document.getElementsByTagName('html')[0].getAttribute('lang');
        if (lang !== htmlLang) {
            window.location.reload();
        }
        setTimeout(
            () => this.setState({
                class: 'loading-off',
            }),
            2000,
        );
        setTimeout(
            () => setLocaleLoading(false),
            2000,
        );
    }

    render() {
        /*
        loadData contains data of loading
        langLoading to show loading in case of change language
        lang show current language
        */
        const { lang, langLoading, loadData } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Helmet>
                        <title>AK Web App</title>
                        <meta
                            name="description"
                            content={
                                lang === 'fa'
                                ? 'AK Web App'
                                : 'AK Web App'
                            }
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=yes minimum-scale=1 maximum-scale=3"
                        />
                    </Helmet>
                    <LoadingStyle>
                        { this.state.class === 'loading' || langLoading
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
                        <LandingStyle>
                            <Layout>
                                <Header>
                                    <NavBar
                                        {...this.props}
                                        FAQ={false}
                                        calculator={false}
                                    />
                                </Header>
                                <Content>
                                    <Head
                                        lang={lang}
                                        langLoading={langLoading}
                                        loadData={loadData}
                                    />
                                    <Blog />
                                </Content>
                                <Footer>
                                    <FooterComponent />
                                </Footer>
                            </Layout>
                        </LandingStyle>
                    </LoadingStyle>
                </div>
            </IntlProvider>
        );
    }
};

const mapStateToProps = state => ({
    lang: state.locale.lang,
    langLoading: state.locale.langLoading,
    isAuth: state.Authentication.isAuth,
    loadData: get(state.LoadingReducer, 'loadData', {}),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserProfile: profileActions.getUserProfile,
        showLoading: loadingActions.showLoading,
        setLocaleLoading: languageActions.setLocaleLoading,
    }, dispatch);
}

LandingPage.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
