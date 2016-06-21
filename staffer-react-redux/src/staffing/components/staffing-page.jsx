import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import s from './staffing-page.css';
import { fetchProjects, fetchSkills, fetchNeeds } from '../actions';
import { Header } from './header';
import { NeedsFilter } from './needs-filter';
import { NeedsTable } from './needs-table';
import { PeopleTable } from './people-table';

class StaffingPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchProjects());
        dispatch(fetchSkills());
        dispatch(fetchNeeds());
    }

    render() {
        return (
            <div className="staffing-page flex flex-column flex-auto">

                <Header />

                <div className="flex flex-auto">

                    {/* Needs Panel */}
                    <div className={classNames(s.needsPanel, 'flex flex-column app-content')}>
                        <h1 className="title">Needs</h1>
                        <div className="flex flex-auto flex-row">
                            <NeedsFilter />
                            <NeedsTable />
                        </div>
                    </div>

                    <div className={s.divider}/>

                    {/* People Panel */}
                    <div className={classNames(s.peoplePanel, 'flex flex-column app-content')}>
                        <h1 className="title">People</h1>
                        <div className="flex flex-auto flex-row">
                            <PeopleTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StaffingPage.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect()(StaffingPage);
