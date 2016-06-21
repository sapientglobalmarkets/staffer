/**
 *
 * Input.react.js
 *
 */


import React, {PropTypes} from 'react';
import './Input.css';


const Input = ({id, label, placeholder, type, defaultValue, handleAction, ariaLabel}) => (
    <div>
        <label>{label}</label>
        <input type={type}
               defaultValue={defaultValue}
               placeholder={placeholder}
               onChange={function (event) { handleAction(id, event.target.value)}.bind(this)}
               aria-label={ariaLabel} />
    </div>
);

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    ariaLabel: PropTypes.string,
    handleAction: PropTypes.func
};

export default Input;