//
//  gulpfile.js
//  Tribe-cms
//
//  Created by Sahil Chaddha on 07/05/2018.
//  Copyright © 2018 Tribe-CMS.tv. All rights reserved.
//

var gulp = require('gulp')
var clean = require('gulp-clean')

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('default', ['clean'])