import React from 'react';

import AppBar from './app-bar/AppBar';
import NeedsPanel from './needs-panel/NeedsPanel';
import PeoplePanel from './people-panel/PeoplePanel';

export default class StafferView extends React.Component {

    render() {
        return (
            <div className="flex">
                <AppBar className="flex row shrink"/>
                <div className="flex row">
                    <NeedsPanel/>
                    <PeoplePanel className="shrink"/>
                </div>
            </div>
        );
    }
}