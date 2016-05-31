'use strict';

var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var join = require('path').join;
var $ = require('gulp-load-plugins')({ lazy: true });

var allTypeScript = join(config.SRC_DIR, '**/*.ts');
var allTypeDefinitions = join(config.TYPINGS_DIR, 'main/**/*.ts');
var nodeServer = join(config.DIST_DIR, 'server.js');

// port defined in the environment takes precedence over the default port
var port = process.env.PORT || config.DEFAULT_PORT;

/** List the available gulp tasks */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/** Lint the TypeScript code */
gulp.task('lint', function () {
    // Important to return the stream for gulp-nodemon to wait for completion
    return gulp
        .src(allTypeScript)
        .pipe($.tslint())
        .pipe($.tslint.report('prose'));
});

/** Compile the TypeScript code */
gulp.task('compile', function () {
    var tsProject = $.typescript.createProject('tsconfig.json', {
        typescript: require('typescript')  // use the version loaded by npm
    });

    var sourceFiles = [
        allTypeScript,
        allTypeDefinitions
    ];

    var tsResult = gulp
        .src(sourceFiles)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject));

    tsResult.dts
        .pipe(gulp.dest(config.DIST_DIR));

    // Important to return the stream for gulp-nodemon to wait for completion
    return tsResult.js
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.DIST_DIR));
});

/** Clean up the directory */
gulp.task('clean', function () {
    return del(config.DIST_DIR);
});

/** Run the server */
gulp.task('serve', ['lint', 'compile'], function () {
    var nodeOptions = {
        script: nodeServer,
        watch: config.SRC_DIR,
        ext: 'ts',
        tasks: ['lint', 'compile'],
        env: {
            'PORT': port
        }
    };

    return $.nodemon(nodeOptions)
        .on('start', function () {
            log('*** nodemon started');
        })
        .on('restart', function (ev) {
            log('*** nodemon restarted');
            log('files changed:' + ev);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
});

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}

module.exports = gulp;
