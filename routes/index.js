const express = require('express');
const router = express.Router();

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


router.post('/login', function (req, res, next) {
    const {username, password} = req.body;

    if (username.length === 0) {
        res.json('Username is Required')
    }

    if (password.length === 0) {
        res.json('Password is Required')
    }

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


module.exports = router;
