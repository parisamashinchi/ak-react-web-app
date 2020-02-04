import React from 'react';
import PropTypes from 'prop-types';
import ProgressBarWithStyle from './progressBar.style';

const ProgressBar = (props) => {
    const {
        remaining,
        status,
        showInfo,
        className,
    } = props;
    return (
        <ProgressBarWithStyle
            percent={remaining}
            status={status}
            showInfo={showInfo}
            className={className}
        />
    );
};
ProgressBar.defaultProps = {
    status: 'active',
    showInfo: true,
    className: '',
};

ProgressBar.propTypes = {
    remaining: PropTypes.number.isRequired,
    status: PropTypes.string,
    showInfo: PropTypes.bool,
    className: PropTypes.string,
};

export default ProgressBar;
