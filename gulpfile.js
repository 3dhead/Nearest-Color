/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function defaultTask() {
  browserSync.init({
    server: './',
  });

  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch('**/*.js').on('change', browserSync.reload);
}

exports.default = defaultTask;
