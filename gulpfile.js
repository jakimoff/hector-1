const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const sprite = require('gulp-svg-sprite')
const rename = require('gulp-rename')

function bsync() {
  browserSync.init({
    server: {
      baseDir: 'dev',
      index: 'index.html'
    },
    notify: false,
    online: true
  })
}

function styles() {
  return src('dev/scss/**/*.scss')
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer({
            overrideBrowserlist: ['last 10 versions'],
            grid: true
          }))
         .pipe(cleancss({
           level: {
             1: {
               specialComments: 0
             }
           },
          //  format: 'beautify'
         }))
         .pipe(rename('main.min.css'))
         .pipe(dest('dev/css/'))
         .pipe(browserSync.stream())
}

function scripts() {
  return src([
        'dev/libs/jquery/jquery-3.6.0.min.js',
        'dev/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'dev/libs/slick-carousel/slick/slick.min.js',
        // 'dev/libs/jquery-nice-select/js/jquery.nice-select.min.js',
        'dev/js/common.js'
          ])
         .pipe(concat('app.min.js'))
         .pipe(uglify())
         .pipe(dest('dev/js/'))
         .pipe(browserSync.stream())
}

function svgsprite() {
  return src('dev/svg/src/**/*.svg')
         .pipe(sprite({
            mode: {
              stack: {
                  sprite: 'sprite.svg'  // sprite file name
              }
            },
         }))
         .pipe(dest('dev/svg/dest'))
}

function build() {
  return src([
            'dev/css/main.min.css',
            'dev/js/app.min.js',
            'dev/images/**/*',
            'dev/svg/dest/stack/sprite.svg',
            'dev/fonts/**/*',
            'dev/*.html'
          ], { base: 'dev' })
         .pipe(dest('build'))
}

function startwatch() {
  watch(['dev/js/**/*.js', '!dev/js/*.min.js'], scripts) // exclude main file and stop recursive watching
  watch('dev/scss/**/*.scss', styles)
  watch('dev/images/src/**/*', browserSync.reload)
  watch('dev/svg/src/**/*', svgsprite)
  watch('dev/*.html').on('change', browserSync.reload)
}

exports.bsync = bsync
exports.styles = styles
exports.scripts = scripts
exports.startwatch = startwatch
exports.svgsprite = svgsprite
exports.build = series(styles, scripts, svgsprite, build)

// --- //

exports.default = parallel(styles, scripts, bsync, startwatch)