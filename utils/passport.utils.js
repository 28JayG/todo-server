exports.authUser = (req, accessToken, refreshToken, profile, done) => {
  return done(null, { profile, accessToken });
};

exports.authUserSaml = (req, profile, done) => {
  console.log('authUserSaml')
  console.log(profile, req);
  return done(null, profile);
};
