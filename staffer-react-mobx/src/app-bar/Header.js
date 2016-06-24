import './Header.css';
import {connect} from 'mobx-connect';
import {observer} from 'mobx-react';

@connect('store')
@observer
export default class Header extends React.Component {

    render() {
        let {store: {summary}} = this.context;
        let {open, closed, total} = summary;

        return (
            <section className="Header">
                <div className="Header-items">
                    <div className="Header-title">Staffer</div>
                    <div className="Header-item">Open: {open}</div>
                    <div className="Header-item">Closed: {closed}</div>
                    <div className="Header-item">Total: {total}</div>
                </div>
            </section>
        );
    }
}

Header.defaultProps = {};