const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const errors = require('../constants/errors');

exports.uploadImage = catchAsync(async (req, res, next) => {
    console.log('come uploadImage',req.file)
    if (!req.body.image) {
        console.log('file not found')
        res.status(400).json({
            success:false
        });
    }

    res.status(200).json({
        path: req.body.image,
    });
});

exports.uploadFile = catchAsync(async (req, res, next) => {
    if (!req.body.file) return next(new AppError(400, errors.BAD_REQUEST));

    res.status(200).json({
        path: req.body.file,
    });
});
