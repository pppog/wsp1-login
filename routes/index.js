const express = require('express');
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
    const { username, password } = req.body;
    console.log(req.body);
    const errors = [];

    if (username === '') {
        //console.log('Username is Required');
        errors.push('Username is Required');
    } else {
    }

    if (password === '') {
        //console.log('Password is Required');
        errors.push('Password is Required');
    }
    console.log([errors]);
    if (errors.length > 0) {
        return res.json([errors]);
    }

    const [users] = await promisePool.query('SELECT * FROM fmusers WHERE name = ?', [username],);
    console.log(users[0]);

    bcrypt.compare(password, users[0].password, function (err, result) {
        if (result === true) {
            req.session.loggedin = users[0].id;
            return res.redirect('/profile/'+username);
        } else {
            return res.json('Invalid username or password');
        }
    });
});

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard.njk', {
        title: 'Dashboard',
    });
});

router.get('/profile/:username', function (req, res, next) {
    if (req.session.loggedin === undefined) {
        return res.redirect('/login');
    } else {
    res.render('profile.njk', {
        title: 'profile',
        username: req.params.username,
    });}
});

router.get('/crypt/:password', function (req, res, next) {
    bcrypt.hash(req.params.password, 10, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        return res.json({ hash });
    });
});

router.post('/logout', async function (req, res, next){

});
router.get('/kaka', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: NEVER(Probably(maybe))</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })



module.exports = router;
