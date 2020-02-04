import * as constants from './constants';

// getUserInfo
export const getUserInfo = () => ({
    type: constants.GET_USER_INFO,
});

// setUserInfo
export const setUserInfo = userData => ({
    type: constants.SET_USER_INFO,
    payload: {
        userData: userData,
    },
});

// getTicketStatus
export const getTicketStatus = () => ({
    type: constants.GET_TICKET_STATUS,
});

// setTicketStatus
export const setTicketStatus = data => ({
    type: constants.SET_TICKET_STATUS,
    payload: {
        data: data,
    },
});

// getTickets
export const getTickets = (number) => ({
    type: constants.GET_TICKETS,
    payload: {
        number: number,
    },
});

// setTickets
export const setTickets = data => ({
    type: constants.SET_TICKETS,
    payload: {
        data: data,
    },
});

// setSingleTicket
export const setSingleTicket = ticket => ({
    type: constants.SET_SINGLE_TICKET,
    payload: {
        ticket: ticket,
    },
});

// createTicket
export const createTicket = (data, onSuccess, redirect) => ({
    type: constants.CREATE_TICKET,
    payload: {
        data: data,
        onSuccess: onSuccess,
        redirect: redirect,
    },
});

// getArticles
export const getArticles = ticketId => ({
    type: constants.GET_ARTICLES,
    payload: {
        ticketId: ticketId,
    },
});

// setArticles
export const setArticles = articles => ({
    type: constants.SET_ARTICLES,
    payload: {
        articles: articles,
    },
});


// createArticle
export const createArticle = data => ({
    type: constants.CREATE_ARTICLE,
    payload: {
        data: data,
    },
});

// getGroups
export const getAttachment = (ticket_id, article_id, id, fileName, mimeType) => ({
    type: constants.GET_ATTACHMENT,
    payload: {
        ticket_id,
        article_id,
        id,
        fileName,
        mimeType,
    },
});

// setGroups
export const setAttachment = data => ({
    type: constants.SET_ATTACHMENT,
    payload: {
        data: data,
    },
});

// setGroups
export const setNewTicket = data => ({
    type: constants.SET_NEW_TICKET,
    payload: {
        data: data,
    },
});