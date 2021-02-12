require('dotenv').config();
// Initialize the base modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

// Initialize the routes
const authRoute = require('./api/v1/routes/Auth.route');
const intrayRoute = require('./api/v1/routes/Intray.route');

// Initialize app and configs
const app = express();
mongoose.connect(process.env.DB_HOST_ADMIN);

// Initialize costum modules
const { swaggerSpecs, swaggerOptions } = require('./config/swagger');

// Initialize the middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Load specific middleware for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Initialize the documentation route
app.use(
  '/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerSpecs), swaggerOptions)
);

// Initialize the API routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/intray', intrayRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `App listening on ${process.env.HOST}:${process.env.PORT} in ${process.env.NODE_ENV} environment`
  );
  console.log(
    `Api documentation running on ${process.env.HOST}:${process.env.PORT}${process.env.API_VERSION}${process.env.PATH_DOCS}`
  );
});
