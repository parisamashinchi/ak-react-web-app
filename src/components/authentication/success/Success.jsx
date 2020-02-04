import React , { Component }from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import CustomButton from 'components/ui-components/button/Button';
import AuthStyle from 'components/authentication/assets/styles/authentication.style';
import en from 'components/authentication/translations/en.json';
import fa from 'components/authentication/translations/fa.json';

const messages = {
    fa,
    en,
};
/*
 Success is a component to show user congratulation result and redirect his/her to dashboard page
 */

export class Success extends Component {
    componentDidMount() {
        setTimeout(this.redirect, 3000);
    }

    redirect = () => {
        this.props.history.push(`/virtual-machines/list`)
    };

    render() {
        const { lang } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <AuthStyle>
                        <div className="success">
                            <h1><FormattedMessage id="success.header"/></h1>
                            <p><FormattedMessage id="success.text"/></p>
                            <h2><FormattedMessage id="success"/></h2>
                            <pre><FormattedMessage id="success.text1"/></pre>
                            <pre><FormattedMessage id="success.text2"/></pre>
                            <CustomButton id="redirect-button" onClick={() => this.redirect} size="large">
                                <NavLink exact to="/virtual-machines/list">
                                    <FormattedMessage id="success.button" />
                                </NavLink>
                            </CustomButton>
                        </div>
                    </AuthStyle>
                </div>
            </IntlProvider>
        );
    }
};

/*
 mapStateToProps is a function that we
 use to get data from redux state
 lang in redux state will show us selected language
 */
const mapStateToProps = state => ({
    lang: state.locale.lang,
});

Success.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(withRouter(Success));
