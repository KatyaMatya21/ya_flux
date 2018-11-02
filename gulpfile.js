var gulp = require('gulp');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var es = require('event-stream');
var buffer = require('vinyl-buffer');

gulp.task('ts', function () {

  var files = [
    './src/script.ts'
  ];

  var tasks = files.map(function(entry) {
    return browserify({
      basedir: '.',
      debug: true,
      entries: [entry],
      cache: {},
      packageCache: {}
    })
      .plugin(tsify)
      .bundle()
      .pipe(source(entry))
      .pipe(buffer())
      .pipe(gulp.dest("./dist/"));
  });

  // create a merged stream
  return es.merge.apply(null, tasks);

});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('clean', function () {
  return del(['docs/**/*']);
});

gulp.task('default', gulpSequence('clean', ['ts']));
