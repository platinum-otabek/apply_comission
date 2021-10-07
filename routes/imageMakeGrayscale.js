const router = require('express').Router();
const imageMakeGrayscale = require('../controllers/imageMakeGrayscale');
const imageMakeGrayscaleValidate = require('../utils/imageMakeGrayscale')

router.post('/',[imageMakeGrayscaleValidate.checkBody()],imageMakeGrayscale.create)


module.exports = router