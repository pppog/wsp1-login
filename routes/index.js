const express = require('express');
const { get } = require('../app');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../utils/database');
const promisePool = pool.promise();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.njk', {
        title: 'Login ALC',
    });
});

router.get('/login', function (req, res, next) {
    res.render('login.njk', {
        title: 'Login ALC',
    });
});

router.post('/login', async function (req, res, next) {
    const [users] = await promisePool.query('SELECT * FROM fmusers;');
    const { username, password } = req.body;
    const errors = [];
    console.log(req.body);

    if (username === '') {
        //console.log('Username is Required');
        errors.push('Username is Required');
    }

    if (password === '') {
        //console.log('Password is Required');
        errors.push('Password is Required');
    }
    console.log(errors);

    bcrypt.compare(password, users[0].password, function (err, result) {
        if (result === true) {
            if (users[0].name === username){
                res.location('/profile');
                res.json('Login Success');
                console.log('Login Success');
            }
            else {
                res.json('Invalid Username');
            }
            console.log('yo');
            // logga inte in om username = undefined
        } else {
            errors.push('Invalid username or password');
        }
        if (errors.length > 0) {
            res.json([errors]);
        }
    });
    
});

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard.njk', {
        title: 'Dashboard',
    });
});

router.get('/profile', function (req, res, next) {
    res.render('profile.njk', {
        title: 'profile',
    });
});

router.get('/crypt/:password', function (req, res, next) {
    bcrypt.hash(req.params, 10, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        return res.json(hash);
    });
    res.send(req.params);
    res.render(hash);
});

module.exports = router;
