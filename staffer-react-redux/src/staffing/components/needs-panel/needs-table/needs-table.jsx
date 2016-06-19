import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import s from './needs-table.css';
import { setSelectedNeed } from '../../../actions';
import {
    getFilteredNeedIds,
    getNeedMap,
    getSelectedNeedId,
    getSkillMap,
    getProjectMap,
    getPersonMap
} from '../../../selectors';

function formatDate(str) {
    let dt = new Date(str);
    return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
}

let NeedsTable = ({needIds, needMap, selectedNeedId, skillMap, projectMap, personMap, onNeedSelected}) => (
    <div className={ s.needsTable }>
        <table className="mintable full-width">
            <thead>
            <tr>
                <th>Skill</th>
                <th>Project</th>
                <th>Date</th>
                <th>Assignment</th>
            </tr>
            </thead>
            <tbody>
            {
                needIds.map(id => {
                    let need = needMap[id];
                    let {skillId, projectId, startDate, endDate, personId} = need;
                    let skill = skillMap[skillId];
                    let project = projectMap[projectId];
                    let person = personId ? personMap[personId] : null;
                    let selected = selectedNeedId && (id === selectedNeedId);

                    return (
                        <tr key={id} className={classNames(s.needRow, 'pointer', {selected: selected})}
                            onClick={() => onNeedSelected(id)}>
                            <td className={s.skill}>{skill.name}</td>
                            <td className={s.project}>{project.name}</td>
                            <td>
                                <span className={s.startDate}>{formatDate(startDate)}</span>
                                <br />
                                <span className={s.endDate}>{formatDate(endDate)}</span>
                            </td>
                            <td className={s.assignment}>{person ? person.name : null}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
);

NeedsTable.propTypes = {
    needIds: React.PropTypes.array.isRequired,
    needMap: React.PropTypes.object.isRequired,
    selectedNeedId: React.PropTypes.number,
    skillMap: React.PropTypes.object.isRequired,
    projectMap: React.PropTypes.object.isRequired,
    personMap: React.PropTypes.object.isRequired,
    onNeedSelected: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

    let staffingState = state.staffing;

    return {
        needIds: getFilteredNeedIds(staffingState),
        needMap: getNeedMap(staffingState),
        selectedNeedId: getSelectedNeedId(staffingState),
        skillMap: getSkillMap(staffingState),
        projectMap: getProjectMap(staffingState),
        personMap: getPersonMap(staffingState)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNeedSelected: (selectedNeedId) => dispatch(setSelectedNeed(selectedNeedId))
    }
};

NeedsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(NeedsTable);


export default NeedsTable;
