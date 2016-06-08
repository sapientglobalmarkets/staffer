import React from 'react';

export default class ContextProvider extends React.Component {

    static defaultProps = {};

    static childContextTypes = {
        store: React.PropTypes.object
    };

    getChildContext() {
        return this.props.context;
    }

    render() {
        return this.props.children
    }
}

