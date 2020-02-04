import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { createForm } from 'containers/form/Form';
import * as constants from '../constants';
import EditFormStyle from '../assets/styles/EditFormWrapper.style';
import en from '../translations/en.json';
import fa from '../translations/fa.json'
import {bindActionCreators} from "redux";
import * as actions from "../actions";

/*
 $messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    fa,
    en,
};

/*
 EditPrsInfo class is a component to show form in case of editing personal info
 it appears in prsInfo component
 */
export class EditPrsInfo extends Component {
    constructor(props) {
        super(props);
        this.form = createForm(constants.EDIT_PRSINFO)
    }

    onSubmit = (data) => {
        const { relatedData, editPrsInfo } = this.props;
        editPrsInfo(relatedData.id, data);
    };

    hideModal = () => {
        const { showModal } = this.props;
        showModal(false);
    };

    render() {
        const {
            lang,
            relatedData,
        } = this.props;
        const Form = this.form;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <EditFormStyle>
                    <h3>
                        <FormattedMessage id="editPrsInfo.title" />
                    </h3>
                    <Form
                        submitButton={{
                            double: true,
                            submitText: 'editPrsInfo.form.button.edit',
                            cancelText: 'editPrsInfo.form.button.cancel',
                            cancelFunction: () => this.hideModal(),
                            submitFunction: (values) => this.onSubmit(values),
                            submitColor: 'blue',
                        }}
                        initialValues={{
                            name: relatedData.name,
                            city: relatedData.city,
                            legal_status: relatedData.legal_status,
                            company_economical_number: relatedData.company_economical_number,
                            identity_number: relatedData.identity_number,
                            phone_number: relatedData.phone_number,
                            address: relatedData.address,
                            email: relatedData.email,
                            province: relatedData.province,
                        }}
                        noneRequired={['identity_number', 'company_economical_number']}
                        fields={{
                            legal_status: {
                                name: 'legal_status',
                                label: 'Legal status',
                                type: 'select',
                                placeholder: 'editPrsInfo.selectLegal',
                                options: [
                                    {label: 'Individual', value: 'individual'},
                                    {label: 'Organization', value: 'organization'},
                                ],
                                col: 12,
                                className: 'half-line-left',
                            },
                            name: {
                                name: 'name',
                                label: 'Name',
                                type: 'text',
                                col: 11,
                                className: 'half-line-right',
                            },
                            company_economical_number: {
                                name: 'company_economical_number',
                                label: 'Economical number',
                                type: 'text',
                            },
                            identity_number: {
                                name: 'identity_number',
                                label: 'National identity number',
                                type: 'text',
                            },
                            phone_number: {
                                name: 'phone_number',
                                label: 'Phone number',
                                type: 'text',
                            },
                            address: {
                                name: 'address',
                                label: 'Address',
                                type: 'text',
                            },
                            province: {
                                name: 'province',
                                label: 'Province',
                                type: 'text',
                                col: 12,
                                className: 'half-line-left',
                            },
                            city: {
                                name: 'city',
                                label: 'City',
                                type: 'text',
                                col: 11,
                                className: 'half-line-right',
                            },
                        }}
                        requestType='put'
                        layout="inline"
                    />
                </EditFormStyle>
            </IntlProvider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        lang: state.locale.lang,
    };
}
/*
editPrsInfo is an action to put user profile
*/
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editPrsInfo: actions.editPrsInfo,
    }, dispatch);
}

EditPrsInfo.propTypes = {
    showModal: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPrsInfo);
