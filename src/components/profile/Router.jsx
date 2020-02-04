import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import PrsInfo from './modules/prsInfo';
import Wallet from './modules/wallet';
import Bills from './modules/bills';
import Affiliation from './modules/affiliation';
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
const ProfileRouter = (props) => {
    // lang: contains selected language and IntlProvider use it to show needed language
    const { lang } = props;
    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <Switch>
                <Route
                    path="/profile/information"
                    render={prop => (
                        <PrsInfo {...prop} />
                    )}
                />
                <Route
                    path="/profile/bill"
                    render={prop => (
                        <Bills {...prop} />
                    )}
                />
                <Route
                    path="/profile/affiliate"
                    render={prop => (
                        <Affiliation {...prop} />
                    )}
                />
                <Route
                    path="/profile/wallet"
                    render={prop => (
                        <Wallet {...prop} />
                    )}
                />
            </Switch>
        </IntlProvider>
    );
};

/*
   mapStateToProps is a function that we use
   to get data from redux store.
   $lang in redux state will show us selected language
 */
function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
    };
}

ProfileRouter.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ProfileRouter);
