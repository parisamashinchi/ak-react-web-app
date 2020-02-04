import React, { Component } from 'react';
import {
    FormattedMessage,
    injectIntl,
} from 'react-intl';
import { Col, Avatar, Input, Upload, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as formActions from 'containers/form/actions';
import * as images from "../assets/images";
import * as actions from '../actions';
import * as constants from '../constants';
import SupportStyle from '../assets/styles/support.style';
import { createForm } from 'containers/form/Form';
import Button from "antd/es/button";
import map from "lodash/map";
import isEmpty from 'lodash/isEmpty'
import moment from 'moment';
import { spiritNumber } from 'src/utils/spiritNumber';
import { alert } from 'containers/alert/Alerts';
import FullPageLoader from 'containers/loading/FullPageLoader';

const { TextArea } = Input;

class IssueDetail extends Component {
    constructor(props) {
        super(props);
        this.form = createForm(constants.CREATE_REQUEST);
        this.state = {
            imageFile: '',
            article_value: '',
            attachments: [],
            fileList:[],
            imageName: '',
            error: false,
        }
    }
    componentDidUpdate(nextProps ) {
        const { selectedTicket } = this.props;
        if (document.querySelector('.chat')) {
            document.querySelector('.chat').scrollTo({
                top: document.querySelector('.chat').attributes[0].ownerElement.scrollHeight ,
                behavior: 'smooth',
            })
        }
        if (selectedTicket !== nextProps.selectedTicket) {
            this.setState({
                error: false,
                fileList: []
            })
        }
    }

    onSubmit = (data) => {
        const { createTicket, userInfo, onClickTicketItem} = this.props;
        var fileList = [];
        if (!isEmpty(data.attachment)){
            map(data.attachment.fileList, item => {
                return (
                    this.getBase64(item.originFileObj, imageFile =>
                        fileList.push({
                            "data": imageFile.substring(imageFile.lastIndexOf(",") + 1),
                            "mime-type": item.type,
                            "filename": item.name,
                        }),
                    )
                )
            });
            this.setState({
                attachments: fileList
            })
        }

        setTimeout(()=> {
            var createData ={};
            if(!isEmpty(this.state.attachments)) {
                 createData = {
                    "title": data.title,
                    "customer": userInfo.email,
                    "group": constants.ARTICLE_TO,
                    "article": {
                        "subject": "",
                        "body": data.description,
                        "type": constants.ARTICLE_TYPE,
                        "to": constants.ARTICLE_TO,
                        "internal": false,
                        "attachments": this.state.attachments
                    },

                };
            } else {
                createData = {
                    "title": data.title,
                    "customer": userInfo.email,
                    "group": constants.ARTICLE_TO,
                    "article": {
                        "subject": "",
                        "body": data.description,
                        "type": constants.ARTICLE_TYPE,
                        "to": constants.ARTICLE_TO,
                        "internal": false,
                    },
                };
            }
                createTicket(createData, onClickTicketItem);
                this.setState({
                    attachments:[]
                })
            }
        ,10)
    };

    getBase64 = (img, callback) =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    onchangeInputArticle = (e) => {
        this.setState({
            article_value: e.target.value,
            error: false
        })
    };

    handleUploader = (info) => {
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        this.setState({ fileList });
        const array=[];
        map(fileList, item => {
            return (
                this.getBase64(item.originFileObj, imageFile =>
                    array.push({
                        "data": imageFile.substring(imageFile.lastIndexOf(",")+1),
                        "mime-type": item.type,
                        "filename": item.name,
                    }),
                )
            )
        });
        this.setState({
            attachments: array,
        })
    };

    onSendArticle = () => {
        if(isEmpty(this.state.article_value)){
            alert('error', 'Please fill the required fields.');
            this.setState({
                error: true
            })
        } else{
            const {selectedTicket, createArticle } = this.props;
            this.setState({
                uploading: true
            });
            var articleData = {};
            if(!isEmpty(this.state.attachments)) {
                articleData = {
                    "ticket_id": selectedTicket,
                    "body": this.state.article_value,
                    "content_type": "text/html",
                    "type": constants.ARTICLE_TYPE,
                    "to": constants.ARTICLE_TO,
                    "internal": false,
                    "attachments" : this.state.attachments
                }
            } else {
                articleData = {
                    "ticket_id": selectedTicket,
                    "body": this.state.article_value,
                    "content_type": "text/html",
                    "type": constants.ARTICLE_TYPE,
                    "to": constants.ARTICLE_TO,
                    "internal": false,
                }
            }
            createArticle(articleData);
            this.setState({
                article_value: '',
                fileList:[],
                attachments:[]
            })
        }
    };

    onDownload = (article_id, id, fileName, mimeType) =>{
        const { getAttachment } = this.props;
        getAttachment(this.props.selectedTicket, article_id, id, fileName, mimeType);
    };

    render() {
        const { showForm, selected, empty, articles, onCancelForm, loadData, showImage } = this.props;
        const selected_id = get(this.props, 'selectedTicket', 0);
        const selected_articles = get(articles, selected_id, 0);
        const Form = this.form;
        const loading = loadData.showLoader
            && loadData.requestType === 'post';
        const getLoading = loadData.showLoader
            && loadData.requestType === 'get';
        return (
            <div>
                <SupportStyle className="content">
                    {empty && !selected && !showForm
                    && (
                        <div className="empty-conversation">
                            <img src={images.messageGraphic} alt="message box"/>
                            <p><FormattedMessage id="support.emptyConversation1"/></p>
                            <p><FormattedMessage id="support.emptyConversation2"/></p>
                        </div>
                        )
                    }
                    {!empty && selected && !showForm && !showImage
                    && (
                        <FullPageLoader spinning={getLoading}>
                        <div>
                            <div className="chat">
                                <ul>
                                    {map(selected_articles, item => {
                                        const htmlBody = () => {
                                            return {__html: item.body.replace(/\n/g, '<br />')};
                                        };

                                        return (
                                            item.sender !== 'System' &&
                                            <div>
                                                <li>
                                                    <Col span={2} >
                                                        {item.sender ==="Agent"
                                                           ? <Avatar src={images} alt="avatar"/>
                                                           : <Avatar src={images.avatar} alt=" customer avatar"/>
                                                        }
                                                    </Col>
                                                    <Col span={22} className="chat-text">
                                                        <bdi>
                                                            <p dangerouslySetInnerHTML={htmlBody()} />
                                                        </bdi>
                                                        <span className="chat-date">{moment(item.created_at).format('HH:mm')}</span>
                                                    </Col>
                                                </li>
                                                {!isEmpty(item.attachments) &&
                                                map(item.attachments, item_attach => {
                                                    return (
                                                        item_attach.filename !== 'message.html' &&
                                                        <li>
                                                            <Col span={2} />
                                                            <Col span={22} className="chat-text">
                                                                <div
                                                                    className="attachment-section"
                                                                    onClick={() =>this.onDownload(item.id, item_attach.id, item_attach.filename, item_attach.preferences['Mime-type'])}
                                                                >
                                                                    <Col span={4}>
                                                                        {item_attach.filename.includes('png') || item_attach.filename.includes('jpg')
                                                                            ?  <img
                                                                                src={images.photo}
                                                                                className="chat-img"
                                                                            />
                                                                                : <img
                                                                                src={images.document}
                                                                                className="chat-img"
                                                                            />
                                                                        }
                                                                    </Col>
                                                                    <Col span={18} >
                                                                        <span>
                                                                            {item_attach.filename}
                                                                        </span>
                                                                        <pre>{spiritNumber(parseInt(item_attach.size) , true)}&nbsp;KB</pre>
                                                                    </Col>
                                                                    <Col span={2}>
                                                                        <Icon
                                                                            type="cloud-download"
                                                                        />
                                                                    </Col>
                                                                </div>
                                                            </Col>
                                                        </li>
                                                        )
                                                })
                                                }
                                            </div>
                                        );
                                    })}

                                </ul>
                            </div>
                            <div className={ this.state.error ? 'on-demand-error chat-btns' : 'chat-btns'}>
                                <Upload
                                    onChange={this.handleUploader}
                                    fileList={this.state.fileList}
                                    beforeUpload={() => {
                                        return false;
                                    }}
                                >
                                    <Button>
                                        <img src={images.attach} />
                                    </Button>
                                </Upload>
                                <TextArea
                                    placeholder="Type a message..."
                                    onChange={e =>this.onchangeInputArticle(e)}
                                    value={this.state.article_value}
                                />
                                <Button className="send-btn" onClick={this.onSendArticle} loading={loading}>
                                    <img src={images.send} />
                                </Button>
                            </div>
                        </div>
                        </FullPageLoader>
                    )
                    }
                    {!empty && !selected && showForm
                    && (
                        <div className="form">
                            <Col span={18}>
                                <Form
                                    submitButton={{
                                        double: true,
                                        submitText: 'createRequest.form.button.create',
                                        cancelText: 'createRequest.form.button.cancel',
                                        cancelFunction: () => onCancelForm(),
                                        submitFunction: (values) => this.onSubmit(values),
                                        submitColor: 'blue',
                                    }}
                                    noneRequired={['attachment']}
                                    fields={{
                                        title: {
                                            name: 'title',
                                            label: 'Title',
                                            type: 'text',
                                        },
                                        description: {
                                            name: 'description',
                                            label: 'Description',
                                            type: 'textarea',
                                            minRows: 4,
                                            maxRows: 12,
                                        },
                                        attachment: {
                                            name: 'attachment',
                                            label: 'attachment',
                                            type: 'attach',
                                        },
                                    }}
                                    requestType="post"
                                />
                            </Col>
                        </div>
                    )
                    }
                </SupportStyle>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
        articles: get(state.SupportReducer, 'articles', {}),
        userInfo: get(state.SupportReducer, 'userInfo', {}),
        loadData: get(state.LoadingReducer, 'loadData', {}),
        downloadAttachment: get(state.SupportReducer, 'attachment', ''),
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setErrors: formActions.setErrors,
        createTicket: actions.createTicket,
        createArticle: actions.createArticle,
        getAttachment: actions.getAttachment,
    }, dispatch);
}

IssueDetail.propTypes = {
    lang: PropTypes.string.isRequired,
    createArticle: PropTypes.func.isRequired,
    getAttachment: PropTypes.func.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(IssueDetail));
