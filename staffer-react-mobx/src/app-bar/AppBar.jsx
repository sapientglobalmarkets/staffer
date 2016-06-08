import './app-bar.scss';
import React from 'react';
import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';

@connect('store')
@observer
export default class AppBar extends React.Component {

    render() {
        let {store: {summary}} = this.context;
        let {open, closed, total} = summary;

        return (
            <div className={`toolbar ${this.props.className}`} color="primary">
                <h1 className="toolbar-title shrink">Staffer</h1>
                <span className="toolbar-gap"/>
                <span className="toolbar-open shrink">Open: {open}</span>
                <span className="toolbar-closed shrink">Closed: {closed}</span>
                <span className="toolbar-total shrink">Total: {total}</span>
            </div>
        );

    }

}

AppBar.defaultProps = {};