import './PeopleTable.css';

import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';
import includes from 'lodash/includes';

@connect('store')
@observer
class PersonView extends React.Component {
    render() {
        const {person, onAssignmentChange} = this.props;
        const {store} = this.context;
        const assigned = includes(person.needIds, store.selectedNeed.id);

        return (
            <tr key={person.id}>
                <td className="PeopleTable-col">
                    <label className="PeopleTable-name">
                        <input type="checkbox"
                               checked={assigned}
                               onChange={event=>onAssignmentChange(event.target.checked)}/>
                        {person.name}
                    </label>
                </td>
                <td className="PeopleTable-col">{person.email}</td>
                <td className="PeopleTable-col">{person.phone}</td>
            </tr>
        );
    }
}

@connect('store')
export default class PeopleTable extends React.Component {

    render() {
        return (
            <table className="PeopleTable">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.people
                        .map(p=> {
                            return (
                                <PersonView person={p}
                                            onAssignmentChange={(assigned)=>this.changeAssignment(p, assigned)}
                                            key={p.id}/>
                            );
                        })
                }
                </tbody>
            </table>

        );
    }

    changeAssignment(person, assigned) {
        const {store} = this.context;
        if (assigned) {
            store.assignPerson(person, store.selectedNeed);
        } else {
            store.unassignPerson(person, store.selectedNeed);
        }
    }

}

PeopleTable.defaultProps = {
    people: []
};