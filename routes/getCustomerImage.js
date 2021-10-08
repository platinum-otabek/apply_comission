const router = require('express').Router();
const getCustomerImage = require('../controllers/getCustomerImage')
const getCustomerImageValidation = require('../utils/getCustomerImage')

router.post('/', [getCustomerImageValidation.checkBodyImage_Token()], getCustomerImage.create)


module.exports = router