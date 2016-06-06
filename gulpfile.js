var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

gulp.task('build', function () {
  browserify({entries: './src/components/index.jsx', extensions: ['.jsx'], debug: true})
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
  .pipe(sass(
    {outputStyle: 'expanded'}
    ).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./public/styles/'));
});

gulp.task('watch', ['styles'], function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);

  var bundler = watchify(browserify({
    entries: './src/components/index.jsx', 
    extensions: ['.jsx'], 
    debug: true,
    cache: {},
    packageCache: {}
  }).transform('babelify', {presets: ['es2015', 'react']}));

  function rebundle() {
    bundler.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/'))
    .on('end', function(){
      console.log('bundle complete');
    });
  }

  bundler.on('update', function() {
    console.log('-> bundling...');
    rebundle();
  });

  rebundle();
});