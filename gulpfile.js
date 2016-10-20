
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var bootstrap = require('gulp-bootstrap-configurator');
var sassSources = 'sass/**/*.scss';
var sassOutput = 'template/stylesheets/';
var htmlSource = 'template/*.html';

var sassOptions = {

	errLogToConsole: true,
	outputStyle: 'expanded'
}

gulp.task('sass',function(){

	return gulp.src(sassSources)
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error',sass.logError))
	.pipe(cleanCSS({debug:true},function(details){

		console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(sassOutput))
	.pipe(browserSync.stream())
});

gulp.task('serve',['sass'],function(){

	browserSync.init({

		server:'template'
	})

	gulp.watch(sassSources,['sass']);
	gulp.watch(htmlSource).on('change',browserSync.reload);
});

gulp.task('default',['serve']);