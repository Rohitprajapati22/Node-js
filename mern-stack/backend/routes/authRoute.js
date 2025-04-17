const express = require('express');

const routes = express.Router();

const { loginUser, registerUser, userwiseShowApi, adminwiseShowApi ,changeProfile} = require('../controller/AuthController');
const { verifyToken, authorizeRole } = require('../middleware/Auth');

const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});

const userImage = multer({ storage: storage }).single('userimage')

routes.post('/login', loginUser);
routes.post('/register', userImage, registerUser);
routes.get('/userwiseshowapi', verifyToken, userwiseShowApi);
routes.get('/adminshowapi', verifyToken, authorizeRole(['admin']), adminwiseShowApi);
routes.put('/admin/changeprofile', verifyToken, userImage, changeProfile)
routes.put('/user/changeprofile', verifyToken, userImage, changeProfile);




module.exports = routes;