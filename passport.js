const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SamlStrategy = require('passport-saml').Strategy;

const { authUser, authUserSaml } = require('./utils/passport.utils');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CRET,
  GOOGLE_SSO_URL,
} = require('./constants/config');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/auth/google/callback',
      passReqToCallback: true,
    },
    authUser
  )
);

passport.use(
  new SamlStrategy(
    {
      protocol: 'https://',
      disableRequestedAuthnContext: true,
      callbackUrl:
        'https://1030-2401-4900-1ca9-ea68-2361-9073-c00-54a0.in.ngrok.io/api/auth/saml/callback',
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
