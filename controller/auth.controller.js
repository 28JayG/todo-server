const passport = require('passport');

exports.getGoogleAuth = () =>
  passport.authenticate('google', { scope: ['email', 'profile'] });

exports.handleGoogleAuthCallback = () =>
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/fail',
  });
