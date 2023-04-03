const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'User must have a firstName'],
  },
  userId: {
    type: String,
    required: true,
  },
  lastName: String,
  email: String,
  profileImageUrl: String,
  lastLogin: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
