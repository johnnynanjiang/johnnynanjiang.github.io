// Load Plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat')

// Styles
gulp.task('styles', function () {
  return gulp.src('scss/theme.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
})


// Scripts
gulp.task('scripts', function () {
  return gulp.src([
      'js/bootstrap/*.js',
      'js/vendor/*.js',
      'js/custom/*.js',
      'js/theme.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('theme.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
})

// Default task
gulp.task('default', gulp.series('styles', 'scripts'))

// Watch
gulp.task('watch', function () {
  // Watch .scss files
  gulp.watch(['scss/**/*.scss'], ['styles', 'styles-ecommerce'])

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts'])
})
