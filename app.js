const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const globalErrorHandler = require('./controllers/error');
const AppError = require('./utils/appError');
const indexRouter = require('./routes');
const path = require('path');
const swagger = require('swagger-ui-express');
const swaggerDocs = require('./docs');
// Initialize express app
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.use('/docs', swagger.serve, swagger.setup(swaggerDocs));
// Routes
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50Mb' }));
indexRouter(app);

// 404 Error
app.all('*', (req, res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});


// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;