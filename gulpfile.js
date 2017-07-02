'use strict';

const gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/*.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/*.css',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'nedbas',
    port: 9000,
    logPrefix: "Yurka"
};

const ftpConnection = ftp.create({
    host: "zzz.com.ua",
    user: "extrem7",
    password: "2705921ua",
    parallel: 3,
    log: gutil.log
});

const globs = ['./build/**'];

gulp.task('ftp:send', function () {
    gulp.src(globs, {
            base: './build',
            buffer: false
        })
        .pipe(ftpConnection.newer('/nedbas.zzz.com.ua'))
        .pipe(ftpConnection.dest('/nedbas.zzz.com.ua'))
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        /*.pipe(htmlmin({
            collapseWhitespace: true
        }))*/
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css:build', function () {
    gulp.src(path.src.style)
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        /*.pipe(imagemin({
            progressive: true,
            optimizationLevel: 10,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))*/
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync.init(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['webserver', 'watch']);
