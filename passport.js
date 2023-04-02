const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const { authUserSaml } = require('./utils/passport.utils');
const { GOOGLE_CRET, GOOGLE_SSO_URL } = require('./constants/config');

passport.use(
  new SamlStrategy(
    {
      disableRequestedAuthnContext: true,
      callbackUrl: 'https://todo-server-mu.vercel.app/api/auth/saml/callback',
      cert: GOOGLE_CRET,
      issuer: 'TEST_SAML',
      passReqToCallback: true,
      entryPoint: GOOGLE_SSO_URL,
    },
    authUserSaml
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
