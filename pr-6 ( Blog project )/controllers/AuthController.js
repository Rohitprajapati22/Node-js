const User = require('../models/UserModel');
const Blog = require('../models/BolgModel');
const fs = require('fs');

// Login Page
const loginPage = (req, res) => {
    if (req.cookies.auth) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
};

// Register Page
const registerPage = (req, res) => {
    return res.render('register');
};

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        console.log('User registered');
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error during registration');
    }
};

// Dashboard Page
const dashboardPage = async (req, res) => {
    try {
        if (!req.cookies.auth) {
            return res.redirect('/');
        }
        const blogs = await Blog.find({});
        return res.render('dashboard', { blogs });

    } catch (err) {
        console.log(err);
        return false

    }
};

// Add Blog Page
const addBlog = (req, res) => {
    return res.render('addblog');
};

// Insert Blog Data
const insertData = async (req, res) => {
    try {
        await Blog.create({
            title: req.body.title,
            description: req.body.description,
            image: req.file.path,
        });
        console.log('Blog inserted');
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return false
    }
};

// View Blogs
const viewBlog = async (req, res) => {
    try {
        let record = await Blog.find({});
        return res.render('viewblog', {
            record
        });
    } catch (err) {
        console.error(err);
        return false
    }
};

const readMore = async (req, res) => {
    try {

        const readid = req.query.readId;
        const readBlog = await Blog.findById(readid);
        return res.render('readmore', { readBlog });

    } catch (err) {
        console.error(err);
        return false
    }
}


const deleteUser = async (req, res) => {
    try {

        const id = req.query.id;
        if (!id) {
            console.error("No ID provided");
            return false
        }
        const old = await Blog.findById(id);
        if (!old) {
            console.error("Record not found");
            return false
        }
        if (old.image && fs.existsSync(old.image)) {
            fs.unlinkSync(old.image);
        }
        await Blog.findByIdAndDelete(id);
        console.log("Record deleted successfully");
        return res.redirect('/viewblog');
    } catch (err) {
        console.log(err)
        return false
    }
};




//editeblog
const editBlog = async (req, res) => {
    try {
        const editId = req.query.editId;
        if (!editId) {
            console.log("No editId provided");
            return false
        }
        const single = await Blog.findById(editId);
        if (!single) {
            console.log("Blog not found");
            return false
        }
        return res.render('editblog', { single });
    } catch (err) {
        console.log(err);
        return false
    }
};



// updateblog
const updateBlog = async (req, res) => {
    try {
        const { editid, title, description } = req.body;

        if (!editid || !title || !description) {
            console.log("Missing required fields");
            return false
        }

        const single = await Blog.findById(editid);
        if (!single) {
            console.log("Blog not found");
            return false
        }

        if (req.file) {

            if (single.image && fs.existsSync(single.image)) {
                fs.unlinkSync(single.image);
            }

            await Blog.findByIdAndUpdate(editid, {
                title,
                description,
                image: req.file.path,
            });
        } else {
            await Blog.findByIdAndUpdate(editid, { title, description });
        }

        console.log("Blog updated successfully");
        return res.redirect('/viewblog');
    } catch (err) {
        console.log(err);
        return false
    }
};



// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            console.log('Invalid credentials');
            return res.redirect('/');
        }
        res.cookie('auth', user._id);
        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error during login');
    }
};




// Logout User
const logout = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
};

module.exports = {
    loginPage,
    registerPage,
    registerUser,
    dashboardPage,
    addBlog,
    insertData,
    viewBlog,
    deleteUser,
    editBlog,
    updateBlog,
    loginUser,
    logout, readMore

};
