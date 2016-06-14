/**
 *
 * Button.react.js
 *
 */

import React, {PropTypes} from 'react';
import './Button.css';

const Button = ({className, handleAction, label}) => {
    className = className ? className : 'Button';

    return (
        <button className={className} onClick={handleAction}>{label}</button>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    handleAction: PropTypes.func
};

export default Button;