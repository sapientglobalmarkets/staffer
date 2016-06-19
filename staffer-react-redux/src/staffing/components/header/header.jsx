import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { teal500, white } from 'material-ui/styles/colors';

import s from './header.css';

export default function Header() {
    let toolbarStyle = {
        backgroundColor: teal500,
        color: white,
        flex: "0 0 auto"   // Ensure that toolbar does not grow or shrink in height
    };

    let titleStyle = {
        color: white
    };

    return (
        <Toolbar style={toolbarStyle}>
            <ToolbarGroup>
                <ToolbarTitle text="Staffer" style={titleStyle}/>
            </ToolbarGroup>
            <ToolbarGroup>
                <input type="date" />
                <span className={s.openNeeds}>Open: 10</span>
                <span className={s.closedNeeds}>Closed: 40</span>
                <span className={s.totalNeeds}>Total: 50</span>
            </ToolbarGroup>
        </Toolbar>
    );
}
