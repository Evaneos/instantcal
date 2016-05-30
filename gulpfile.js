// https://gist.github.com/demisx/beef93591edc1521330a

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const clip = require('gulp-clip-empty-files');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const grep = require('gulp-grep');
const browserSync = require('browser-sync');

const production = process.env.NODE_ENV === 'production';
let bs;

gulp.task('sass', () => {
    if (bs) {
        bs.notify('Compiling, please wait!');
    }
    const stream = gulp.src('src/style/*.scss')
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


gulp.task('js', () => {
    if (bs) {
        bs.notify("Compiling, please wait!");
    }
    var stream = gulp.src(['src/**/*.{js,jsx}', '!src/**/*.browser.{js,jsx}', '!src/browser/**/*.{js,jsx}'])
        .pipe(rename((path) => {
            if (path.basename.endsWith('.server')) {
                path.basename = path.basename.slice(0, -'.server'.length);
            }
        }))
        .pipe(changed('lib/', {extension: '.js'}))
        .pipe(sourcemaps.init())
        .pipe(clip())
        .pipe(babel({
            presets: ['es2015-node5', 'react', 'stage-1'],
            plugins: (!production ? ['typecheck'] : [])
                .concat([
                    ['defines', { PRODUCTION: production, BROWSER: false, SERVER: true }],
                    'remove-dead-code',
                    ['discard-module-references', { targets: [] }],
                    'react-require',
                ]),
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: '/'}))
        .pipe(gulp.dest('lib/'));
    if (bs) {
        stream.pipe(bs.stream());
    }
    return stream;
});


gulp.task('js-browser', () => {
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
            presets: ['es2015', 'react', 'stage-1'],
            plugins: (!production ? ['typecheck'] : [])
                .concat([
                    ['defines', { PRODUCTION: production, BROWSER: true, SERVER: false }],
                    'remove-dead-code',
                    ['discard-module-references', { targets: [] }],
                    'react-require',
                ]),
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

gulp.task('watch:styles', () => {
    gulp.watch('src/style/**/*.scss', gulp.series('sass'));
});

gulp.task('watch:js', () => {
    gulp.watch('src/**/*.{js,jsx}', gulp.parallel('js', 'js-browser'));
});

var daemon = require('springbokjs-daemon').node(['--es_staging', 'lib/index.js' ]);
process.on('exit', function(code) {
    daemon.stop();
});
gulp.task('runandwatch:server', () => {
    daemon.start();
    gulp.watch(['lib/**/*.{js,jsx}', '../lib/**/*.js']).on('change', () => {
        daemon.restart();
        if (bs) {
            setTimeout(() => {
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
