//schema of shopping cart

const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
  name: { type: String },
  dept: { type: String },
  price: { type: Number },
  pic: { type: String }
});

const ItemLocalStorage = mongoose.model('ItemLocalStorage', {
  userId: {type: String},
  cartList: { type: [] },
});

module.exports = Item;
module.exports = ItemLocalStorage;