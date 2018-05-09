//
//  gulpfile.js
//  RUDY
//
//  Created by Sahil Chaddha on 07/05/2018.
//  Copyright © 2018 RUDY. All rights reserved.
//

var gulp = require('gulp')
var clean = require('gulp-clean')

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('deploy', function () {
    return gulp.src(['./src/payload/*',
                        ])
    .pipe(gulp.dest('./dist/payload/'))
});

gulp.task('default', ['clean'])