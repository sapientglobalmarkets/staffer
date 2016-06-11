import 'suitcss-components-button';
import './NeedsFilter.css';

import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';
import values from 'lodash/values';


@connect('store')
@observer
export default class NeedsFilter extends React.Component {

    render() {
        const {filter, entityMap: {projects, skills, statuses}} = this.context.store;

        return (
            <div className="NeedsFilter">
                <div className="NeedsFilter-inputContainer">
                    <label>From</label>
                    <input type="date"
                           defaultValue={filter.minStartDate}
                           placeholder="Start Date"
                           onChange={event=>this.notifyFilterChange('minStartDate', event.target.value)}
                           aria-label="From Date"/>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <label>To</label>
                    <input type="date"
                           defaultValue={filter.maxStartDate}
                           placeholder="End Date"
                           onChange={event=>this.notifyFilterChange('maxStartDate', event.target.value)}
                           aria-label="To Date"/>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <label>Project</label>
                    <select defaultValue={filter.projectId}
                            onChange={(event)=>this.notifyFilterChange('projectId', event.target.value)}>
                        <option value="-1">All</option>
                            {
                                values(projects)
                                    .map(p=> {
                                        return <option value={p.id} key={p.id}>{p.name}</option>
                                    })
                            }
                    </select>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <label>Skill</label>
                    <select defaultValue={filter.skillId}
                            onChange={(event)=>this.notifyFilterChange('skillId', event.target.value)}>
                        <option value="-1">All</option>
                            {
                                values(skills)
                                    .map(x=> {
                                        return <option value={x.id} key={x.id}>{x.name}</option>
                                    })
                            }
                    </select>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <label>Status</label>
                    <select defaultValue={filter.statusId}
                            onChange={(event)=>this.notifyFilterChange('statusId', event.target.value)}>
                            {
                                values(statuses)
                                    .map(x=> {
                                        return <option value={x.id} key={x.id}>{x.name}</option>
                                    })
                            }
                    </select>
                </div>

                <button className="Button"
                        onClick={()=>this.applyFilter()}>Search
                </button>
            </div>
        );
    }

    notifyFilterChange(key, value) {
        const {store} = this.context;

        store.setFilterField(key, value);
    }

    applyFilter() {
        const {store} = this.context;
        store.loadNeeds();
    }
}

NeedsFilter.defaultProps = {};