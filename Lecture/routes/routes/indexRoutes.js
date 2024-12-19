const express = require('express');

const routes = express.Router();

const { HomePage } = require('../controller/HomeController');
const { CartPage } = require('../controller/CartController');


routes.get('/',HomePage);
routes.get('/cart',CartPage);


module.exports=routes;