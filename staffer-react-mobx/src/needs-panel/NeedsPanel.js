import './NeedsPanel.css';

import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';
import H1 from '../../components/H1';

import NeedsTable from './NeedsTable';
import NeedsFilter from './NeedsFilter';

@connect
@observer
export default class NeedsPanel extends React.Component {

    render() {
        let {store: {matchingNeeds}} = this.context;
        return (
            <div className={`NeedsPanel ${this.props.className}`}>
                <H1 className="NeedsPanel-title">Needs</H1>
                <div className="NeedsPanel-container u-flex u-flexAlignItemsStretch">
                    <div className="NeedsPanel-filter u-size1of4">
                        <NeedsFilter />
                    </div>
                    <div className="NeedsPanel-table u-size3of4">
                        <NeedsTable needs={matchingNeeds}/>
                    </div>
                </div>
            </div>
        );
    }

}

NeedsPanel.defaultProps = {};
