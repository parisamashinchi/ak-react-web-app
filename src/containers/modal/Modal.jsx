import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import * as actions from './actions';

/*
 CustomModal is a component to show modal with passing data to it
 */
export const CustomModal = (props) => {
    /*
     modalContent contains a boolean to show or hide modal and content of we need to show
     showModal is an action to call when we want show or hide modal
     */
    const {
        modalContent,
        showModal,
        modalShowed,
        relatedData,
        lang,
        footer,
    } = props;
    const Child = modalContent;
    const width = relatedData.width;
    return (
        <Modal
            visible={modalShowed}
            onCancel={() => showModal(false)}
            width={width}
            footer={footer || null}
            className={relatedData.className ? relatedData.className : ''}
            centered={true}
            destroyOnClose={true}
        >
            {
                modalContent !== ''
                    ? (
                        <Child
                            {...props}
                            {...relatedData}
                            showModal={showModal}
                            lang={lang}
                        />
                    )
                    : <span />
            }
        </Modal>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showModal: actions.showModal,
    }, dispatch);
}

const mapStateToProps = state => ({
    modalShowed: get(state.Modal, 'show', false),
    modalContent: get(state.Modal, 'modalContent', ''),
    relatedData: get(state.Modal, 'data', {}),
    footer: get(state.Modal, 'footer', ''),
    lang: state.locale.lang,
});

CustomModal.propTypes = {
    modalShowed: PropTypes.bool.isRequired,
    modalContent: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
    relatedData: PropTypes.objectOf(PropTypes.string).isRequired,
    lang: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
