const {check} = require('express-validator')

exports.checkBodyNum_Name_resident = (() => {
    return [
        check('phone_number')
            .notEmpty()
            .withMessage('phone_number is required')
            .custom((val) => /^\+\d{12}$/.test(val))
            .withMessage('phone_number shouldbe +998991234567'),
        check('is_resident')
            .notEmpty()
            .withMessage('is_resident field is required')
            .isBoolean()
            .withMessage('is_resident must be 1 or 0'),
        check('full_name')
            .custom((val) => {
                if (val) {
                    if (/^[A-Za-z\s]+$/.test(val)) {
                        return true
                    } else return false
                } else return true
            })
            .withMessage('Name must be alphabetic.')
            .custom((val) => {
                if (val) {

                    if (val.length>20) return false
                    if (val.length <= 20) {
                        let each_letter = val.match(/\b(\w)/g)
                        each_letter = each_letter.join('')
                        return !/[a-z]/.test(each_letter) && /[A-Z]/.test(each_letter)
                    }
                }
                else {
                    return true;
                }

            })
            .withMessage('full_name must be only letters,max 20 characters, Each word in capital letter')
    ]
})



