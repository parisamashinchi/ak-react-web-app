import {
    createStore, combineReducers, applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import FlavorsReducer from 'containers/flavor-carousel/reducers';
import FlavorsSagas from 'containers/flavor-carousel/sagas';
import locale from 'containers/language/reducer';
import LocaleSagas from 'containers/language/sagas';
import LoadingReducer from 'containers/loading/reducer';
import Modal from 'containers/modal/reducer';
import DeleteSagas from 'containers/delete-form/sagas';
import ZoneReducer from 'containers/zone/reducer';
import ZoneSagas from 'containers/zone/sagas';
import AuthenticationReducer from 'components/authentication/reducer';
import AuthenticationSagas from 'components/authentication/sagas';
import FormReducer from 'containers/form/reducer';
import FormSagas from 'containers/form/sagas';
import TableReducer from 'containers/table/reducer';
import TableSagas from 'containers/table/sagas';
import WalletReducer from 'components/profile/reducer';
import WalletSagas from 'components/profile/sagas';
import LayoutReducer from 'components/layout/reducer';
import LayoutSagas from 'components/layout/sagas';
import SupportReducer from 'components/support/reducer';
import SupportSagas from 'components/support/sagas';
import BlogReducer from 'components/landing-page/blog/reducer';
import BlogSagas from 'components/landing-page/blog/sagas';

import * as constants from './constants';

const sagaMiddleware = createSagaMiddleware();

// redux persist config
const persistConfig = {
    key: 'root',
    storage,
};

// set all reducers as RootReducer
const appReducer = combineReducers({
    Authentication: AuthenticationReducer,
    locale,
    // locale:()=>({lang:"en"}),
    LoadingReducer,
    Modal,
    FlavorsReducer,
    TableReducer,
    WalletReducer,
    LayoutReducer,
    ZoneReducer,
    FormReducer,
    SupportReducer,
    BlogReducer,

});

const sagas = function* () {
    yield [
        ...BlogSagas,
        ...FlavorsSagas,
        ...AuthenticationSagas,
        ...TableSagas,
        ...DeleteSagas,
        ...WalletSagas,
        ...LayoutSagas,
        ...ZoneSagas,
        ...LocaleSagas,
        ...SupportSagas,
        ...FormSagas,
    ];
};

const RootReducer = (state, action) => {
    if (action.type === constants.SET_LOGOUT_USER) {
        Object.keys(state)
            .forEach((key) => {
                if (key !== 'LayoutReducer') {
                    storage.removeItem(`persist:${key}`);
                }
            });
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
const logger = createLogger();

// export store with persistedReducer
export const store = createStore(
    persistedReducer,
    applyMiddleware(
        sagaMiddleware,
        logger,
    ),
);

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
