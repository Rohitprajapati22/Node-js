const express = require("express");
const { 
    addBlog, 
    viewUserBlogs, 
    deleteBlog, 
    userBlogs, 
    getBlog, 
    updateBlog 
} = require("../controller/BlogController");

const routes = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({});
const blogImage = multer({ storage: storage }).single("image");

routes.post("/addblog", blogImage, addBlog);
routes.get("/viewblog", viewUserBlogs);
routes.get("/userblogs", userBlogs);
routes.delete("/deleteblog/:id", deleteBlog);
routes.get("/getblog/:id", getBlog);  
routes.put("/updateblog/:id", blogImage, updateBlog);
module.exports = routes;
