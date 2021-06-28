//schema of perfumes db

const mongoose = require('mongoose');

const Perfume = mongoose.model('Perfume', {
  name: { type: String },
  dept: { type: String },
  price: { type: Number },
  pic: { type: String },
  info: { type: String }
});

module.exports = Perfume;