var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    strip = require('gulp-strip-comments');

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(usemin({
            inlinejs: [uglify()],
            inlinecss: [cssnano()]
        }))
        .pipe(strip())
        .pipe(gulp.dest('doc/'));
});


gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('doc'));
});

gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('doc'));
});

gulp.task('images', function () {
    return gulp.src('src/**/*.svg')
        .pipe(gulp.dest('doc'));
});
