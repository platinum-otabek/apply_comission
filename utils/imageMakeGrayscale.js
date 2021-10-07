const {check, header} = require('express-validator')

exports.checkBody = (() => {
    return [
        header('user_token')
            .notEmpty()
            .withMessage('user_token is required'),
        check('image_srv_path')
            .notEmpty()
            .withMessage('image_srv_path is required'),
    ]
})



