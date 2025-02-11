const express = require('express');
const port = 9999;
const app = express();
const path = require('path');

const database = require('./config/db');
database();


const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//authentication start passportjs

const passport = require('passport');
const passportLocal = require('./config/passportLocal')
const session = require('express-session');
app.use(session({
    secret: 'blog',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

//authentication ensd passportjs





app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});
