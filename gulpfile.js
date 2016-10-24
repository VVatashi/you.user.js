var gulp = require("gulp");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['./src/main.ts', './src/utils.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('you.user.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build'], function () {
    gulp.src(['./src/you.meta.js', './build/you.user.js'])
        .pipe(concat('you.user.js'))
        .pipe(gulp.dest('./build'));
});
