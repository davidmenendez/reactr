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
  .pipe(gulp.dest('public'));
});

gulp.task('styles', function(){
  gulp.src('src/sass/**/*.scss')
  .pipe(sass(
    {outputStyle: 'expanded'}
    ).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./public'));
});