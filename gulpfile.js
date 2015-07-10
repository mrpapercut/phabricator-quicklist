
var gulp = require('gulp');

// utils
var gutil = require('gulp-util');

// browserify
var browserify = require('browserify');
var watchify = require('watchify');

// other transforms
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')

var jsfiles = './js/*.js';

var noSourceMaps = false;

function handleError(err) {
	gutil.log(err);
	this.emit('end');
}

gulp.task('set-chrome-env', function() {
	return process.env.NODE_ENV = 'chrome';
});

gulp.task('no-sourcemaps', function() {
	noSourceMaps = true;
});

function createJSBundle(options) {
	var opts = {
		debug: !noSourceMaps
	};

	var br = browserify(opts);

	var bundler = (options.watch ? watchify(br) : br)
		.transform('babelify');

	bundler = bundler.add(options.sourceName || jsfiles);

	function bundle() {
		var stream = bundler
			.bundle()
			.on('error', handleError)
			.pipe(source(options.sourceName))
			.pipe(buffer());

		stream = stream.on('error', handleError);

		stream = stream.pipe(gulp.dest(options.output));

		return stream;
	}

	return {bundler: bundler, bundle: bundle};
}

gulp.task('js', function() {
	return createJSBundle({
		watch: false,
		sourceName: './js/App.js',
		output: './build'
	}).bundle();
});

gulp.task('js-watch', function() {
	var jsBundle = createJSBundle({
		watch: true,
		sourceName: './js/App.js',
		output: './build'
	});
	jsBundle.bundler.on('update', jsBundle.bundle);
	jsBundle.bundler.on('log', function(msg) {
		gutil.log(msg);
	});
	return jsBundle.bundle();
});

gulp.task('js-minify', ['js'], function() {
	gulp.src('./build/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});

gulp.task('eslint', function() {
	return gulp.src([jsfiles])
		.pipe(eslint())
		.pipe(eslint.format());
});

function bundleCSS(watch) {
	var stream = gulp.src('./scss/main.scss');

	stream = stream
		.pipe(sass()
			.on('error', function(err) {
				gutil.log(gutil.colors.red('[gulp-sass]', err.message, 'on line', err.line + 'in', err.file));
				throw err;
			})
		);

	stream = stream.pipe(gulp.dest('./build/css'));
	if (watch) return stream;
}

gulp.task('css', function() {
	return bundleCSS();
});
gulp.task('_css-watch', function() {
	return bundleCSS(true);
});

gulp.task('css-watch', function() {
	return gulp.watch('./scss/**/*.scss', ['_css-watch']);
});

gulp.task('css-minify', ['css'], function() {
	gulp.src('./build/css/**/*.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('watch', ['js-watch', 'css', 'css-watch']);

gulp.task('default', ['no-sourcemaps', 'js', 'css', 'js-minify', 'css-minify']);

gulp.task('chromeapp', ['set-chrome-env', 'default'], function() {
	gulp.src('./build/**/*.*')
		.pipe(gulp.dest('./chromeapp/build/'));
});