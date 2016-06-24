import './Main.css';

import Header from '../Header';
import NeedsPanel from '../NeedsPanel';
import PeoplePanel from '../PeoplePanel';


export default class Main extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <main className="Main">
                    <div className="Grid Grid--withGutter">
                        <NeedsPanel className="Grid-cell u-size7of12"/>
                        <PeoplePanel className="Grid-cell u-size5of12"/>
                    </div>
                </main>
            </div>
        );
    }
}
