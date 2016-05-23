/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {};

/** User packages configuration. */
const packages: any = {
    'rxjs': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'Rx.js'
    },
    'lodash': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    '@angular2-material/core': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'core.js'
    },
    '@angular2-material/button': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'button.js'
    },
    '@angular2-material/checkbox': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'checkbox.js'
    },
    '@angular2-material/input': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'input.js'
    },
    '@angular2-material/list': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'list.js'
    },
    '@angular2-material/toolbar': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'toolbar.js'
    },
    'ng2-redux': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'lib/index.js'
    },
    'redux': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'lib/index.js'
    },
    'redux-thunk': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'lib/index.js'
    },
    'symbol-observable': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',

    // Thirdparty barrels.
    'rxjs',

    // App specific barrels.
    'app',
    'app/shared',
    'app/needs-panel',
    'app/people-panel',
    'app/needs-panel/needs-filter',
    'app/needs-panel/needs-table',
    'app/people-panel/people-table',
    /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
    cliSystemConfigPackages[barrelName] = {main: 'index'};
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        '@angular2-material': 'vendor/@angular2-material',
        'rxjs': 'vendor/rxjs',
        'lodash': 'vendor/lodash',
        'ng2-redux': 'vendor/ng2-redux',
        'redux': 'vendor/redux',
        'redux-thunk': 'vendor/redux-thunk',
        'symbol-observable': 'vendor/symbol-observable',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
