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
  return src(['src/html/*.html', '!src/html/_*.html']) // <-- ОНОВЛЕНО
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

// ===== SCSS =====
const scss_task = () => {
  return src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename('index.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
};

// ===== JavaScript =====
const js_task = () => {
  return src('src/js/*.js')
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
  return src('src/img/**/*', { encoding: false })
    .pipe(imagemin())
    .pipe(dest('dist/img'));
};

// ===== JSON Data (НОВЕ ЗАВДАННЯ) =====
const data_task = () => {
  return src('src/data/data.json') // Шлях до твого JSON
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

// ===== BrowserSync =====
const serve = () => {
  browserSync.init({
    server: { baseDir: 'dist' }
  });

  watch('src/html/*.html', html_task);
  watch('src/scss/**/*.scss', scss_task);
  watch('src/js/*.js', js_task);
  watch('src/data.json', data_task); // Додаємо відстеження JSON
};

// ===== Export Tasks =====
exports.html = html_task;
exports.scss = scss_task;
exports.js = js_task;
exports.img = img_task;
exports.data = data_task; // Експортуємо нове завдання
exports.bootstrapCSS = bootstrapCSS;
exports.bootstrapJS = bootstrapJS;
exports.default = series(
  parallel(html_task, scss_task, js_task, img_task, bootstrapCSS, bootstrapJS, data_task), // Додаємо data_task до збірки
  serve
);