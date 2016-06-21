import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';

import s from './people-table.css';
import { changeAssignment } from '../../actions';
import {
    getMatchedPeopleIds,
    getPersonMap,
    getNeedMap,
    getSelectedNeedId
} from '../../selectors';

let PeopleTable = ({peopleIds, personMap, needMap, selectedNeedId, onAssignmentChanged}) => {
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
                {
                    peopleIds.map(id => {
                        let person = personMap[id];
                        return (
                            <tr key={id} className="pointer">
                                <td>
                                    <Checkbox
                                        checked={id === needMap[selectedNeedId].personId}
                                        onCheck={(event, isChecked) =>
                                            onAssignmentChanged(id, selectedNeedId, isChecked)} />
                                </td>
                                <td className={s.name}>{person.name}</td>
                                <td className={s.email}>{person.email}</td>
                                <td className={s.phone}>{person.phone}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

PeopleTable.propTypes = {
    peopleIds: React.PropTypes.array.isRequired,
    personMap: React.PropTypes.object.isRequired,
    needMap: React.PropTypes.object.isRequired,
    selectedNeedId: React.PropTypes.number,
    onAssignmentChanged: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

    let staffingState = state.staffing;

    return {
        peopleIds: getMatchedPeopleIds(staffingState),
        personMap: getPersonMap(staffingState),
        needMap: getNeedMap(staffingState),
        selectedNeedId: getSelectedNeedId(staffingState)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAssignmentChanged: (personId, selectedNeedId, isAssigned) =>
            dispatch(changeAssignment(personId, selectedNeedId, isAssigned))
    }
};

PeopleTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleTable);

export default PeopleTable;
