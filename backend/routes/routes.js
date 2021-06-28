//routes for express

const express = require('express');

const Item = require('../models/cart.js');

const Perfume = require('../models/perfumes.js');

const router = express.Router();

//Creating APIs
//get, post, put, delete

//Base path: http://localhost:3000/shoppingcart  (from index.js app.use)

//Get API
router.get('/', (req, res) => {
  Item.find((err, doc) => {
    if (err) {
      console.log('Error in Get Data' + err)
    } else {
      res.send(doc);
    }
  })

});

const ObjectId = require('mongoose').Types.ObjectId;

//Get single item API
router.get('/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    Item.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log('Error in Get Item by id' + err)
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send("No record found with id" + req.params.id)
  }

});


//Post API
//req- when angular app sends req the data is contained in the body of the request
router.post('/', (req, res) => {
  let item = new Item({
    name: req.body.name,
    dept: req.body.dept,
    price: req.body.price,
    pic: req.body.pic
  });

  item.save((err, doc) => {
    if (err) {
      console.log('Error in Post Data' + err)
    } else {
      res.send(doc);
    }
  })

});



//Delete API
router.delete('/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log('Error in delet Item by id' + err)
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send("No record found with id" + req.params.id)
  }

});


//Put API
//needed to update data
router.put('/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    let item = {
      name: req.body.name,
      dept: req.body.dept,
      price: req.body.price,
      pic: req.body.pic
    };

    Item.findByIdAndUpdate(req.params.id, { $set: item }, { new: true }, (err, doc) => {
      if (err) {
        console.log('Error in Update Item by id' + err)
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send("No record found with id" + req.params.id)
  }

});


//we export so that we can use them in other files
module.exports = router;