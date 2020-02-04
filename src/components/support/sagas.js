import {
    call, takeEvery,
} from 'redux-saga/effects';
import Ajax from 'api/Ajax';
import { store } from 'store/ConfigureStore';
import { history } from 'src/routers/AppRouter';
import * as constants from './constants';
import * as actions from './actions';

//getUserInfo
function* getUserInfo() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setUserInfo(response.data));
        },
    }).setMethod('get')
        .setEvent('support')
        .setUrl(constants.GET_USER_INFO_URL)
        .send());
}

//getTickets
function* getTickets(action) {
    const { number } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setTickets(response.data));
            if (number) {
                history.push(number);
            }
        },
    }).setMethod('get')
        .setEvent('support')
        .setUrl(constants.TICKETS_URL)
        .send());
}

//getTicketStatus
function* getTicketStatus() {
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setTicketStatus(response.data));
        },
    }).setMethod('get')
        .setEvent('support')
        .setUrl(constants.TICKET_STATUS_URL)
        .send());
}

//createTicket
function* createTicket(action) {
    const { data, onSuccess, redirect } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.getTickets(redirect ? `/support/#${response.data.id}` : null));
            store.dispatch(actions.setNewTicket(response.data.id));
            if (onSuccess) {
                onSuccess(response.data.number, response.data.id);
            }
        },
    }).setMethod('post')
        .setEvent('support')
        .setUrl(constants.TICKETS_URL)
        .setData(data)
        .send());
}

//getArticles
function* getArticles(action) {
    const { ticketId } = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setArticles(response.data));
        },
    }).setMethod('get')
        .setEvent('support')
        .setUrl(`${constants.ARTICLES_URL}/by_ticket/${ticketId}`)
        .send());
}

//createArticle
function* createArticle(action) {
    const { data } = action.payload;
    yield call(() => new Ajax({
        success: () => {
            store.dispatch(actions.getArticles(data.ticket_id));
        },
    }).setMethod('post')
        .setEvent('support')
        .setUrl(constants.ARTICLES_URL)
        .setData(data)
        .send());
}

//getAttachment
function* getAttachment(action) {
    const { ticket_id, article_id , id, fileName, mimeType} = action.payload;
    yield call(() => new Ajax({
        success: (response) => {
            store.dispatch(actions.setAttachment(response.data));
            let blob = new Blob(
                [response.data],
                {type : mimeType}
            );
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    }).setMethod('get')
        .setEvent('supportImage')
        .setUrl(`${constants.ATTACHMENT_URL}/${ticket_id}/${article_id}/${id}?disposition=attachment`)
        .send());
}

function* getUserInfoSaga() {
    yield takeEvery(constants.GET_USER_INFO, getUserInfo);
}

function* getTicketsSaga() {
    yield takeEvery(constants.GET_TICKETS, getTickets);
}

function* getTicketStatusSaga() {
    yield takeEvery(constants.GET_TICKET_STATUS, getTicketStatus);
}

function* createTicketSaga() {
    yield takeEvery(constants.CREATE_TICKET, createTicket);
}

function* getArticlesSaga() {
    yield takeEvery(constants.GET_ARTICLES, getArticles);
}

function* createArticleSaga() {
    yield takeEvery(constants.CREATE_ARTICLE, createArticle);
}

function* getAttachmentSaga() {
    yield takeEvery(constants.GET_ATTACHMENT, getAttachment);
}

export default [
    getUserInfoSaga(),
    getTicketsSaga(),
    createTicketSaga(),
    getArticlesSaga(),
    createArticleSaga(),
    getTicketStatusSaga(),
    getAttachmentSaga(),
];
