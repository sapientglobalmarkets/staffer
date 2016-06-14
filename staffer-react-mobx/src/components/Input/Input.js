/**
 *
 * Input.react.js
 *
 */


import React from 'react';
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

export default Input;