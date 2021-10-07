const catchAsync = require('../utils/catchAsync');
require('dotenv').config();
const Jimp = require('jimp');
const {validationResult} = require('express-validator')
require('dotenv').config();
const sizeOf = require("image-size");
require('dotenv').config();


exports.create = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            result_message: "fail",
            errors: errors.array()
        });
    }
    try {
        Jimp.read(req.body.image_srv_path, async (err, image) => {
            if (err) {
                res.status(400).json({
                    result_message: 'fail',
                    err: err
                })
            } else {
                const type = req.body.image_srv_path.split('.'); // get image type
                const fileName = `${new Date().getTime()}.${type[type.length - 1]}`  // create fileName not repeated
                const dir = `./${process.env.GRAY_IMAGE_PATH}/${fileName}` // directory grayscale image
                await image
                    .greyscale() // set greyscale
                    .write(dir); // save
                sizeOf(`./uploads/grayscale_images/${fileName}`, (err, dimensions) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            result_message: 'fail',
                            err: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            result_message: 'success',
                            image_res_width: dimensions.width,
                            image_res_height: dimensions.height,
                            image_srv_path: `${process.env.GRAY_IMAGE_PATH}/${fileName}`,
                            image_http_path: `${process.env.HTTP_LOCATION}/${process.env.GRAY_IMAGE_PATH}/${fileName}`,
                        })
                    }

                })
            }
        });
    } catch (err) {
        res.status(400).json({
            result_message: 'fail',
            err: err
        })
    }

});


