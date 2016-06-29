import './NeedsPanel.css';

import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';

import NeedsTable from './NeedsTable';
import NeedsFilter from './NeedsFilter';

@connect
@observer
export default class NeedsPanel extends React.Component {

    render() {
        let {store: {matchingNeeds}} = this.context;
        return (
            <div className={`NeedsPanel ${this.props.className}`}>
                <h1 className="NeedsPanel-title">Needs</h1>
                <div className="NeedsPanel-container u-flex u-flexGrow1">
                    <NeedsFilter />
                    <NeedsTable needs={matchingNeeds}/>
                </div>
            </div>
        );
    }

}

NeedsPanel.defaultProps = {};
