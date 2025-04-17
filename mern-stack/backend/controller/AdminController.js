const User = require('../models/UserModel');
const Blog = require('../models/BlogModel');
const cloudinary = require('cloudinary').v2;
const jwt = require("jsonwebtoken");

// Get all users
const allUser = async (req, res) => {
    try {
        let users = await User.find({});
        return res.status(200).send({
            success: true,
            message: "Users fetched successfully",
            users
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        let userid = req.query.userid;
        const oldimage = await User.findById(userid);

        if (oldimage && oldimage.public_id) {
            await cloudinary.uploader.destroy(oldimage.public_id);
        }

        await User.findByIdAndDelete(userid);

        return res.status(200).send({
            success: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
};

// Edit user
const editUser = async (req, res) => {
    try {
        const { userid, name, email, password, gender, city, contact } = req.body;

        if (req.file) {
            let oldimage = await User.findById(userid);
            if (oldimage && oldimage.public_id) {
                await cloudinary.uploader.destroy(oldimage.public_id);
            }

            let fileupload = await cloudinary.uploader.upload(req.file.path);

            await User.findByIdAndUpdate(userid, {
                name,
                email,
                password,
                gender,
                city,
                contact,
                image: fileupload.secure_url,
                public_id: fileupload.public_id
            });
        } else {
            let oldimage = await User.findById(userid);
            await User.findByIdAndUpdate(userid, {
                name,
                email,
                password,
                gender,
                city,
                contact,
                image: oldimage?.image,
                public_id: oldimage?.public_id
            });
        }

        return res.send({
            success: true,
            message: 'Record successfully updated',
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
};

// Admin View All User Blogs
const AdminViewBlog = async (req, res) => {
    try {
        console.log("Fetching blogs from database...");
        const blogs = await Blog.find()
            .populate("userId", "name email") // Populate userId with name and email
            .exec(); // Execute the query

        res.json({
            success: true,
            message: "Blogs fetched successfully",
            length: blogs.length,
            data: blogs,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ success: false, message: "Error fetching blogs" });
    }
};


// **Admin Delete Blog**
const AdminDeleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Delete blog
        await Blog.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
// Get total blog count
const getBlogCount = async (req, res) => {
    try {
        let totalBlogs = await Blog.countDocuments(); // Total blogs count karein
        return res.status(200).send({
            success: true,
            message: "Total blog count fetched successfully",
            totalBlogs
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
};



module.exports = {
    allUser,
    deleteUser,
    editUser,
    AdminViewBlog,
    AdminDeleteBlog,
    getBlogCount
};
