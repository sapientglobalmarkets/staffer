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
            <div className={this.props.className}>
                <h1 className="title">Needs</h1>

                <div className="Grid Grid--withGutter">
                    <div className="Grid-cell u-size1of3">
                        <NeedsFilter />
                    </div>
                    <div className="Grid-cell u-size2of3">
                        <NeedsTable needs={matchingNeeds}/>
                    </div>
                </div>
            </div>
        );
    }

}

NeedsPanel.defaultProps = {};
