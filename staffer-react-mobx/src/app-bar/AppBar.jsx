import './AppBar.css';
import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';

@connect('store')
@observer
export default class AppBar extends React.Component {

    render() {
        let {store: {summary}} = this.context;
        let {open, closed, total} = summary;

        return (
            <div className="AppBar">
                <div className="AppBar-title">Staffer</div>
                <div className="AppBar-item">Open: {open}</div>
                <div className="AppBar-item">Closed: {closed}</div>
                <div className="AppBar-item">Total: {total}</div>
            </div>
        );

    }
}

AppBar.defaultProps = {};