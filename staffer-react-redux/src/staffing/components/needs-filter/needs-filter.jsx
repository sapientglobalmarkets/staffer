import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';

import { setFilterField, fetchNeeds } from '../../actions';
import { getFilter, getProjects, getSkills, getStatuses } from '../../selectors';

import s from './needs-filter.css';

let NeedsFilter = ({filter, projects, skills, statuses, onFilterChange, onSearchClicked}) => (
    <div className={ s.needsFilter }>
        <DatePicker
            hintText="From Date"
            container="inline"
            textFieldStyle={{width: '100%'}}
            firstDayOfWeek={0}
            autoOk={true}
            value={filter.minStartDate}
            onChange={(event, date) => onFilterChange('minStartDate', date)}/>

        <DatePicker
            hintText="To Date"
            container="inline"
            textFieldStyle={{width: '100%'}}
            firstDayOfWeek={0}
            autoOk={true}
            value={filter.maxStartDate}
            onChange={(event, date) => onFilterChange('maxStartDate', date)}/>

        <SelectField
            fullWidth={true}
            value={filter.projectId}
            onChange={(event, index, value) => onFilterChange('projectId', value)}
            floatingLabelText="Project">
            <MenuItem key={-1} value={-1} primaryText="All"/>
            {
                projects.map(project =>
                    <MenuItem key={project.id} value={project.id} primaryText={project.name}/>
                )
            }
        </SelectField>

        <SelectField
            fullWidth={true}
            value={filter.skillId}
            onChange={(event, index, value) => onFilterChange('skillId', value)}
            floatingLabelText="Skills">
            <MenuItem key={-1} value={-1} primaryText="All"/>
            {
                skills.map(skill =>
                    <MenuItem key={skill.id} value={skill.id} primaryText={skill.name}/>
                )
            }
        </SelectField>

        <SelectField
            fullWidth={true}
            value={filter.status}
            onChange={(event, index, value) => onFilterChange('status', value)}
            floatingLabelText="Status">
            {
                statuses.map(status =>
                    <MenuItem key={status.id} value={status.id} primaryText={status.name}/>
                )
            }
        </SelectField>

        <RaisedButton
            label="Search"
            className={s.searchButton}
            primary={true}
            onClick={() => onSearchClicked()}/>
    </div>
);

NeedsFilter.propTypes = {
    filter: React.PropTypes.object.isRequired,
    projects: React.PropTypes.array.isRequired,
    skills: React.PropTypes.array.isRequired,
    statuses: React.PropTypes.array.isRequired,
    onFilterChange: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

    let staffingState = state.staffing;

    return {
        filter: getFilter(staffingState),
        projects: getProjects(staffingState),
        skills: getSkills(staffingState),
        statuses: getStatuses(staffingState)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterChange: (key, value) => dispatch(setFilterField(key, value)),
        onSearchClicked: () => dispatch(fetchNeeds())
    }
};

NeedsFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(NeedsFilter);

export default NeedsFilter;
