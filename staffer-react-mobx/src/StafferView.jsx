import './StafferView.css';

import AppBar from './app-bar/AppBar';
import NeedsPanel from './needs-panel/NeedsPanel';
import PeoplePanel from './people-panel/PeoplePanel';


export default class StafferView extends React.Component {

    render() {
        return (
            <div>
                <AppBar />
                <div className="StafferView">
                    <div className="Grid Grid--withGutter">
                        <NeedsPanel className="Grid-cell u-size7of12"/>
                        <PeoplePanel className="Grid-cell u-size5of12"/>
                    </div>
                </div>
            </div>
        );
    }
}