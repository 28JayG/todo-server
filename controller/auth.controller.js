const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/user.model');
const {
  CLIENT_SUCCESS_URL,
  CLIENT_FAILURE_URL,
  JWT_SECRET,
} = require('../constants/config');
const catchAsync = require('../utils/catch-async');

exports.handleAuthFailure = catchAsync((req, res) => {
  return res.status(401).json({ success: false });
});

exports.handleAuthCallback = catchAsync(async (req, res) => {
  if (req.isAuthenticated()) {
    const { email } = req.user;
    // update last login
    await User.findOneAndUpdate({ email }, { lastLogin: new Date() });

    // create jwt for the user
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.redirect(`${CLIENT_SUCCESS_URL}?token=${token}`);
  }

  return res.redirect(CLIENT_FAILURE_URL);
});

exports.protect = catchAsync(async (req, res, next) => {
  // get token and check if it exists
  const { authorization } = req.headers;

  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; //"Bearer ncuevr;fb" ->["Bearer", "ncuevr;fb"]
  }
  if (!token) return next(new AppError('User not logged in.', 401));

  // validate token
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  // check user exists
  const user = await User.findOne({ email: decoded.email });
  if (!user)
    return next(new AppError('user belonging to token does not exist', 401));

  // Grant access to protected route
  req.user = user;
  next();
});
