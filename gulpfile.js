/**
 * Created by abaddon on 18.12.2014.
 */
(function (require) {
    "use strict";
    var gulp = require('gulp'),
        browserify = require('browserify'),
        uglify = require('gulp-uglify'),
        source = require('vinyl-source-stream');

    gulp.task("browserify", function () {
        return browserify('./js/main.js')
            .bundle()
            .pipe(source('app.compile.js'))
            .pipe(gulp.dest('dist/js/'));
    });

    gulp.task("min", function () {
        return gulp.src('dist/js/app.compile.js').pipe(uglify()).pipe(gulp.dest('dist/js/min'));
    });

    gulp.task("watch", function () {
        gulp.watch(["js/paginatorBox/*.jsx", "js/main.js"], ['browserify', 'min']);
    });
}(require));