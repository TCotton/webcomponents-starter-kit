const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const foreach = require('gulp-foreach');
const _ = require('underscore');
const pkg = require('./package.json');
const browserify = require('browserify');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const scriptBuild = _.propertyOf(_.pick(pkg, 'scriptBuild'))('scriptBuild');
const scriptBuildURI = _.values(scriptBuild);
const scriptBuildFiles = _.keys(scriptBuild);

let index = 0;

/**
 *
 */
gulp.task('copy:npm', () =>
  gulp.src(scriptBuildURI, {
    dot: true
  }).pipe(foreach(function (stream, file) {
    // file.contents = browserify(file.path, { debug: true }).bundle();
    return stream
      .pipe(rename(`${scriptBuildFiles[index++]}.js`))
  })).pipe(gulp.dest('dev/dist-modules/libraries'))
    .pipe(gulp.dest('dev/dist-system/libraries'))
);

/**
 * clean all folders
 */

gulp.task('clean', () => {
  return del(['dev'], { dot: true });
});

/**
 * Copy javascript files unmodified into the dist-modules folder
 */

gulp.task('copy:dist-modules', () =>
  gulp.src([
    'src/**',
    '!src/jspm_packages/*',
  ], {
    dot: true
  }).pipe(gulp.dest('dev/dist-modules'))
);


/**
 * Copy systemJS file into folder
 */

gulp.task('copy:systemjs', () =>
  gulp.src([
    'node_modules/systemjs/dist/system-production.js'
  ], {
    dot: true
  }).pipe(gulp.dest('dev/dist-modules/libraries')).pipe(gulp.dest('dev/dist-system/libraries'))
);

/**
 * Copy and rename Web Components polyfill after minifying it
 */

gulp.task('copy:webcomp', () =>
  gulp.src([
    './node_modules/document-register-element/build/document-register-element.js'
  ], {
    dot: true
  }).pipe(rename('web-components-ployfill.js'))
    .pipe(gulp.dest('dev/dist-modules/libraries'))
    .pipe(gulp.dest('dev/dist-system/libraries'))
);


/**
 * Generate index html file
 */

gulp.task('generateIndex', () =>
  gulp.src('./index.tpl.html').pipe(rename('index.html')).pipe(gulp.dest('./dev'))
);

/**
 * Copy and transform files into the system js folder
 */

gulp.task('babel:dev', () => {
  return gulp.src([
    '!src/libraries/*',
    '!src/jspm_packages/*',
    'src/**'
  ], {})
    .pipe($.sourcemaps.init())
    .pipe(babel({
      plugins: [
        'transform-es2015-modules-systemjs'
      ]
    })).pipe($.sourcemaps.write()).pipe(gulp.dest('dev/dist-system'))
});

gulp.task('dev', ['default'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WebComps',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['dev'],
    port: 3000
  });

  gulp.watch(['./index.tpl.html'], ['generateIndex', reload]);
  gulp.watch(['src/**/*.js'], ['copy:dist-modules', 'babel:dev', reload]);
});

gulp.task('default', ['clean'], cb =>
  runSequence(
    ['copy:dist-modules', 'copy:systemjs', 'babel:dev', 'generateIndex', 'copy:webcomp'],
    cb
  )
);