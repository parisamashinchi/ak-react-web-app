import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Col, Input, Form } from 'antd';
import CustomButton from 'components/ui-components/button/Button';

const FormItem = Form.Item;

export const NewsLetterForm = (props) => {
    const { intl } = props;
    return (
        <Form>
            <FormItem>
                <Input placeholder={intl.formatMessage({ id: 'footer.placeholder' })} />
            </FormItem>
            <FormItem>
                <Col
                    xs={24}
                    sm={{ span: 20, offset: 1 }}
                    md={{ span: 8, offset: 8 }}
                    lg={{ span: 8, offset: 8 }}
                    xl={{ span: 6, offset: 9 }}
                >
                    <CustomButton color="blue" size="small" fullWidth={true}>
                        <FormattedMessage id="footer.send" />
                    </CustomButton>
                </Col>
            </FormItem>
        </Form>
    );
};

NewsLetterForm.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(NewsLetterForm);
