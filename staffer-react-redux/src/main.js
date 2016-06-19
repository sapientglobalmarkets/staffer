import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './app';
import { configureStore } from './app';

// Observe loading of Roboto (to remove Roboto, remove the <link> tag in
// the index.html file and this observer)
import styles from 'styles/styles.css';
import FontFaceObserver from 'fontfaceobserver';
const robotoSansObserver = new FontFaceObserver('Roboto', {});

// When Roboto is loaded, add a font-family using Roboto to the body
robotoSansObserver.check().then(() => {
    document.body.classList.add(styles.fontLoaded);
}, () => {
    document.body.classList.remove(styles.fontLoaded);
});

// Avoid iOS's 300ms tap delay by injecting TapEventPlugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Customize MuiTheme by overriding the getMuiTheme() values
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    teal400, teal500, teal700,
    purple100, purple200, purple500
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: teal500,
        primary2Color: teal700,
        primary3Color: teal400,
        accent1Color: purple200,
        accent2Color: purple100,
        accent3Color: purple500
    }
});

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/lib/sanitize.css';

// Create redux store
const initialState = {};
const store = configureStore(initialState);

// Inject MuiTheme into the application context
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
);
