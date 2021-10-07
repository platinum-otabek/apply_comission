const catchAsync = require('../utils/catchAsync');
require('dotenv').config();
const {validationResult} = require('express-validator')
const jwt = require("jsonwebtoken");

const signToken = (text) =>
    jwt.sign({text}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

exports.create = catchAsync(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            result_message:"fail",
            errors: errors.array()
        });
    }
    const token = signToken(`phone_number:${req.body.phone_number},full_name:${req.body.full_name || ''}`)
    res.status(200).json({
        result_message: 'success',
        user_token:token
    });
});


