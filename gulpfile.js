/**
 * Created by abaddon on 18.12.2014.
 */
(function (require) {
    "use strict";
    var gulp = require('gulp'),
        gulpLoadPlugins = require('gulp-load-plugins'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        plugins = gulpLoadPlugins();

    /*
     *Оптимизация сериптов
     */
    gulp.task("js", function () {
        gulp.src("js/paginatorBox/compile/*.js")
            .pipe(plugins.jshint(".jshintrc"))
            .pipe(plugins.jshint.reporter("default"))
            .pipe(plugins.concat("reactPaginatorBox.min.js"))
            .pipe(plugins.uglify())
            .pipe(gulp.dest("dist/js/paginatorBox/"));
    });

    gulp.task("react", function () {
        return gulp.src('js/paginatorBox/*.jsx')
            .pipe(plugins.react())
            .pipe(gulp.dest('js/paginatorBox/compile'));
    });

    gulp.task("browserify", function () {
        return browserify('./js/main.js')
            .bundle()
            .pipe(source('app.compile.js'))
            .pipe(gulp.dest('dist/js/'));
    });

    gulp.task("watch", function () {
        gulp.watch(["js/paginatorBox/*.jsx", "js/main.js"], ['react', 'js', 'browserify']);
    });
}(require));