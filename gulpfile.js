var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream());
});


gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','src/js/*.js'])
        .pipe(gulp.dest("dist/assets/js"))
        .pipe(browserSync.stream());
});


gulp.task('copy', function() {
    return gulp.src(['src/*.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('copyreload',['copy'], function(){
    browserSync.reload;
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }  
    });
    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html'], ['copy']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js','copy','serve']);