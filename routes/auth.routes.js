const router = require('express').Router();
const passport = require('passport');
const bodyPraser = require('body-parser');

router.get(
  '/saml',
  passport.authenticate('saml', {
    failureRedirect: '/api/auth/failure',
    failureFlash: true,
  })
);

router.get('/failure', (req, res) => {
  return res.status(401).json({ success: false });
});

router.post(
  '/saml/callback',
  bodyPraser.urlencoded({ extended: false }),
  passport.authenticate('saml', {
    failureRedirect: '/api/auth/failure',
    failureFlash: true,
  }),
  (req, res) => {
    if (req.isAuthenticated())
      return res.redirect('http://localhost:3000/profile');
    return res.redirect('http://localhost:3000/login');
  }
);

module.exports = router;
