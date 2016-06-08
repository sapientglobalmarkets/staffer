import './needs-table.scss';
import React from "react";

function NeedView({need, selected, onNeedSelected}) {
    let {skill, project, startDate, endDate, person} = need;

    return (
        <tr className={`need-row pointer ${selected ? 'selected' : ''}`}
            onClick={()=>onNeedSelected(need)}>
            <td className="skill">{skill.name}</td>
            <td className="project">{project.name}</td>
            <td>
                <span className="start-date">{formatDate(startDate)}</span>
                <br />
                <span className="end-date">{formatDate(endDate)}</span>
            </td>
            <td className="assignment">{person ? person.name : ''}</td>
        </tr>

    );

    function formatDate(str) {
        let dt = new Date(str);
        return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
    }
}

export default class NeedsTable extends React.Component {

    state = {
        selectedNeedId: null
    };

    render() {
        let {needs} = this.props;
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
                                      selected={need.id === this.state.selectedNeedId}
                                      onNeedSelected={()=>this.selectNeed(need)}/>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }

    selectNeed(need) {
        this.setState({selectedNeedId: need.id});
    }

}

NeedsTable.defaultProps = {
    needs: []
};