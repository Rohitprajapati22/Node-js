const User = require('../models/UserModel');

const loginPage = (req,res) =>{
    return res.render('login')
}


const dashboardPage = async (req, res) => {
    try {
        return res.render('dashboard')
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    loginPage,dashboardPage
}