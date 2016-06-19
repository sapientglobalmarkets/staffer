import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { teal500, white } from 'material-ui/styles/colors';
import { connect } from 'react-redux';

import s from './header.css';
import { getNeedsSummary } from '../../selectors';

let Header = ({needsSummary}) => {
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
                <span className={s.openNeeds}>Open: {needsSummary.open}</span>
                <span className={s.closedNeeds}>Closed: {needsSummary.closed}</span>
                <span className={s.totalNeeds}>Total: {needsSummary.total}</span>
            </ToolbarGroup>
        </Toolbar>
    );
};

Header.propTypes = {
    needsSummary: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

    let staffingState = state.staffing;

    return {
        needsSummary: getNeedsSummary(staffingState)
    }
};

Header = connect(
    mapStateToProps
)(Header);

export default Header;
