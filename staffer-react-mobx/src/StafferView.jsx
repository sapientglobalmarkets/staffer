import './styles/theme.css';
import './StafferView.css';
import 'suitcss-utils-flex';
import 'suitcss-components-grid';
import 'suitcss-utils-size';

import AppBar from './app-bar/AppBar';
import NeedsPanel from './needs-panel/NeedsPanel';
import PeoplePanel from './people-panel/PeoplePanel';


export default class StafferView extends React.Component {

    render() {
        return (
            <div>
                <AppBar />
                <div className="StafferView">
                    <div className="Grid Grid--fit Grid--withGutter">
                        <NeedsPanel className="Grid-cell"/>
                        <PeoplePanel className="Grid-cell"/>
                    </div>
                </div>
            </div>
        );
    }
}