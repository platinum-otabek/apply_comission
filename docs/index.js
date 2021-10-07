const main = require('./swagger.json');
const tags = require('./tags.json');

const customerRoutes = require('./routes/Customer.json');

const customerModels = require('./models/Customer.json');


const paths = {
    ...customerRoutes,
};

const definitions = {
    ...customerModels,
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
