/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map:any = {};

/** User packages configuration. */
const packages:any = {
    '@ngrx/store': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
    '@ngrx/core': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'index.js'
    },
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
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels:string[] = [
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

const cliSystemConfigPackages:any = {};
barrels.forEach((barrelName:string) => {
    cliSystemConfigPackages[ barrelName ] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System:any;

// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        '@ngrx': 'vendor/@ngrx',
        '@angular2-material': 'vendor/@angular2-material',
        'rxjs': 'vendor/rxjs',
        'lodash': 'vendor/lodash',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
