import './styles/base.css';

import React from 'react';
import {render} from 'react-dom';

import StafferView from './StafferView';
import ContextProvider from './ContextProvider';
import store from './store';

let root = (
    <ContextProvider context={{store}}>
        <StafferView />
    </ContextProvider>
);

render(root, document.querySelector('.app-content'));