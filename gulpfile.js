// https://gist.github.com/demisx/beef93591edc1521330a

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var clip = require('gulp-clip-empty-files');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var grep = require('gulp-grep');
var browserSync = require('browser-sync');
var bs;

gulp.task('sass', function() {
    if (bs) {
        bs.notify("Compiling, please wait!");
    }
    var stream = gulp.src('styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.', {sourceRoot: '/'}))
        .pipe(gulp.dest('public/'))
        .pipe(grep('**/*.css', {read: false, dot: true}));
    if (bs) {
        stream.pipe(bs.stream());
    }
    return stream;
});


gulp.task('js', function() {
    if (bs) {
        bs.notify("Compiling, please wait!");
    }
    var stream = gulp.src(['src/**/*.{js,jsx}', '!src/**/*.browser.{js,jsx}', '!src/browser/**/*.{js,jsx}'])
        .pipe(rename(function(path) {
            if (path.basename.endsWith('.server')) {
                path.basename = path.basename.slice(0, -'.server'.length);
            }
        }))
        .pipe(changed('lib/', {extension: '.js'}))
        .pipe(sourcemaps.init())
        .pipe(clip())
        .pipe(babel({
            blacklist: [
                "es3.memberExpressionLiterals",
                "es3.propertyLiterals",
                "es5.properties.mutators",
                "es6.blockScoping",
                "es6.constants",
                'es6.arrowFunctions',
                "es6.properties.computed",
                "es6.properties.shorthand",
            ],
            optional: [
                "runtime",
                "es7.classProperties",
                "es7.decorators",
                "es7.exportExtensions",
                "asyncToGenerator",
                "optimisation.flow.forOf"
            ],
            loose: [
                "es6.spread",
                "es6.destructuring",
                "es6.forOf"
            ],
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: '/'}))
        .pipe(gulp.dest('lib/'));
    if (bs) {
        stream.pipe(bs.stream());
    }
    return stream;
});


gulp.task('js-browser', function() {
    if (bs) {
        bs.notify("Compiling, please wait!");
    }
    var stream = gulp.src(['src/**/*.{js,jsx}', '!src/**/*.server.{js,jsx}', '!src/server/**/*.{js,jsx}'])
        .pipe(rename(function(path) {
            if (path.basename.endsWith('.browser')) {
                path.basename = path.basename.slice(0, -'.browser'.length);
            }
        }))
        .pipe(changed('public/js/', {extension: '.js'}))
        .pipe(sourcemaps.init())
        .pipe(babel({
            optional: [
                "runtime",
                "es7.classProperties",
                "optimisation.flow.forOf",
                "es7.decorators",
                "es7.exportExtensions",
            ],
            loose: [
                "es6.spread",
                "es6.destructuring",
                "es6.forOf"
            ],
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: '/'}))
        .pipe(gulp.dest('public/js/'));
    /*if (bs) {
        stream.pipe(bs.stream());
    }*/
    return stream;
});


gulp.task('all', gulp.parallel('sass', 'js', 'js-browser'));
gulp.task('build', gulp.series('all'));

gulp.task('watch:styles', function() {
    gulp.watch('styles/**/*.styl', gulp.series('sass'));
});

gulp.task('watch:js', function() {
    gulp.watch('src/**/*.{js,jsx}', gulp.parallel('js', 'js-browser'));
});

var daemon = require('springbokjs-daemon').node([ 'lib/index.js' ]);
process.on('exit', function(code) {
    daemon.stop();
});
gulp.task('runandwatch:server', function() {
    daemon.start();
    gulp.watch(['lib/**/*.{js,jsx}', '../lib/**/*.js']).on('change', function() {
        daemon.restart();
        if (bs) {
            setTimeout(function() {
                bs.reload();
            }, 1000);
        }
    });
})



gulp.task('watch', gulp.parallel('watch:styles', 'watch:js', 'runandwatch:server'));

gulp.task('ws', function(cb) {
    bs = browserSync.create();
    bs.init({
        proxy: "localhost:3015",
        port: 4015,
        notify: true,
        open: false
    }, cb);
});

gulp.task('default', gulp.series('build', 'ws', 'watch'));
