import React from 'react';
import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';
import NeedsTable from './needs-table/NeedsTable';

@connect
@observer
export default class NeedsPanel extends React.Component {

    render() {
        let {store: {matchingNeeds}} = this.context;
        return (
            <div className="flex">
                <h1 className="title shrink">Needs</h1>

                <div className="flex row">
                    <div>Needs Filter</div>
                    <div className="v-scroll">
                        <NeedsTable needs={matchingNeeds}/>
                    </div>
                </div>
            </div>
        );
    }

}

NeedsPanel.defaultProps = {};
