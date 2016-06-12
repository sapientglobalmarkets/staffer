import './NeedsPanel.css';

import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';
import NeedsTable from './needs-table/NeedsTable';
import NeedsFilter from './needs-filter/NeedsFilter';

@connect
@observer
export default class NeedsPanel extends React.Component {

    render() {
        let {store: {matchingNeeds}} = this.context;
        return (
            <div className={`NeedsPanel ${this.props.className}`}>
                <div className="NeedsPanel-container">
                    <h1>Needs</h1>

                    <div className="Grid Grid--withGutter">
                        <div className="Grid-cell u-size1of4">
                            <NeedsFilter />
                        </div>
                        <div className="Grid-cell u-size3of4">
                            <NeedsTable needs={matchingNeeds}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

NeedsPanel.defaultProps = {};
