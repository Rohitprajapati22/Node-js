const express = require('express');

const routes = express.Router();
const { loginPage, dashboardPage } = require('../controllers/AuthController');


routes.get('/', loginPage)




routes.get('/dashboard', dashboardPage)






module.exports = routes;