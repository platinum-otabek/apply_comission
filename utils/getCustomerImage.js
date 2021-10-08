const {check, header} = require('express-validator')

exports.checkBodyImage_Token = (() => {
    return [
        header('user_token')
            .notEmpty()
            .withMessage('user_token is required')
    ]
})



