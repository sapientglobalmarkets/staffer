import React from 'react';
import { connect } from 'react-redux';

import s from './staffing-page.css';
import { fetchProjects, fetchSkills, fetchNeeds } from '../actions';
import { Header } from './header';
import { NeedsPanel } from './needs-panel';
import { PeoplePanel } from './people-panel';

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
                    <NeedsPanel />
                    <div className={s.divider}/>
                    <PeoplePanel />
                </div>
            </div>
        );
    }
}

StaffingPage.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect()(StaffingPage);
