const main = require('./swagger.json');
const tags = require('./tags.json');

const registerNewCustomerRoutes = require('./routes/registerNewCustomer.json');



const registerNewCustomerModels = require('./models/registerNewCustomer.json');

const paths = {
    ...registerNewCustomerRoutes
};

const definitions = {
    ...registerNewCustomerModels
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
