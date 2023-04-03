const User = require('../models/user.model');

exports.authUserSaml = async (req, profile, done) => {
  const { email, firstName, lastName } = profile.attributes;

  const user = await User.findOne({ email });

  if (!user) {
    await User.create({ email, firstName, lastName, lastLogin: new Date() });
  }

  return done(null, profile);
};
