import { notification } from 'antd';
import split from 'lodash/split';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fa from 'react-intl/locale-data/fa';
import { store } from 'src/store/ConfigureStore';
import farsiMessages from './translations/fa.json';
import englishMessages from './translations/en.json';

addLocaleData([...en, ...fa]);

const messages = {
    fa: farsiMessages,
    en: englishMessages,
};

export const alert = (type = 'success', title = '', text = '') => {
    const lang = store.getState().locale.lang;
    const intlProvider = new IntlProvider({ locale: lang, messages: messages[lang] });
    const { intl } = intlProvider.getChildContext();
    const messageArray = split(title, ' ').length;
    const messageDuration = Math.max(messageArray / 2, 10);

    notification[type]({
        message: title ? intl.formatMessage({ id: title }) : title,
        description: text ? intl.formatMessage({ id: text }) : text,
        duration: messageDuration,
        top: 90,
    });
};
