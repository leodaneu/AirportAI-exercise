/**
* App entrypoint.
*/
'use strict';
const express = require('express');

let app = express();
const PORT = 3000;

// Set up Express.
require('./server/setup/express')(app);

// Set up MongoDB.
require('./server/setup/mongoose')();

// Set up routes.
//const userRoutes = require('./server/routes/users');
//const productRoutes = require('./server/routes/products');
const routes = require('./server/routes');

//app.use('/users', userRoutes);
//app.use('/products', productRoutes);
app.use('/', routes);

// Start app.
app.listen(PORT, function() {
  console.log('App now listening on port ' + PORT);
});

module.exports = app;
