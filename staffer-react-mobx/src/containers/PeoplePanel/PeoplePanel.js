import './peoplePanel.css';

import {observer} from 'mobx-react';
import {connect} from 'mobx-connect';
import H1 from '../../components/H1';
import PeopleTable from '../PeopleTable';

@observer
@connect('store')
export default class PeoplePanel extends React.Component {

    render() {
        let {store: {matchingPeople}} = this.context;

        return (
            <div className={`PeoplePanel ${this.props.className}`}>
                <div className="PeoplePanel-container">
                    <H1>People</H1>
                    <div className="PeoplePanel-table">
                        <PeopleTable people={matchingPeople}/>
                    </div>
                </div>
            </div>
        );
    }

}

PeoplePanel.defaultProps = {};