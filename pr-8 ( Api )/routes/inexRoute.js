const express = require('express');

const routes = express.Router()

routes.use('/',require('./authRoute'))
routes.use('/blog',require('./blogRoute'))

module.exports = routes