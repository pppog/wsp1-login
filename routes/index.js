const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../utils/database');
const { response } = require('express');
const promisePool = pool.promise();



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.njk', {
        title: 'Home ALC',
    });
});

router.get('/login', function (req, res, next) {
    res.render('login.njk', {
        title: 'Login ALC',
    });
});

router.get('/delete', async function (req, res, next) {
    if (req.session.loggedin === true) {
        req.session.loggedin = false;
        await promisePool.query('DELETE FROM fmusers WHERE id = ?', [req.session.userid],);
        return res.redirect('/login');
    }
});

router.post('/login', async function (req, res, next) {
    if (req.session.loggedin === true) {
        return res.redirect('/profile');
    }
    const { username, password } = req.body;
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
    if (errors.length > 0) {
        return res.json([errors]);
    }

    const [users] = await promisePool.query('SELECT * FROM fmusers WHERE name = ?', [username],);
    if(users.length > 0) {
    bcrypt.compare(password, users[0].password, function (err, result) {
        if (result === true) {
            req.session.loggedin = true;
            req.session.userid = users[0].id;
            return res.redirect('/profile');
        } else {
            return res.json('Invalid username or password');
        }
    });
} else {
    return res.redirect("/login");
}
});

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard.njk', {
        title: 'Dashboard',
    });
});

router.get('/profile', async function (req, res, next) {

    if (req.session.loggedin === undefined) {
        
        return res.status(401).send('Access Denied');
    } else {
    const [username] = await promisePool.query('SELECT * FROM fmusers WHERE id = ?', [req.session.userid],);
    res.render('profile.njk', {
        title: 'Profile',
        username: username[0].name,
    });}
});

router.get('/crypt/:password', function (req, res, next) {
    bcrypt.hash(req.params.password, 10, function (err, hash) {
        // Store hash in your password DB.
        return res.json({ hash });
    });
});

router.post('/register', async function (req, res, next){
    const { username, password, passwordConfirmation } = req.body;
    const errors = [];
    
    if (username === '') {
        errors.push('Username is Required');
    } else {
    }

    if (password === '') {
        errors.push('Password is Required');
    }
    if (password !== passwordConfirmation) {
        errors.push('Passwords do not match');
    }
    const [userCheck] = await promisePool.query('SELECT name FROM fmusers WHERE name = ?',[username],);
    if (userCheck.length > 0){
        errors.push('Username is already taken');
    }
    if (errors.length > 0) {
        return res.json([errors]);
    } else {
        bcrypt.hash(password, 10, async function (err, hash) {
            const [newUser] = await promisePool.query('INSERT INTO fmusers (name, password) VALUES (?, ?)', [username, hash])
            return res.redirect('/login');
        });
        

    }
});

router.get('/register', async function (req, res, next){
    res.render('register.njk', {
        title: 'Register ALC',
    });
});

router.get('/logout', function (req, res, next){
    req.session.loggedin = false
    
        return res.redirect('/login')
    
});

router.post('/logout', async function (req, res, next){
    if (req.session.loggedin === undefined) {
        
        return res.status(401).send('Access Denied');
    }
    else {
        req.session.loggedin=undefined;
        return res.redirect('/')
    }
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
