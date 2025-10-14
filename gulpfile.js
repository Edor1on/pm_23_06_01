const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// ===== HTML =====
const html_task = () => {
    return src('app/html/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
};

// ===== SCSS =====
const scss_task = () => {
    return src('app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename('index.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
};

// ===== JavaScript =====
const js_task = () => {
    return src('app/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
};

// ===== Bootstrap =====
const bootstrapCSS = () => {
    return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(dest('dist/css'));
};

const bootstrapJS = () => {
    return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(dest('dist/js'));
};

// ===== Images =====
const img_task = () => {
    return src('app/img/**/*', { encoding: false })  // ← тут
        .pipe(imagemin())
        .pipe(dest('dist/img'));
};



// ===== BrowserSync =====
const serve = () => {
    browserSync.init({
        server: { baseDir: 'dist' }
    });

    watch('app/html/*.html', html_task);
    watch('app/scss/**/*.scss', scss_task);
    watch('app/js/*.js', js_task);
};

// ===== Export Tasks =====
exports.html = html_task;
exports.scss = scss_task;
exports.js = js_task;
exports.img = img_task;
exports.bootstrapCSS = bootstrapCSS;
exports.bootstrapJS = bootstrapJS;
exports.default = series(
    parallel(html_task, scss_task, js_task, img_task, bootstrapCSS, bootstrapJS),
    serve
);
