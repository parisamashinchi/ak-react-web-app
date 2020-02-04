import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage, IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Yup from 'yup';
import { createForm } from 'containers/form/Form';
import * as actions from './actions';
import * as constants from './constants';
import DeleteFormStyle from './assets/styles/DeleteForm.style';
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

/*
 DeleteForm class is a component to show form in case of delete volume
 it appears in volume component and volume module of instance component
 */
export class DeleteForm extends Component {
    constructor(props) {
        super(props);
        this.form = createForm(constants.DELETE_FORM)
    }
    /*
     $deleteVolume is an action that we call in onSuccess on our form
     to handle request to server.
     showModal is an action to open or close modal in this case we closing it
     */
    onSubmit = () => {
        const { deleteAction, relatedData } = this.props;
        deleteAction(relatedData);
    };

    hideModal = () => {
        const { showModal } = this.props;
        showModal(false);
    };

    render() {
        const { lang, relatedData } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <DeleteFormStyle>
                    <div className="text">
                        <div>
                            <FormattedMessage id="deleteForm.warningMessage.part1" />
                        </div>
                        <span className="name">
                            {relatedData.name}
                        </span>
                        <FormattedMessage id="deleteForm.warningMessage.part2" />
                    </div>
                    <Form
                        submitButton={{
                            double: true,
                            submitText: 'deleteForm.form.button.delete',
                            cancelText: 'deleteForm.form.button.cancel',
                            submitColor: 'red',
                            cancelColor: 'greyText',
                            cancelFunction: () => this.hideModal(),
                            submitFunction: (values) => values.confirm === relatedData.name ?  this.onSubmit() : null,
                        }}
                        initialValues={{
                            confirm: '',
                        }}
                        validationSchema={Yup.object().shape({
                            confirm: Yup.string()
                                .required(<FormattedMessage id="deleteForm.form.requiredMessage" />)
                                .test(relatedData.name,<FormattedMessage id="deleteForm.error.differently" />, (val) => {
                                    if (val) {
                                        return (val === relatedData.name);
                                    }
                                }),
                        })}
                        fields={{
                            confirm: {
                                name: 'confirm',
                                type: 'text',
                            },
                        }}
                        requestType="delete"
                    />
                </DeleteFormStyle>
            </IntlProvider>
        );
    }
}

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 deleteAction is action in case of call data will send to server
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteAction: actions.deleteAction,
    }, dispatch);
}

DeleteForm.propTypes = {
    relatedData: PropTypes.objectOf(PropTypes.string).isRequired,
    deleteAction: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(DeleteForm);
