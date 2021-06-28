//express file 

const express = require('express');
const bodyParser = require('body-parser');

//need cors for comm with api & angular
const cors = require('cors');

const mongoose = require('./db.js');

const routesCart = require('./routes/routes.js');

const routesPerfumes = require('./routes/perfume-route.js');

const routesUsers = require('./routes/user-route.js');

const errorHandler = require('./helpers/error-handler');

//for env variables
require('dotenv/config');

const authJwt = require('./helpers/jwt');



//to create express server
const app = express();

app.use(bodyParser.json()); //helps pass json data to api
app.use(cors({ origin: 'http://localhost:4200' })); //path of angular app
app.use(errorHandler);
app.use(authJwt());
//express server listens at port 3000
app.listen(3000, () => console.log('Express Server started at port: 3000'));

app.use('/shoppingcart', routesCart);
app.use('/perfumes', routesPerfumes);
app.use('/users', routesUsers);