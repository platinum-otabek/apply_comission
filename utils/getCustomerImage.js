const {check, header} = require('express-validator')

exports.checkBodyImage_Token = function () {
    return [
        header('user_token')
            .notEmpty() 
            .withMessage('user_token is required')
    ]
}



