import './styles/base.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './containers/Main';
import ContextProvider from './ContextProvider';
import store from './store';

let root = (
    <ContextProvider context={{store}}>
        <Layout />
    </ContextProvider>
);

ReactDOM.render(
    root,
    document.querySelector('.app-content')
);