const express = require('express');
const morgan = require('morgan')('dev');
const session = require('express-session');
const cors = require('cors');

require('./passport');
const passport = require('passport');
const globalErrorHandler = require('./controller/error.controller');
const { SESSION_SECRET } = require('./constants/config');
const authRoutes = require('./routes/auth.routes');

// initialize express app
const app = express();
app.use(morgan);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(globalErrorHandler);

module.exports = app;
