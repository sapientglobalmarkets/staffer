import './PeoplePanel.css';

import {observer} from 'mobx-react';
import {connect} from 'mobx-connect';
import PeopleTable from './PeopleTable';

@observer
@connect('store')
export default class PeoplePanel extends React.Component {

    render() {
        let {store: {matchingPeople}} = this.context;

        return (
            <div className={`PeoplePanel ${this.props.className}`}>
                <h1 className="PeoplePanel-title">People</h1>
                <div className="PeoplePanel-container u-flex u-flexGrow1">
                    <PeopleTable people={matchingPeople}/>
                </div>
            </div>
        );
    }

}

PeoplePanel.defaultProps = {};