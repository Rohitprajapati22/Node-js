const User = require('../models/UserModel')
const Blog = require('../models/BolgModel');
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
            name:name,
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
            price:req.body.price,
            qty:req.body.qty,
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



//forgot password
const otpPage = async (req, res) => {
    return res.render('otp')
}

const newPasswordpage = async (req, res) => {
    try {
        return res.render('newpassword')
    } catch (err) {
        console.log(err);
        return false
    }
}

const forgotPassword = async (req, res) => {
    try {
        let useremail = req.body.email;
        console.log(useremail);

        let user = await User.findOne({ email: useremail });
        if (!user) {
            console.log('User not found');
            return res.redirect('/')
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rohitt3891@gmail.com',
                pass: 'shkz omkg ycoz vgwc'
            }
        });

        var mailOptions = {
            from: 'rohitt3891@gmail.com',
            to: useremail,
            subject: 'forgot password',
            html: `<h2 style='color:green'>Hello ${user?.name} Your OTP is ${otp}</h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                let auth = {
                    email: useremail,
                    otp: otp
                }
                res.cookie('user', auth);
                return res.redirect('/otp')
            }
        });
    } catch (error) {
        console.log(error);
        return false;

    }
}


const verifyOtp = async (req, res) => {
    try {

        let otp = req.body.otp;
        let user = req.cookies.user;

        if (otp == user.otp) {
            return res.redirect('/newpassword');
        }
        else {
            console.log("Otp is not match");
            return res.redirect('/otp');
        }

    } catch (err) {
        console.log(err);
        return false;
    }
}


const usernewPassword = async (req, res) => {
    try {
        let newpass = req.body.newpass;
        let cofpass = req.body.cpassword;
        if (newpass == cofpass) {
            let email = req.cookie?.user?.email;
            let user = await User.findOneAndUpdate({ email: email }, {
                password: newpass
            })
            res.clearCookie('user')
            return res.redirect('/');
        } else {
            console.log("Password not match");
            return res.redirect('/newpassword');
        }

    } catch (err) {
        console.log(err);
        return false;
    }
}


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
    otpPage, newPasswordpage, forgotPassword, verifyOtp, usernewPassword

};
