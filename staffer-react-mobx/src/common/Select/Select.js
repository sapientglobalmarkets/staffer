/**
 *
 * Select.react.js
 *
 */


import React from 'react';
import './Select.css';
import values from 'lodash/values';

const Select = ({id, label, entryMap, handleAction}) => (

    <div>
        <label>{label}</label>
        <div className="Select">
            <select className="Select-control"
                    onChange={function (event) { handleAction(id, event.target.value)}.bind(this)}>
                <option value="-1">All</option>
                {
                        values(entryMap)
                            .map(x=> {
                                return <option value={x.id} key={x.id}>{x.name}</option>
                            })
                    }
            </select>
            <svg className="Select-figure" viewBox="0 0 2 1.5">
                <polygon points="0,0 2,0 1,1.5" fill="currentColor"/>
            </svg>
        </div>
    </div>
);

export default Select;