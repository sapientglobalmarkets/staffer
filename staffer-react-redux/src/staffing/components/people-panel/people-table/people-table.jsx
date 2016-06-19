import React from 'react';
import Checkbox from 'material-ui/Checkbox';

import s from './people-table.css';

export default function PeopleTable() {
    return (
        <div className={ s.peopleTable }>
            <table className="mintable full-width">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                <tr className={s.needRow} className="pointer">
                    <td>
                        <Checkbox />
                    </td>
                    <td className={s.name}>John Smith</td>
                    <td className={s.email}>jmith@gmail.com</td>
                    <td className={s.phone}>(123) 456-7890</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
