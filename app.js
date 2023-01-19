const express = require('express');
const morgan = require('morgan')('dev');

const globalErrorHandler = require('./controller/error.controller');

// initialize express app
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan());
}
app.use(express.json());

app.use(globalErrorHandler);

module.exports = app;
