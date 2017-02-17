/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');
const reload = browserSync.reload;

// create a default task and just log a message
gulp.task('sass', function () {
  return gulp.src('./app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/styles/'));
});


gulp.task('serve', function () {

	browserSync({
		notify: false,
		port: 4000,
		index: 'demo.html',
		server: {
			baseDir: ['app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch(['app/*.html','app/styles/*.css','app/scripts/*.js']).on('change',reload);
  	gulp.watch('./app/sass/*.scss', ['sass']);
});

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});