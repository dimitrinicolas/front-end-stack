var gulp = require("gulp");
var plumber = require("gulp-plumber");

var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var minify = require("gulp-minify-css");

var browserSync = require("browser-sync");

gulp.task("style", function() {

	return gulp.src("source/style/main.compiled.css")

		.pipe(plumber())

		.pipe(postcss([

			require("postcss-import"),
			require("postcss-mixins")({ mixinsDir: __dirname + "/../source/style/mixins/" }),
			require("postcss-simple-extend"),
			require("postcss-nested"),
			require("postcss-for"),
			require("postcss-each"),
			require("postcss-simple-vars")(),
			require("postcss-assets")({ relativeTo: "assets/bin/" }),
			require("postcss-calc")({ preserve: false }),
			require("postcss-size"),
			require("postcss-position"),
			require("postcss-will-change"),
			require("postcss-color-gray")(),
			require("postcss-image-set"),
			require("autoprefixer")({ browsers: ["last 1 version"] }),
			require("postcss-pxtorem")({ replace: false }),
			require("postcss-color-function")(),
			require("postcss-merge-rules")()

		]))

		.pipe(rename("style.css"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("assets/bin/"))

        .pipe(browserSync.stream());

});
