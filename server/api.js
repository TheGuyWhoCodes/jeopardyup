// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports = function(app, config) {
  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};