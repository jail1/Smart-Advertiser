// ##################################################################################################################################
/* Author: Iacob Silviu - Iulian @BlissTerra
/* Project: Smart-Advertiser
/* Date: 3 / 22 / 2015
// ################################################################################################################################*/
// Nodejs Requires 
// ##################################################################################################################################

var gulp 			= require('gulp'),                  //* 
	gutil 			= require('gulp-util'),             //******** Utilities  
	browserify		= require('gulp-browserify'),       //*
	gulpif 			= require('gulp-if'),               //*
	concat			= require('gulp-concat'),           //*    
	connect			= require('gulp-connect'),          //*     

	plumber			= require('gulp-plumber'),          //*
	jshint			= require('gulp-jshint'),           //******** Linting  
	notify			= require('gulp-notify'),           //*
	stylish			= require('jshint-stylish'),        //*       
          
	autoprefixer	= require('gulp-autoprefixer'),     //******** Preprocessing
	compass			= require('gulp-compass'),          //* 

	minifycss		= require('gulp-minify-css'),       //*    
	minifyhtml  	= require('gulp-minify-html'),      //******** Uglifying    
	guglify			= require('gulp-uglify');           //*
	


var env, jsSources, sassSources, staticSources, sassStyle, outputDir;
var env = process.env.NODE_ENV || 'development';
var prod = env === 'development' ? false : true;

if(env === 'development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

// ##################################################################################################################################
// File locations
// ##################################################################################################################################

    jsSources	  = [ // Bootstrap JavaScript components.
					 'components/scripts/affix.js', 
					 'components/scripts/alert.js',
				 	 'components/scripts/button.js',
 				 	 'components/scripts/carousel.js',
 				 	 'components/scripts/collapse.js',
				 	 'components/scripts/dropdown.js',
 				 	 'components/scripts/modal.js',
				 	 'components/scripts/popover.js',
 				 	 'components/scripts/scrollspy.js',
 				 	 'components/scripts/tab.js',
				 	 'components/scripts/tooltip.js',
				 	 'components/scripts/tranzition.js',
			 	 	 'components/scripts/bootstrap-sprockets.js',

			 	 	 // External JavaScript components.
			 	 	 'components/scripts/external/jquery.backstretch.js',
			 	 	 'components/scripts/external/imagesloaded.pkgd.js',
			 	 	 'components/scripts/external/classie.js',
			 	 	 'components/scritps/external/owl.carousel.js'

		 	 	 	 // Project JavaScript components.
 				 	 'components/scripts/overlay.js',
				 	 'components/scripts/preloader.js',
				 	 'components/scripts/googleMapInit.js',
				 	 'components/scripts/custom.js'],

 	sassSources	  = ['components/sass/**/**/**/*.scss'],
 	staticSources = [outputDir + '*.html', outputDir + 'pages/*.html'];

// ##################################################################################################################################
// JavaScript Task
// ##################################################################################################################################

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(prod, guglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(notify({ message: 'JS Processed!' }))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// JavaScript Lint Task
// ##################################################################################################################################

gulp.task('js-lint', function() {
	gulp.src(jsSources)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});

// ##################################################################################################################################
// Compass Task
// ##################################################################################################################################

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(plumber())
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'img',
			style: sassStyle
		}).on('error', function(error) {
			gutil.log(error);
			gutil.beep();
		}))
		.pipe(autoprefixer(
            'last 2 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'	
		))
		.pipe(gulpif(prod, minifycss()))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(notify({message: 'SCSS Processed!'}))
		.pipe(connect.reload())
});

// ##################################################################################################################################
// Satic (~ HTML, PHP, etc ~) Task
// ##################################################################################################################################

gulp.task('static', function() {
	gulp.src('builds/development/*.html')
		.pipe(gulpif(prod, minifyhtml()))
		.pipe(gulpif(prod, gulp.dest(outputDir)))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// Images Task
// ##################################################################################################################################

gulp.task('images', function() {
	gulp.src('builds/development/img/**/*.*')
		.pipe(gulpif(prod, gulp.dest('builds/production/img/')))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// Watch Task
// ##################################################################################################################################

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js', 'js-lint']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['static']);
	gulp.watch('builds/development/img/**/*.*', ['images']);
});

// ##################################################################################################################################
// Connect (~ Server ~) Task
// ##################################################################################################################################

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

// ##################################################################################################################################
// Default Task
// ##################################################################################################################################

gulp.task('default', ['static', 'js-lint', 'js', 'compass', 'images', 'connect', 'watch']); 
// Process all of this. Yell 'gulp' in console.

// ##################################################################################################################################
// End Project Motha'fucka! XD . http://smart-advertiser.com
// ##################################################################################################################################