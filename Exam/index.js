const express = require('express');

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path');



const databese = require('./config/db')
databese()

const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
app.use(session({
    secret: 'admin',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use(express.urlencoded());


app.use('/',require('./routes/indexRoute'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);

})