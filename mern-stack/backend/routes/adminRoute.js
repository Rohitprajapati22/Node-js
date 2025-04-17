const express = require('express');
const routes = express.Router();
const { 
    allUser, 
    deleteUser, 
    editUser, 
    AdminViewBlog, 
    AdminDeleteBlog, 
    getBlogCount
} = require('../controller/AdminController');
const { verifyToken } = require('../middleware/Auth');

const multer = require('multer');
const storage = multer.diskStorage({});
const userImage = multer({ storage: storage }).single('userimage');

routes.get('/alluser', allUser);
routes.delete('/deleteuser', deleteUser);
routes.put('/edituser', userImage, editUser);
routes.get('/adminviewblog', verifyToken, AdminViewBlog);
routes.delete('/deleteblog/:id', verifyToken, AdminDeleteBlog);
routes.get('/totalblogs', getBlogCount); 


module.exports = routes;
