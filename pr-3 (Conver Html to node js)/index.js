const express = require('express');
const app = express();
const port = 9000;

app.set('view engine', 'ejs');

const path = require('path');

app.use(express.static(path.join(__dirname, "public")));

app.get('/' , (req,res) => {
    return res.render('signin');
})

app.get('/dashboard' , (req,res) => {
    return res.render('dashboard');
})

app.get('/tables' , (req,res) => {
    return res.render('tables');
})

app.get('/billing' , (req,res) => {
    return res.render('billing');
})

app.get('/profile' , (req,res) => {
    return res.render('profile');
})

app.get('/virtual-reality' , (req,res) => {
    return res.render('virtual-reality');
})

app.get('/rtl' , (req,res) => {
    return res.render('rtl');
})

app.get('/sign-up' , (req,res) => {
    return res.render('sign-up');
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;        
    }
    console.log(`Server is running on port ${port}`)
})