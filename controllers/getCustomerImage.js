const catchAsync = require('../utils/catchAsync');
require('dotenv').config();
const {uploadImage, deleteFile} = require('../utils/multer')
let multer = require('multer')
const sizeOf = require('image-size')
const AppError = require("./../utils/appError");
const {validationResult} = require("express-validator");

exports.create = catchAsync(async (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            result_message: "fail",
            errors: errors.array()
        });
    }
    uploadImage(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                result_message: 'fail',
                err: err.message
            });
        } else if (err) {
            return res.status(400).json({
                result_message: 'fail',
                err: err.message
            });
        }
        // check image resolution 800X600
        else {
            try {
                const dimensions = sizeOf(req.file.path);
                if (dimensions.width > 800 || dimensions.height > 600) {
                    await deleteFile(req.file.path)
                    return res.status(400).json({
                        result_message: 'fail',
                        message: "Picture resolution must be lower than 800 by 600 px"
                    })
                }

                return res.status(200).json({
                    result_message: 'success',
                    image_res_width: dimensions.width,
                    image_res_height: dimensions.height,
                    image_srv_path: req.file.path,
                    image_size: (parseFloat(req.file.size) / (1024 * 1024)).toFixed(4),
                    image_http_path: `${process.env.HTTP_LOCATION}/${req.file.path}`,
                })
            } catch (err) {
                return next(new AppError(400, err));
            }
        }
    })
});


