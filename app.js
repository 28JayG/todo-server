const express = require('express');
const morgan = require('morgan')('dev');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const session = require('express-session');

const globalErrorHandler = require('./controller/error.controller');
const {
  SESSION_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require('./constants/config');
const { authUser } = require('./utils/passport.utils');
const authRoutes = require('./routes/auth.routes');

// initialize express app
const app = express();
app.use(morgan);

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

app.get('/api/auth/google', console.log('dfdfdz') || passport.authenticate('google', { scope: ['email', 'profile'] }));
// app.use('/api/auth', authRoutes);

app.use('/', (req, res) => {
  res.send('success');
});

app.use('/fail', (req, res) => {
  res.send('fail');
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/google/callback',
      passReqToCallback: true,
    },
    authUser
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(globalErrorHandler);

module.exports = app;
