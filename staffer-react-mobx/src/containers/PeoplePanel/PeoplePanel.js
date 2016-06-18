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
                <H1 className="PeoplePanel-title">People</H1>
                <div className="PeoplePanel-container u-flex u-flexAlignItemsStretch">
                    <PeopleTable people={matchingPeople}/>
                </div>
            </div>
        );
    }

}

PeoplePanel.defaultProps = {};