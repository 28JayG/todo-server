const router = require('express').Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

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

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/failure',
  }),
  (req, res) => {
    if (req.isAuthenticated())
      return res.redirect(
        `http://localhost:3000/profile?token=${req.user.accessToken}`
      );
  }
);

router.post('/saml/callback', (req, res) => {
  if (req.isAuthenticated())
    return res.redirect(`http://localhost:3000/profile`);

  return res.redirect(`http://localhost:3000/login`);
});

module.exports = router;
