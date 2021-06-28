const mongoose = require('mongoose');

const userSchema = mongoose.model('userSchema', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  }
});


module.exports = userSchema;
