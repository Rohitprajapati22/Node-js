const express = require('express');
const port = 9999;
const app = express();
const database = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');

database();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});
