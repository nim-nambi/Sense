
//to check if user is authenticated or not 
//verify if token is from our app
//by default CANNOT access any db or api without token

const expressJwt = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  //const api = process.env.API_URL;
  return expressJwt({
    secret, //verify if token is generated from our server
    algorithms: ['HS256'],
    isRevoked: isRevoked //to specify the user is admin or not 
  }).unless({
    path: [
      { url: /\/perfumes(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/shoppingcart(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
      { url: /\/shoppingcart\/local(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
      { url: /\/users(.*)/, methods: ['GET'] },
      '/users/login',
      '/users/register',
      //'/shoppingcart'
      //backticks are used to inject variable in string

    ]
  })
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true) //if user is not admin reject token and api call
  }

  done(); // admin
}



module.exports = authJwt