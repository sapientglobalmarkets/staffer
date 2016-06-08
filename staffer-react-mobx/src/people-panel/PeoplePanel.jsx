import React from 'react';

export default class PeoplePanel extends React.Component {

    render() {
        return (
            <div className="flex">
                <h1 className="title shrink">People</h1>
                <table className="mintable">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }

}

PeoplePanel.defaultProps = {};