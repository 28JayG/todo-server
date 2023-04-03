const catchAsync = require('../utils/catch-async');

exports.getMe = catchAsync(async (req, res) => {
  return res.status(200).json({ success: true, data: req.user });
});
