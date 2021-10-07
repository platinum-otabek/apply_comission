const router = require('express').Router();

const registerNewCustomer = require('../controllers/registerNewCustomer');


const validate_registerNewCustomer = require('../utils/validate_registerNewCustomer')

router.post('/', [validate_registerNewCustomer.checkBodyNum_Name_resident()],
    registerNewCustomer.create);


module.exports = router;
