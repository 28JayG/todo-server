const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'User must have a firstName'],
  },
  lastName: String,
  email: String,
  phone: String,
  phoneVerified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
