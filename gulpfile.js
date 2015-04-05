// ##################################################################################################################################
/* Author: Iacob Silviu - Iulian @BlissTerra
/* Project: Smart-Advertiser (~ http://smart-advertiser.com ~)
/* Date: 3 / 22 / 2015
// ################################################################################################################################*/
// Nodejs Requires 
// ##################################################################################################################################

var gulp 			= require('gulp'),                  //* 
	gutil 			= require('gulp-util'),             //******** Utilities  
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
    				 'components/scripts/jquery.js',
					 // 'components/scripts/affix.js', 
					 // 'components/scripts/alert.js',
				 	 // 'components/scripts/button.js',
 				 	 // 'components/scripts/carousel.js',
 				 	 // 'components/scripts/collapse.js',
				 	 // 'components/scripts/dropdown.js',
 				 	 // 'components/scripts/modal.js',
				 	 // 'components/scripts/popover.js',
 				 	 // 'components/scripts/scrollspy.js',
 				 	 // 'components/scripts/tab.js',
				 	 // 'components/scripts/tooltip.js',
				 	 // 'components/scripts/tranzition.js',
			 	 	 // 'components/scripts/bootstrap-sprockets.js',

			 	 	 // Bootstrap distribution:
			 	 	 'components/scripts/bootstrap.js',

			 	 	 // External JavaScript components.
			 	 	 'components/scripts/external/backstretch.js',
			 	 	 'components/scripts/external/classie.js',
			 	 	 'components/scripts/external/counter-function.js',
			 	 	 'components/scripts/external/fitvids.js',
			 	 	 'components/scripts/external/images-loaded.js',
			 	 	 'components/scripts/external/isotope.pkgd.js',
			 	 	 'components/scripts/external/owl-carousel.js',
			 	 	 'components/scripts/external/pathloader.js',
			 	 	 'components/scripts/external/retina.js',
			 	 	 'components/scripts/external/scroll-reveal.js',
			 	 	 'components/scripts/external/smooth-scroll.js',
			 	 	 'components/scripts/external/stellar.js',
			 	 	 'components/scripts/external/waypoints.js',

		 	 	 	 // Project JavaScript components.
				 	 'components/scripts/preloader.js'],
	jsSources2 	  = ['components/scripts/custom.js', 
					 'components/scripts/googleMapInit.js', 
					 'components/scripts/external/overlay.js',
					 'components/scripts/angular.js',
					 'components/scripts/angular.animate.js',
					 'components/scripts/smartPrice.js',
					 'components/scripts/external/impromptu.js'],

 	sassSources	  = ['components/sass/**/**/**/*.scss', 'components/sass/*.scss', 'components/sass/**/*.scss', 'components/sass/**/**/*.scss'],
 	staticSources = [outputDir + '*.html', outputDir + 'pages/*.html'];

// ##################################################################################################################################
// JavaScript Tasks
// ##################################################################################################################################

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('scripts.js'))
		.pipe(gulpif(prod, guglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(notify({ message: 'JS Processed!' }))
		.pipe(connect.reload());
});

gulp.task('js2', function() {
	gulp.src(jsSources2)
		.pipe(gulpif(prod, guglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(notify({ message: 'JS 2 Processed!' }))
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
	gulp.src(['builds/development/*.html'])
		.pipe(gulpif(prod, minifyhtml()))
		.pipe(gulpif(prod, gulp.dest(outputDir)))
		.pipe(connect.reload());
});

gulp.task('static2', function() {
	gulp.src(['builds/development/pages/*.html'])
		.pipe(gulpif(prod, minifyhtml()))
		.pipe(gulpif(prod, gulp.dest(outputDir + 'pages')))
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
// Fonts Task
// ##################################################################################################################################

gulp.task('fonts', function() {
	gulp.src('builds/development/fonts/**/*.*')
		.pipe(gulpif(prod, gulp.dest('builds/production/fonts/')))
		.pipe(connect.reload());
});

// ##################################################################################################################################
// Watch Task
// ##################################################################################################################################

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js', 'js-lint']);
	gulp.watch(jsSources, ['js2', 'js-lint']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['static']);
	gulp.watch('builds/development/pages/*.html', ['static2']);
	gulp.watch('builds/development/img/**/*.*', ['images']);
	gulp.watch('builds/development/fonts/*.*', ['fonts']);
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

gulp.task('default', ['static', 'static2', 'js-lint', 'js','js2', 'compass', 'images', 'fonts', 'connect', 'watch']); 
// Process all of this. Yell 'gulp' in console.

// ##################################################################################################################################
// End Project Motha'fucka! XD . http://smart-advertiser.com
// ##################################################################################################################################