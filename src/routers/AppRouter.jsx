import React, {Component} from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import createHistory from 'history/createBrowserHistory';
import en from 'containers/language/global/en.json';
import fa from 'containers/language/global/fa.json';
import FullPageLoader from '../containers/loading/MainLoading';
import './global.less';
import LayoutPage from 'components/layout/LayoutPage';
import Dashboard from 'components/dashboard/Dashboard';
import PrsInfo from 'components/profile/modules/prsInfo';
import Wallet from 'components/profile/modules/wallet';
import Bills from 'components/profile/modules/bills';
import Affiliation from 'components/profile/modules/affiliation';
import CustomButton from 'components/ui-components/button/Button';
import Support from 'components/support/Support';
import { NotFound } from 'components/layout/404/NotFound';
import ShowError from 'components/layout/error/Error';
import ChangePassword from 'components/profile/modules/changePassword';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'nprogress/nprogress.css';

const messages = {
    fa,
    en,
};

export const history = createHistory();

const LoadableLanding = Loadable({
    loader: () => import('components/landing-page/LandingPage'),
    loading: FullPageLoader,
});

const LoadableAuthentication = Loadable({
    loader: () => import('components/authentication/Authentication'),
    loading: FullPageLoader,
});

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    render() {
        const {
            lang,
        } = this.props;
        if (this.state.error) {
            //render fallback UI
            return (
                <div
                    style={{ margin: '20%', 'textAlign': 'center', direction: 'ltr' }}
                    onClick={() => Sentry.showReportDialog()}
                >
                    <span>
                        Oh! we hadn't faced this error before.
                        Sorry for the inconvenience. We will take care of it.
                    </span>
                    <span>
                        <br />
                        Please check out our
                        for help, or see
                        <a href="/#services"> Services </a>
                        to know the solutions we provide;
                        <br />
                        otherwise, you may go to:
                    </span>
                    <div style={{ 'margin-top': '20px' }}>
                        <CustomButton onClick={() => window.location.replace('/')}>
                            Homepage
                        </CustomButton>
                    </div>
                </div>
            );
        } else {
            //when there's not an error, render children untouched
            return (
                <IntlProvider locale={lang} messages={messages[lang]}>
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={props => (
                                        <LoadableLanding {...props} />
                                    )}
                                />
                                <Route
                                    path="/authentication"
                                    render={props => (
                                        <LoadableAuthentication {...props} />
                                    )}
                                />
                                <Route
                                    path="/authentication-purple"
                                    render={props => (
                                        <AuthenticationPurple {...props} />
                                    )}
                                />
                                <Route
                                    path="/success"
                                    render={props => (
                                        <Success {...props} />
                                    )}
                                />
                                <Route
                                    path="/dashboard"
                                    render={props => (
                                        <LayoutPage {...props}>
                                            <Dashboard {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route
                                    path="/profile/Information"
                                    render={props => (
                                        <LayoutPage {...props}>
                                            <PrsInfo {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route
                                    path="/profile/bill"
                                    render={props => (
                                        <LayoutPage {...props}>
                                            <Bills {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route
                                    path="/profile/affiliate"
                                    render={props => (
                                        <LayoutPage {...props}>
                                            <Affiliation {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route
                                    path="/profile/wallet"
                                    render={props => (
                                        <LayoutPage {...props}>
                                            <Wallet {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route
                                    path="/profile/change-password"
                                    render={props => (
                                        <LayoutPage {...props}>
                                            <ChangePassword {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route
                                    path="/support"
                                    render={props => (
                                        <LayoutPage fullPage={true} {...props}>
                                            <Support {...props} />
                                        </LayoutPage>
                                    )}
                                />
                                <Route path="/error" component={ShowError} />
                                <Route path="*" component={NotFound} />
                            </Switch>
                        </div>
                    </Router>
                </IntlProvider>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
    };
}

AppRouter.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(AppRouter);
