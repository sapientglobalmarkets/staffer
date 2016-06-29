import './StafferView.css';

import AppBar from './app-bar/AppBar';
import NeedsPanel from './needs-panel/NeedsPanel';
import PeoplePanel from './people-panel/PeoplePanel';


export default class Main extends React.Component {

    render() {
        return (
            <div className="StafferView u-flex u-flexCol">
                <AppBar />
                <main className="Main u-flex u-flexGrow1">
                    <NeedsPanel className="u-flex u-flexCol u-flexGrow1"/>
                    <PeoplePanel className="u-flex u-flexCol"/>
                </main>
            </div>
        );
    }
}
