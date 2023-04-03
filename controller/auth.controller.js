const User = require('../models/user.model');
const {
  CLIENT_SUCCESS_URL,
  CLIENT_FAILURE_URL,
} = require('../constants/config');
const catchAsync = require('../utils/catch-async');

exports.handleAuthFailure = catchAsync((req, res) => {
  return res.status(401).json({ success: false });
});

exports.handleAuthCallback = catchAsync(async (req, res) => {
  if (req.isAuthenticated()) {
    await User.findOneAndUpdate({ email }, { lastLogin: new Date() });
    return res.redirect(CLIENT_SUCCESS_URL);
  }

  return res.redirect(CLIENT_FAILURE_URL);
});
