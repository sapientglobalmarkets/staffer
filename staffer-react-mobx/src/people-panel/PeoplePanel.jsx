import {observer} from 'mobx-react';
import {connect} from 'mobx-connect';
import PeopleTable from './people-table/PeopleTable';

@observer
@connect('store')
export default class PeoplePanel extends React.Component {

    render() {
        let {store: {matchingPeople}} = this.context;

        return (
            <div className={`flex ${this.props.className}`}>
                <h1 className="title shrink">People</h1>
                <div className="scroll">
                    <PeopleTable people={matchingPeople}/>
                </div>
            </div>
        );
    }

}

PeoplePanel.defaultProps = {};