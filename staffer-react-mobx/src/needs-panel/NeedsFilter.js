import './NeedsFilter.css';

import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';

//import Button from '../../components/Button';
//import Input from '../../components/Input';
import Select from '../common/Select';

@connect('store')
@observer
export default class NeedsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.applyFilter = this.applyFilter.bind(this);
        this.notifyFilterChange = this.notifyFilterChange.bind(this);
    }


    render() {
        const {filter, entityMap: {projects, skills, statuses}} = this.context.store;

        return (
            <div className="NeedsFilter">
                <div className="NeedsFilter-inputContainer">
                    <input label="From"
                           id="minStartDate"
                           placeholder="Start Date"
                           type="date"
                           defaultValue={filter.minStartDate}
                           handleAction={this.notifyFilterChange}
                           ariaLabel="From Date"/>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <input label="To"
                           id="maxStartDate"
                           placeholder="End Date"
                           type="date"
                           defaultValue={filter.maxStartDate}
                           handleAction={this.notifyFilterChange}
                           ariaLabel="To Date"/>
                </div>


                <div className="NeedsFilter-inputContainer">
                    <Select label="Project" id="projectId"
                            entryMap={projects}
                            handleAction={this.notifyFilterChange}/>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <Select label="Skill" id="statusId"
                            entryMap={skills}
                            handleAction={this.notifyFilterChange}/>
                </div>

                <div className="NeedsFilter-inputContainer">
                    <Select label="Status" id="statusId"
                            entryMap={statuses}
                            handleAction={this.notifyFilterChange}/>
                </div>

                <button onClick={this.applyFilter}
                        className="Button Button--default u-sizeFull">Search</button>
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