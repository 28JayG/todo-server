const router = require('express').Router();
const passport = require('passport');
const bodyPraser = require('body-parser');
const {
  handleAuthFailure,
  handleAuthCallback,
} = require('../controller/auth.controller');

router.get(
  '/saml',
  passport.authenticate('saml', {
    failureRedirect: '/api/auth/failure',
  })
);

router.get('/failure', handleAuthFailure);

router.post(
  '/saml/callback',
  bodyPraser.urlencoded({ extended: false }),
  passport.authenticate('saml', {
    failureRedirect: '/api/auth/failure',
    failureFlash: true,
  }),
  handleAuthCallback
);

module.exports = router;
