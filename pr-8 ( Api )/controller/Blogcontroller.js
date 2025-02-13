const Blog = require('../models/BlogModel')

const addBlog = async (req, res) => {

    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).send({
                success: false,
                message: "Please fill in all fields"
            });
        }
        const blog = await Blog.create({
            userId: req.user?._id,
            title,
            content,
            image: req.file?.path
        })
        return res.status(200).send({
            success: true,
            message: "Blog create successfully",
            blog
        })

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}

const adminviewBlog = async (req, res) => {

    try {
        let blogs = await Blog.find({})
        return res.status(200).send({
            success: true,
            message: "Blog list successfully",
            blogs
        })

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}

const userwiseviewBlog = async (req, res) => {
    try {
        let userid = req.user?._id;
        let blog = await Blog.find({ userId: userid })
        return res.status(200).send({
            success: true,
            message: "Blog list successfully",
            blog
        })

    } catch (error) {
        return res.status(401).send({
            success: false,
            err: error
        })
    }
}

const admindeleteBlog = async (req, res) => {
    try {
       let id = req.query.id
        let singleblog = await Blog.findById(id)
        return res.json(singleblog)
    } catch (error) {
        return res.status(401).send({
            success: false,
            err: error
        })
    }
}

module.exports = {
    addBlog, adminviewBlog, userwiseviewBlog ,admindeleteBlog
}