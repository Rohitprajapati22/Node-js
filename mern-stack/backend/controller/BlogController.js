const BlogModel = require("../models/BlogModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

// ✅ Add a new blog
const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const userId = req.user?._id;
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, { folder: "blog-images" });

        if (!result.secure_url) {
            return res.status(500).json({ error: "Image upload failed" });
        }

        const newBlog = new BlogModel({
            title,
            content,
            image: result.secure_url,
            public_id: result.public_id,
            author: userId,
            userId: userId
        });

        await newBlog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            blog: newBlog,
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

// ✅ View User-Specific Blogs
const viewUserBlogs = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({ success: false, error: "Unauthorized access" });
        }

        const blogs = await BlogModel.find({ author: userId }).populate("author", "name email");
        if (!blogs.length) {
            return res.status(404).json({ success: false, message: "No blogs found for this user" });
        }

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// ✅ Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.public_id) {
            await cloudinary.uploader.destroy(blog.public_id);
        }

        await BlogModel.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Blog deleted successfully!" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get All Blogs (For Public View)
const userBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find()
            .populate("author", "name email") // ✅ यह Author का नाम और Email भी लाएगा।
            .sort({ createdAt: -1 }); // ✅ नए ब्लॉग सबसे ऊपर दिखेंगे।

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ success: false, message: "No blogs found" });
        }

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


// ✅ Get Single Blog
const getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.json({ success: true, blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Update Blog
const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = null;
        let public_id = null;

        // ✅ Find Blog by ID
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // ✅ Delete Old Image if a New Image is Uploaded
        if (req.file && blog.public_id) {
            await cloudinary.uploader.destroy(blog.public_id);
        }

        // ✅ Upload New Image
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "blog-images" });
            imageUrl = result.secure_url;
            public_id = result.public_id;
        }

        // ✅ Update Only Provided Fields
        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (imageUrl) {
            updateData.image = imageUrl;
            updateData.public_id = public_id;
        }

        const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.json({ success: true, message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { addBlog, viewUserBlogs, deleteBlog, userBlogs, getBlog, updateBlog };
