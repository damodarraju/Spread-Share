var gulp = require("gulp");
var sass = require('gulp-sass')
var minifyCSS = require('gulp-minify-css')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
        livereload: true,     
    });
});

// scss to css
gulp.task('styles', function() {
    gulp.src('sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(gulp.dest('css/'))
})

// watching tasking for edits
gulp.task('watch', ['styles'], function(){
    var watcher = gulp.watch(['html-pages/*.html','css/*.css']);
    watcher.on('change', function(event){
        console.log('File: ' + event.path + 'was changed.')
    })
})
// public build
gulp.task('public', ['styles'])

// default
gulp.task('default', ['watch', 'webserver', 'public'])