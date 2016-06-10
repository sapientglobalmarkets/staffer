import './needs-table.scss';
import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';

@connect('store')
@observer
class NeedView extends React.Component {
    render() {
        let {need, onNeedSelected} = this.props;
        let {skillId, projectId, startDate, endDate, personId} = need;
        let {selectedNeed, entityMap: {skills, persons, projects}}= this.context.store;
        const selected = selectedNeed && need.id === selectedNeed.id;
        const skill = skills[skillId],
            project = projects[projectId],
            person = persons.get(personId);

        return (
            <tr className={`need-row pointer ${selected ? 'selected' : ''}`}
                onClick={()=>onNeedSelected(need)}>
                <td className="skill">{skill && skill.name}</td>
                <td className="project">{project && project.name}</td>
                <td>
                    <span className="start-date">{formatDate(startDate)}</span>
                    <br />
                    <span className="end-date">{formatDate(endDate)}</span>
                </td>
                <td className="assignment">{person && person.name}</td>
            </tr>

        );
    }

}

function formatDate(str) {
    let dt = new Date(str);
    return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
}

@connect('store')
@observer
export default class NeedsTable extends React.Component {

    render() {
        const {needs} = this.props;
        const {store:{selectedNeed}} = this.context;

        return (
            <table className="mintable">
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
                    needs.map(need=> {
                        return (
                            <NeedView need={need}
                                      key={need.id}
                                      onNeedSelected={()=>this.selectNeed(need)}/>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }

    selectNeed(need) {
        let {store} = this.context;
        store.selectNeed(need);
    }

}

NeedsTable.defaultProps = {
    needs: []
};