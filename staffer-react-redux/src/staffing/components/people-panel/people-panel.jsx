import React from 'react';
import classNames from 'classnames';

import s from './people-panel.css';
import { PeopleTable } from './people-table';

export default class PeoplePanel extends React.Component {
    render() {
        return (
            <div className={classNames(s.peoplePanel, 'flex flex-column app-content')}>
                <h1 className="title">People</h1>
                <div className="flex flex-auto flex-row">
                    <PeopleTable />
                </div>
            </div>
        );
    }
}
