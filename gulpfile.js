'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
function serve () {

    browserSync.init({
        server: "./",
        open: false,
        ghostMode: false
    });

    gulp.watch("./scss/*.scss", style);
    gulp.watch("./*.html").on('change', browserSync.reload);
};

// CSS
function style () {
    return gulp.src('./scss/main.scss', { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({
            basename: "sty",
            extname: ".css"
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
};

exports.default = serve;