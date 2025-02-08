const express = require('express');

const routes = express.Router()

const { viewSubcategory, addSubcategory, insertSubcategory, deleteSubcategory, editSubcategory, updateSubcategory, changeStatus } = require('../controllers/SubcategoryController');


routes.get('/', viewSubcategory)
routes.get('/addsubcategory', addSubcategory)
routes.post('/insertsubcategory', insertSubcategory)
routes.get('/deletesubcategory', deleteSubcategory)
routes.get('/editsubcategory', editSubcategory)
routes.post('/updatesubcategory', updateSubcategory)
routes.get('/changestatus',changeStatus)

module.exports = routes;