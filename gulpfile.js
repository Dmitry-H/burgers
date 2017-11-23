var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css"),
	autoprefixer = require("gulp-autoprefixer"),
	imagemin = require("gulp-imagemin"),
	cssunit = require("gulp-css-unit"),
	clean = require("gulp-clean"),
	newer = require("gulp-newer"),
    runSequence = require("run-sequence"),
	babel = require("gulp-babel");

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/css/*.css', browserSync.reload);
	// gulp.watch('src/js/*.js', ['babel']);
	gulp.watch('src/js/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
        browser: 'chrome'
	})
});

gulp.task("sass", function(){
	gulp.src("src/sass/style.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(cssunit({
         type: "px-to-rem",
         rootSize: 16
         }))
		// .pipe(cleanCSS())
		.pipe(gulp.dest("./src/css"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("babel", function() {
	gulp.src("src/js/*.js")
		.pipe(babel({
			presets: ["env"]
		}))
		.pipe(gulp.dest("src/js/babel"));
        // .pipe(browserSync.reload({stream: true}));
        browserSync.reload({stream: true});
});

gulp.task("build", function () {
	runSequence("clean", ["images", "fonts", "styles", "pages"])
});

gulp.task("images", function() {
	gulp.src("src/img/**/*.*")
		.pipe(newer("./dist/img"))
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/img"))
});

gulp.task("fonts", function () {
	gulp.src("./src/fonts/**/*.*")
		.pipe(gulp.dest("./dist/fonts"))
});

gulp.task("styles", function () {
    gulp.src("src/sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
/*        .pipe(cssunit({
            type: "px-to-rem",
            rootSize: 16
        }))*/
        .pipe(gulp.dest("./dist/css"))
});

gulp.task("pages", function () {
    gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"))
});

gulp.task("clean", function () {
    gulp.src(["./dist/**/*.*", "!./dist/img", "!./dist/img/**/*.*"], {read: false})
        .pipe(clean())
});
