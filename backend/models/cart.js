//schema of shopping cart

const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
  name: { type: String },
  dept: { type: String },
  price: { type: Number },
  pic: { type: String }
});

module.exports = Item;