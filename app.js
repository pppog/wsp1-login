const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const bcrypt = require('bcrypt');


const indexRouter = require('./routes/index');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

bcrypt.hash("password", 10, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    return res.json(hash);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
