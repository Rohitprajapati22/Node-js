const User = require('../models/UserModel')
const Blog = require('../models/BolgModel');
const Cart = require('../models/AddcatrModel')
const fs = require('fs');

const nodemailer = require('nodemailer')

// Login Page
const loginPage = (req, res) => {

    return res.render('login');
};

// Register Page
const registerPage = (req, res) => {
    return res.render('register');
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await User.create({
            name: name,
            email: email,
            password: password
        });
        console.log('User registered');
        return res.redirect('/');
    } catch (err) {
        console.log(err)
        return false
    }
};

// Dashboard Page
const dashboardPage = async (req, res) => {
    try {

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
            price: req.body.price,
            qty: req.body.qty,
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

        // Ensure req.user exists
        if (!req.user) {
            console.log("User not logged in");
            return res.render('readmore', { readBlog, cart: [] });
        }

        const userId = req.user._id; // Get the logged-in user's ID
        const cart = await Cart.find({ userId }).populate("productId");

        console.log("Cart Data:", cart); // Debugging step

        return res.render('readmore', { readBlog, cart });

    } catch (err) {
        console.error("Error in readMore controller:", err);
        return res.status(500).send("Server Error");
    }
};


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

        return res.redirect('/dashboard')

    }
    catch (err) {
        console.log(err);
        return false
    }
}




// Logout User
const logout = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
};









const addToCart = async (req, res) => {
    try {
        let atc = req.query.atcid;
        let userId = req.user ? req.user._id : null;


        let cartItem = await addToCartModel.findOne({ userId, productId: atc });

        if (!cartItem) {
            cartItem = new addToCartModel({
                userId,
                productId: atc,
                quantity: 1
            });
            await cartItem.save()
        }

        const cartItems = await addToCartModel.find({ userId }).populate('productId')

        return res.render('addtocart', { cart: cartItems });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
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
    logout, readMore,
    addToCart

};
