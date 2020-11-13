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

// Initialize the routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// Initialize costum modules
const swaggerOptions = require("./config/swagger");

// Initialize the middleware
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'))

app.listen(process.env.PORT, () => console.log(`App listening on http://localhost:${process.env.PORT}`))