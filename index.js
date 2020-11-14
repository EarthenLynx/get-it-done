// Initialize the base modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

// Initialize the routes
const todoRoute = require("./routes/todo");
const userRoute = require("./routes/user");

// Initialize app and configs
const app = express();
require('dotenv').config();

// Initialize costum modules
const swaggerOptions = require("./config/swagger");
const specs = swaggerJsdoc(swaggerOptions);

// Initialize the middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(morgan('dev'));

// Initialize the routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`Api documentation running on ${process.env.HOST}:${process.env.PORT}${process.env.PATH_DOCS}`)
})