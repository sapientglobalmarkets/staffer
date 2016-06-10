import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';
import values from 'lodash/values';
import './needs-filter.scss';

@connect('store')
@observer
export default class NeedsFilter extends React.Component {

    render() {
        const {filter, entityMap: {projects, skills, statuses}} = this.context.store;

        return (
            <div>
                <input type="date"
                       defaultValue={filter.minStartDate}
                       placeholder="Start Date"
                       onChange={event=>this.notifyFilterChange('minStartDate', event.target.value)}
                       aria-label="From Date"/>

                <span> to </span>
                
                <input type="date"
                       defaultValue={filter.maxStartDate}
                       placeholder="End Date"
                       onChange={event=>this.notifyFilterChange('maxStartDate', event.target.value)}
                       aria-label="To Date"/>

                <div className="input-container">
                    <label>Project</label>
                    <select value={filter.projectId}
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

                <div className="input-container">
                    <label>Skill</label>
                    <select value={filter.skillId}
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

                <div className="input-container">
                    <label>Status</label>
                    <select value={filter.statusId}
                            onChange={(event)=>this.notifyFilterChange('statusId', event.target.value)}>
                            {
                                values(statuses)
                                    .map(x=> {
                                        return <option value={x.id} key={x.id}>{x.name}</option>
                                    })
                            }
                    </select>
                </div>

                <button className="search-button"
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