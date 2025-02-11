const express = require('express');

const routes = express.Router();




routes.use('/', require('./authRoute'));

routes.use('/product',require('./productRouts'))


module.exports = routes;