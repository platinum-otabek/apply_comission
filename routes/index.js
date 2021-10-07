const registerNewCustomerRouter = require('./registerNewCustomer');
const getCustomerImage = require('./getCustomerImage');
const imageMakeGrayscale = require('./imageMakeGrayscale');




module.exports = (app) => {
    app.use('/registerNewCustomer', registerNewCustomerRouter);
    app.use('/getCustomerImage', getCustomerImage);
    app.use('/imageMakeGrayscale', imageMakeGrayscale);

};
