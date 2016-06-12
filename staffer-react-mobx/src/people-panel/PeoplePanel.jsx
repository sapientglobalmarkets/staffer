import './peoplePanel.css';

import {observer} from 'mobx-react';
import {connect} from 'mobx-connect';
import PeopleTable from './people-table/PeopleTable';

@observer
@connect('store')
export default class PeoplePanel extends React.Component {

    render() {
        let {store: {matchingPeople}} = this.context;

        return (
            <div className={`PeoplePanel ${this.props.className}`}>
                <div className="PeoplePanel-container">
                    <h1>People</h1>
                    <div className="">
                        <PeopleTable people={matchingPeople}/>
                    </div>
                </div>
            </div>
        );
    }

}

PeoplePanel.defaultProps = {};