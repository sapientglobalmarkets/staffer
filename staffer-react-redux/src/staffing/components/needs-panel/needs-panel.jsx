import React from 'react';

import s from './needs-panel.css';
import { NeedsFilter } from './needs-filter';
import { NeedsTable } from './needs-table';

export default class NeedsPanel extends React.Component {
    render() {
        return (
            <div className="flex flex-column flex-auto app-content">
                <h1 className="title">Needs</h1>
                <div className="flex flex-auto flex-row">
                    <NeedsFilter />
                    <NeedsTable />
                </div>
            </div>
        );
    }
}
