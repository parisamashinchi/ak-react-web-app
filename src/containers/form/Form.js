import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col,
    Slider,
    InputNumber,
    Switch,
    Radio,
    Input,
    Upload,
    Button,
    Icon
} from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import Recaptcha from 'react-google-recaptcha';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import split from 'lodash/split';
import PropTypes from 'prop-types';
import { spiritNumber } from 'src/utils/spiritNumber';
import { alert } from 'containers/alert/Alerts';
import { calculateCost } from 'containers/zone/calculateCost';
import CustomButton from 'components/ui-components/button/Button';
import FormStyle from './assets/form.style';
import * as actions from './actions';
import * as constants from './constants';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

/*
Forms container to show customize form in every component
*/

export const createForm = (name) => {
    class Forms extends Component {
        constructor(props){
            super(props);
            /*
            disableFields is an array that contains input names to make disbale in form
             */
            this.state = {
                disableFields: [],
                isHuman: false,
                switchValue: 0,
                radioValue: '',
                submitted: [],
                fileList: undefined,
            };
        }

        componentDidMount() {
            const { disableFields = [], loadData } = this.props;
            const isLoading = loadData.showLoader;
            if (document.getElementById("double-button-submit")) {
                window.addEventListener('keypress', e => e.key === 'Enter'
                && !isLoading
                && e.target.localName !== 'textarea'
                && document.getElementById("double-button-submit")
                    ? document.getElementById("double-button-submit").click()
                    : null, false);
            } else if (document.getElementById("custom-submit") !== null) {
                window.addEventListener('keypress', e => e.key === 'Enter'
                && !isLoading
                && e.target.localName !== 'textarea'
                && document.getElementById("custom-submit")
                    ? document.getElementById("custom-submit").click()
                    : null, false);
            }
            this.setState({
                disableFields: disableFields
            });
        }

        componentWillUnmount () {
            const { setErrors } = this.props;
            setErrors([], {});
            if (document.getElementById("double-button-submit")) {
                window.removeEventListener('keypress', e => e.key === 'Enter'
                && !isLoading
                && e.target.localName !== 'textarea'
                && document.getElementById("double-button-submit")
                    ? document.getElementById("double-button-submit").click()
                    : null, false);
            } else if (document.getElementById("custom-submit") !== null) {
                window.removeEventListener('keypress', e => e.key === 'Enter'
                && !isLoading
                && e.target.localName !== 'textarea'
                && document.getElementById("custom-submit")
                    ? document.getElementById("custom-submit").click()
                    : null, false);
            }
        }

        handleCaptchaState = (value) => {
            this.setState({ isHuman : value });
            window.removeEventListener('keypress', e => e.key === 'Enter' ? () => document.getElementsByClassName("submit-button").click() : null, false);
        };

        /**
         * checks required inputs and throws error in case that's empty
         * @param values contains form values
         * @returns {{}}
         */
        customValidation = (values) => {
            const { noneRequired = [], fields } = this.props;
            let errors = {};
            Object.keys(fields).map(field => {
                const checkLenght = get(values[field], 'length', 0);
                if (checkLenght === 0 && !noneRequired.includes(field)) {
                    errors[field] = <FormattedMessage id="form.error.required" />;
                }
                return errors;
            });
            return errors;
        };

        /**
         * in case that some value needs to change other values or disable them
         * @param e performs event
         * @param handleChange it's a formik function that handles changing current input
         * @param setFieldValue it's a formik function that handles changing other inputs
         * @param values contains object of form input entered values
         * @param relatedData is an object to introduce conditions and target inputs to function
         */
        setRelatedFieldsValue = (e, handleChange, setFieldValue, values, relatedData) => {
            handleChange(e);
            /**
             * checks if change of current input needs to change other inputs in the form
             */
            if (e.target.value === relatedData.condition.value) {
                map(relatedData.target, item => {
                    if(relatedData.changeValue) {
                        setFieldValue(item.field, item.value);
                    }
                    if(relatedData.disable) {
                        this.state.disableFields.push(item.field);
                    }
                });
            } else {
                this.setState({
                    disableFields: []
                })
            }
            /**
             * checks if changing of current input needs to check with other inputs
             */
            if (values[relatedData.condition.field] === relatedData.condition.value) {
                map(relatedData.target, item => {
                    setFieldValue(item.field, item.value);
                    if(relatedData.disable) {
                        this.state.disableFields.push(item.field);
                    }
                });
            }
        };

        onSliderChange = (value, setFieldValue, name, handleChange) => {
            const safeValue = typeof(value) === 'number' ? value : 0;
            handleChange;
            setFieldValue(name, safeValue);
        };

        handleSubmit = (submit, values) => {
            const errors = this.customValidation(values);
            const submittedErrors = [];
            Object.keys(errors).map(field => {
                submittedErrors.push(field);
            });
            this.setState({
                submitted: submittedErrors,
            });
            if(this.state.isHuman) {
                Object.assign(values, {g_recaptcha_response: this.state.isHuman})
            }

            if(isEmpty(errors)) {
                submit(values);
            } else {
                alert('error', 'Please fill the required fields.');
            }
            return errors;
        };

        handleUploader = (info, setFieldValue,name, handleChange) => {
            handleChange;
            setFieldValue(name, info);
            this.setState({
                fileList: info.fileList.slice(-5)
            });
        };

        removeFile = () => {
            this.setState({
                fileList: undefined
            });
        };

        render() {
            /**
             * @param fields contains object of input data
             * @param submitButton contains object of submit button text and class
             * @param validationSchema contains object of validation data
             * @param initialValues contains object of default values
             * @param onSubmit contains function in case of submit form
             */
            const {
                recaptcha = false,
                fields,
                submitButton,
                validationSchema,
                initialValues,
                onSubmit,
                intl,
                customSubmit,
                loadData,
                requestType,
                layout,
                backendErrors,
                backendErrorDetail,
            } = this.props;

            const isLoading = loadData.showLoader
                && loadData.requestType === requestType;
            /*
                gets type of input and renders and generates needed input
            */
            const RenderInputs = (props) => {
                const { item, handleChange, setFieldValue, values, errors, touched } = props;
                return item.type === 'textarea' ?
                    <Col span={item.col ? item.col : 24}>
                        <div className="ant-form-item">
                            <div className="ant-form-item-control-wrapper">
                                <div className={
                                    errors[item.name] && touched[item.name]
                                        ? 'has-error ant-form-item-control'
                                        : this.state.submitted.includes(item.name)
                                            ? 'on-demand-error ant-form-item-control'
                                        : backendErrors.includes(item.name)
                                            ? 'on-demand-error ant-form-item-control'
                                        : 'ant-form-item-control'
                                }>
                                            <label>
                                                {item.label ? intl.formatMessage({id: item.label}) : item.label}
                                            </label>
                                            <TextArea
                                                dir="auto"
                                                name={item.name}
                                                defaultValue={values[item.name]}
                                                className="ant-input"
                                                autosize={{ minRows: item.minRows ? item.minRows : 2, maxRows: item.maxRows ? item.maxRows : 6 }}
                                                disabled={this.state.disableFields.includes(item.name)}
                                                dir="auto"
                                                onChange={
                                                    item.changeRelatedFields
                                                        ? (e) => this.setRelatedFieldsValue(e, handleChange, setFieldValue, values, item.changeRelatedFields)
                                                        : handleChange
                                                }
                                                placeholder={item.placeholder ? intl.formatMessage({id: item.placeholder}) : null}
                                            />

                                        {errors[item.name] && touched[item.name]
                                            ? <div className="has-error ant-form-explain modal-form-error">
                                                {errors[item.name]}
                                              </div>
                                            : backendErrorDetail
                                                ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                    {backendErrorDetail[item.name]}
                                                </div>
                                                : <div className="has-error ant-form-explain modal-form-error" />
                                        }
                                </div>
                            </div>
                        </div>
                    </Col>
                    : item.type === 'select' ?
                        <Col span={item.col ? item.col : 24}>
                            <div className="ant-form-item">
                                <div className="ant-form-item-control-wrapper">
                                    <div className={
                                        errors[item.name] && touched[item.name]
                                            ? 'has-error ant-form-item-control'
                                            : this.state.submitted.includes(item.name)
                                            ? 'on-demand-error ant-form-item-control'
                                            : backendErrors.includes(item.name)
                                                ? 'on-demand-error ant-form-item-control'
                                            : 'ant-form-item-control'
                                    }>
                                                <label>
                                                    {item.label ? intl.formatMessage({id: item.label}) : item.label}
                                                </label>
                                                <Field
                                                    component={item.type}
                                                    name={item.name}
                                                    className="ant-input h-40"
                                                    disabled={this.state.disableFields.includes(item.name)}
                                                    onChange={
                                                        item.changeRelatedFields
                                                            ? (e) => this.setRelatedFieldsValue(e, handleChange, setFieldValue, values, item.changeRelatedFields)
                                                            : handleChange
                                                    }
                                                >
                                                    <option disabled selected value=''>
                                                        {item.placeholder ? intl.formatMessage({id: item.placeholder}) : null}
                                                    </option>
                                                    {
                                                        item.options.map(option => {
                                                            return <option
                                                                key={option.value}
                                                                value={option.value}
                                                                onClick={() => setFieldValue(item.name, option.value)}
                                                            >
                                                                {option.label}
                                                            </option>
                                                        })
                                                    }
                                                </Field>
                                        {errors[item.name] && touched[item.name]
                                            ? <div className="has-error ant-form-explain modal-form-error">
                                                {errors[item.name]}
                                            </div>
                                            : backendErrorDetail
                                                ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                    {backendErrorDetail[item.name]}
                                                </div>
                                                : <div className="has-error ant-form-explain modal-form-error" />
                                        }
                                        </div>
                                    </div>
                            </div>
                        </Col>
                        : item.type === 'slider' ?
                            <Col span={item.col ? item.col : 24}>
                                <div className="ant-form-item">
                                    <div className="ant-form-item-control-wrapper">
                                        <div className={
                                            errors[item.name] && touched[item.name]
                                                ? 'has-error ant-form-item-control'
                                                : this.state.submitted.includes(item.name)
                                                ? 'on-demand-error ant-form-item-control'
                                                : backendErrors.includes(item.name)
                                                    ? 'on-demand-error ant-form-item-control'
                                                : 'ant-form-item-control'
                                        }>
                                                    <Field
                                                        name={item.name}
                                                    >
                                                        {() => (
                                                            <div>
                                                                <Col className="slider-label" span={2}>
                                                                    {item.label}
                                                                </Col>
                                                                <Col span={15}>
                                                                    <Slider
                                                                        min={item.min}
                                                                        max={item.max}
                                                                        onChange={value => this.onSliderChange(value, setFieldValue, item.name, handleChange)}
                                                                        value={values[item.name]}
                                                                        marks={item.marks}
                                                                    />
                                                                </Col>
                                                                <Col span={2}>
                                                                    {item.unit}
                                                                </Col>
                                                                <Col className={item.cost ? 'mb-10' : null} span={2}>
                                                                    <InputNumber
                                                                        min={item.min}
                                                                        max={item.max}
                                                                        value={values[item.name]}
                                                                        size="3px"
                                                                        onChange={value => this.onSliderChange(value, setFieldValue, item.name, handleChange)}
                                                                    />
                                                                </Col>
                                                                {
                                                                    item.cost
                                                                        ? <div>
                                                                            <Col span={5}>
                                                                                Monthly cost
                                                                            </Col>
                                                                            <Col span={5}>
                                                                                {spiritNumber(calculateCost('volume', values[item.name]))}
                                                                                &nbsp;{constants.CURRENCY}
                                                                            </Col>
                                                                        </div>
                                                                    : null
                                                                }
                                                            </div>
                                                        )}
                                                    </Field>
                                            {errors[item.name] && touched[item.name]
                                                ? <div className="has-error ant-form-explain modal-form-error">
                                                    {errors[item.name]}
                                                </div>
                                                : backendErrorDetail
                                                    ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                        {backendErrorDetail[item.name]}
                                                    </div>
                                                    : <div className="has-error ant-form-explain modal-form-error" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            : item.type === 'switch' ?
                                <Col span={item.col ? item.col : 24}>
                                    <div className="ant-form-item">
                                        <div className="ant-form-item-control-wrapper">
                                            <div className="ant-form-item-control">
                                                <div className={
                                                    errors[item.name] && touched[item.name]
                                                        ? 'has-error ant-form-item-control'
                                                        : this.state.submitted.includes(item.name)
                                                        ? 'on-demand-error ant-form-item-control'
                                                        : backendErrors.includes(item.name)
                                                            ? 'on-demand-error ant-form-item-control'
                                                        : 'ant-form-item-control'
                                                }>
                                                        <Field
                                                            name={item.name}
                                                            value={this.state.switchValue}
                                                            onChange={
                                                                item.changeRelatedFields
                                                                    ? (e) => this.setRelatedFieldsValue(e, handleChange, setFieldValue, values, item.changeRelatedFields)
                                                                    : handleChange
                                                            }
                                                        >
                                                            {() => (
                                                                <div>
                                                                    <Col span={6}>
                                                                        {item.label}
                                                                    </Col>
                                                                    <Switch
                                                                        checked={values[item.name]}
                                                                        onChange={value => setFieldValue(item.name, value)}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Field>

                                                    {errors[item.name] && touched[item.name]
                                                        ? <div className="has-error ant-form-explain modal-form-error">
                                                            {errors[item.name]}
                                                        </div>
                                                        : backendErrorDetail
                                                            ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                                {backendErrorDetail[item.name]}
                                                            </div>
                                                            : <div className="has-error ant-form-explain modal-form-error" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                : item.type === 'radio' ?
                                    <Col span={item.col ? item.col : 24}>
                                        <div className="ant-form-item">
                                            <div className="ant-form-item-control-wrapper">
                                                <div className="ant-form-item-control">
                                                    <div className={
                                                        errors[item.name] && touched[item.name]
                                                            ? 'has-error ant-form-item-control'
                                                            : this.state.submitted.includes(item.name)
                                                            ? 'on-demand-error ant-form-item-control'
                                                            : backendErrors.includes(item.name)
                                                                ? 'on-demand-error ant-form-item-control'
                                                            : 'ant-form-item-control'
                                                    }>

                                                            <Field
                                                                name={item.name}
                                                                onChange={
                                                                    item.changeRelatedFields
                                                                        ? (e) => this.setRelatedFieldsValue(e, handleChange, setFieldValue, values, item.changeRelatedFields)
                                                                        : handleChange
                                                                }
                                                            >
                                                                {() => (
                                                                    <div>
                                                                        <Col span={24}>
                                                                            <label>
                                                                                {item.label ? intl.formatMessage({id: item.label}) : item.label}
                                                                            </label>
                                                                        </Col>
                                                                        <RadioGroup
                                                                            name="radiogroup"
                                                                            defaultValue={item.defaultValue}
                                                                            onChange={(e) => setFieldValue(item.name, e.target.value)}
                                                                        >
                                                                            {
                                                                                map(item.options, option => {
                                                                                    return <Radio
                                                                                        value={option.value}
                                                                                        checked={option.value === values[item.name]}
                                                                                    >
                                                                                        {option.name}
                                                                                    </Radio>
                                                                                })}
                                                                        </RadioGroup>
                                                                    </div>
                                                                )}
                                                            </Field>

                                                        {errors[item.name] && touched[item.name]
                                                            ? <div className="has-error ant-form-explain modal-form-error">
                                                                {errors[item.name]}
                                                            </div>
                                                            : backendErrorDetail
                                                                ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                                    {backendErrorDetail[item.name]}
                                                                </div>
                                                                : <div className="has-error ant-form-explain modal-form-error" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    : item.type === 'number' ?
                                        <Col span={item.col ? item.col : 24}>
                                            <div className="ant-form-item">
                                                <div className="ant-form-item-control-wrapper">
                                                    <div className={
                                                        errors[item.name] && touched[item.name]
                                                            ? 'has-error ant-form-item-control'
                                                            : this.state.submitted.includes(item.name)
                                                            ? 'on-demand-error ant-form-item-control'
                                                            : backendErrors.includes(item.name)
                                                                ? 'on-demand-error ant-form-item-control'
                                                            : 'ant-form-item-control'
                                                    }>

                                                                <label>
                                                                    {item.label ? intl.formatMessage({id: item.label}) : item.label}
                                                                </label>
                                                                {item.icon ?
                                                                    <i className={`fa ${item.icon}`} />
                                                                    : null
                                                                }
                                                                <InputNumber
                                                                    min={item.min}
                                                                    max={item.max}
                                                                    onChange={
                                                                        item.changeRelatedFields
                                                                            ? (e) => this.setRelatedFieldsValue(e, handleChange, setFieldValue, values, item.changeRelatedFields)
                                                                            : (value) => setFieldValue(item.name, value)
                                                                    }
                                                                    placeholder={item.placeholder ? intl.formatMessage({id: item.placeholder}) : null}
                                                                />
                                                        {errors[item.name] && touched[item.name]
                                                            ? <div className="has-error ant-form-explain modal-form-error">
                                                                {errors[item.name]}
                                                            </div>
                                                            : backendErrorDetail
                                                                ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                                    {backendErrorDetail[item.name]}
                                                                </div>
                                                                : <div className="has-error ant-form-explain modal-form-error" />
                                                        }
                                                        </div>
                                                </div>
                                            </div>
                                        </Col>
                                        :item.type === 'attach' ?
                                            <Col className="attachment-section" span={item.col ? item.col : 24}>
                                                <Upload
                                                        onChange={value => this.handleUploader(value, setFieldValue, item.name, handleChange)}
                                                        fileList={this.state.fileList}
                                                        beforeUpload={() => {
                                                            return false;
                                                        }}
                                                >
                                                    <Button>
                                                        <Icon type="upload" /> {item.label}
                                                    </Button>
                                                </Upload>
                                            </Col>
                                    : <Col span={item.col ? item.col : 24}>
                                        <div className="ant-form-item">
                                            <div className="ant-form-item-control-wrapper">
                                                <div className={
                                                    errors[item.name] && touched[item.name]
                                                        ? 'has-error ant-form-item-control'
                                                        : this.state.submitted.includes(item.name)
                                                        ? 'on-demand-error ant-form-item-control'
                                                        : backendErrors.includes(item.name)
                                                            ? 'on-demand-error ant-form-item-control'
                                                        : 'ant-form-item-control'
                                                }>
                                                    <div className="right-addon">
                                                            <label>
                                                                {item.label ? intl.formatMessage({id: item.label}) : item.label}
                                                            </label>
                                                            {item.icon ?
                                                                <i className={`fa ${item.icon}`} />
                                                                : null
                                                            }
                                                            <Field
                                                                autocomplete="off"
                                                                name={item.name}
                                                                type={item.type}
                                                                disabled={this.state.disableFields.includes(item.name)}
                                                                className="ant-input h-40"
                                                                autoFocus={item.type !== 'password' && item.type !== 'tel'}
                                                                onChange={
                                                                    item.changeRelatedFields
                                                                        ? (e) => this.setRelatedFieldsValue(e, handleChange, setFieldValue, values, item.changeRelatedFields)
                                                                        : handleChange
                                                                }
                                                                placeholder={item.placeholder ? intl.formatMessage({id: item.placeholder}) : null}
                                                            />

                                                        {errors[item.name] && touched[item.name]
                                                            ? <div className="has-error ant-form-explain modal-form-error">
                                                                {errors[item.name]}
                                                            </div>
                                                            : backendErrorDetail
                                                                ? <div className="backend-error has-error ant-form-explain modal-form-error">
                                                                    {backendErrorDetail[item.name]}
                                                                </div>
                                                                : <div className="has-error ant-form-explain modal-form-error" />
                                                        }
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>};
            return (
                <FormStyle {...this.props}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={onSubmit || customSubmit}
                        render={({
                                     values,
                                     touched,
                                     errors,
                                     handleChange,
                                     setFieldValue,
                                     onChange,
                                 }) => (
                            <div className="container">
                                <Form className={layout === "inline" ? 'ant-form ant-form-inline ant-row ' :'ant-form ant-row'}>
                                    {Object.entries(fields).map(item => {
                                        return item[1].condition
                                            ? values[item[1].condition] === item[1].name
                                                ?
                                                <RenderInputs
                                                    item={item[1]}
                                                    handleChange={handleChange}
                                                    setFieldValue={setFieldValue}
                                                    values={values}
                                                    errors={errors}
                                                    touched={touched}
                                                />
                                                : values[item[1].condition] && values[item[1].condition].includes(item[1].name)
                                                    ? <RenderInputs
                                                        item={item[1]}
                                                        handleChange={handleChange}
                                                        setFieldValue={setFieldValue}
                                                        values={values}
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                    :  values[item[1].condition] && split(values[item[1].condition], '.')[0] === item[1].name
                                                    ? <RenderInputs
                                                        item={item[1]}
                                                        handleChange={handleChange}
                                                        setFieldValue={setFieldValue}
                                                        values={values}
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                    : null
                                            : <RenderInputs
                                                item={item[1]}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                            />
                                    })}
                                    { recaptcha ?
                                        <Col span={24}>
                                        <Recaptcha
                                            id="recaptcha"
                                            ref="recaptcha"
                                            sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_SITE_KEY}
                                            onChange={(value) => this.handleCaptchaState(value)}
                                        />
                                        </Col>
                                        : ''
                                    }
                                    {
                                        submitButton.double
                                            ? <div className="ant-col-24 double-button">
                                                <Col span={submitButton.col? submitButton.col:14}>
                                                    <CustomButton
                                                        id="double-button-submit"
                                                        size="large"
                                                        color={submitButton.submitColor}
                                                        onClick={() => this.handleSubmit(submitButton.submitFunction, values, validationSchema)}
                                                        loading={isLoading}
                                                    >
                                                        <FormattedMessage id={submitButton.submitText} />
                                                    </CustomButton>
                                                </Col>
                                                <Col span={submitButton.col? submitButton.col:10}>
                                                    <CustomButton
                                                        size="large"
                                                        color={'greyText'}
                                                        onClick={() => submitButton.cancelFunction(values)}
                                                        className="cancel-button"
                                                    >
                                                        <FormattedMessage id={submitButton.cancelText} />
                                                    </CustomButton>
                                                </Col>
                                            </div>
                                            : submitButton.noSubmit
                                            ? ''
                                            :
                                            <Col span={submitButton.col? submitButton.col:24}>
                                                <CustomButton
                                                    id="custom-submit"
                                                    size="large"
                                                    fullWidth={true}
                                                    className={submitButton.customClass}
                                                    color={submitButton.submitColor ||'blue'}
                                                    onClick={() => this.handleSubmit(customSubmit, values, validationSchema)}
                                                    loading={isLoading}
                                                >
                                                    <FormattedMessage id={submitButton.text} />
                                                </CustomButton>
                                            </Col>
                                    }
                                </Form>
                            </div>
                        )
                        }
                    />
                </FormStyle>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            lang: state.locale.lang,
            loadData: get(state.LoadingReducer, 'loadData' , {}),
            backendErrors: get(state.FormReducer, 'errors' , []),
            backendErrorDetail: get(state.FormReducer, 'errorDetail' , []),
        };
    };

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            setErrors: actions.setErrors,
        }, dispatch);
    }

    Forms.propTypes = {
        intl: intlShape.isRequired,
        lang: PropTypes.string.isRequired,
        recaptcha: PropTypes.bool,
        fields: PropTypes.objectOf(PropTypes.object).isRequired,
        submitButton: PropTypes.objectOf(PropTypes.string).isRequired,
        loadData: PropTypes.objectOf(PropTypes.string).isRequired,
        validationSchema: PropTypes.objectOf(PropTypes.any).isRequired,
        initialValues: PropTypes.objectOf(PropTypes.string).isRequired,
        onSubmit: PropTypes.func.isRequired,
    };
    return injectIntl(connect(mapStateToProps, mapDispatchToProps)(Forms))
};

createForm.propTypes = {
    name: PropTypes.string.isRequired,
};
