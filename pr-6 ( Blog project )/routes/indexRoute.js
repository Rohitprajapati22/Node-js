const express = require('express');
const routes = express.Router();
const { loginPage, registerPage, registerUser, dashboardPage, loginUser, logout, insertData, addBlog, viewBlog, editBlog, updateBlog, deleteUser, readMore } = require('../controllers/AuthController');
const multer = require('multer');
const path = require('path');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('image');


// Routes
routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.post('/registeruser', registerUser);
routes.get('/dashboard', dashboardPage);
routes.get('/addblog', addBlog);
routes.post('/insertdata', fileupload, insertData);
routes.get('/viewblog', viewBlog);
routes.get('/delete', deleteUser)
routes.get('/edit', editBlog);
routes.post('/updateblog', fileupload, updateBlog);
routes.post('/loginuser', loginUser);
routes.get('/logout', logout);
routes.get('/readmore', readMore);

module.exports = routes;
