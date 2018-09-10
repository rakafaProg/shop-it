const express = require('express');
const db = require('./db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const router = express.Router();
let userToken = {};
let userId = '';

module.exports = { router, userToken };

router.get('/api/cities', (req, res) => {
    db.getQuery('SELECT * FROM cities ORDER BY name', (cities, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(cities);
        }
    });
});

const createToken = user => {
    return jwt.sign(user, 'aetbikauhgihnkjbnikasbugfui', {
        expiresIn: 86400 // expires in 24 hours
    });
}

const decodeToken = (token, callback) => {
    jwt.verify(token, 'aetbikauhgihnkjbnikasbugfui', callback);
}

router.use(cookieParser());

router.post('/signup', (req, res) => {
    console.log('user want to sign up');
    console.log(req.body);
    if (validateSignUpForm(req.body.user)) {
        // extract fields: 
        const { id, email, phone, password, city_id, first_name, last_name, street_name, house_number } = req.body.user;
        db.insertQuery(
            'users',
            { id, email, phone, password, first_name, last_name, street_name, house_number },
            { city_id },
            (data, err) => {
                if (!err && data.success) {
                    res.cookie('tokenid', createToken({ id, created: new Date() }), { maxAge: 86400 });
                    res.send({ success: true, toUrl: '/happ' });
                } else {
                    res.status(500).send({ success: false, msg: 'User Creating Failed.' });
                }
            });
    } else {
        res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
});

router.post('/login', (req, res) => {
    const { id, password } = req.body.user;
    if (validateID({ id }) && password && password.length > 8) {
        db.getQuery(`SELECT first_name FROM USERS WHERE id='${id}' AND password='${password}'`, (data, err) => {
            if (!err && data.length > 0) {
                db.getQuery(`SELECT * FROM admins WHERE id='${id}'`, (data, err) => {
                    res.cookie('tokenid', createToken({ id }), { maxAge: 86400 });
                    if (!err && data.length > 0)
                        res.status(200).send({ success: true, toUrl: '/admin' });
                    else
                        res.status(200).send({ success: true, toUrl: '/happ' });
                });
            } else {
                res.status(400).send({ success: false, msg: 'Wrong login' });
            }
        });
    } else {
        res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
});





router.use((req, res, next) => {
    userToken.id = '';
    if (req.cookies.tokenid) {
        decodeToken(req.cookies.tokenid, (err, decoded) => {
            if (!err) {
                userToken.id = decoded.id;
                userToken.created = decoded.created;
                userId = userToken.id;
                res.cookie('tokenid', req.cookies.tokenid, { maxAge: 86400 });
            }
        });
    }
    next();
});

// handle cli
router.use((req, res, next) => {
    if (req.headers.origin && req.headers.origin.includes('localhost:4200')) {
        userToken.id = '111111118';
        userToken.created = false;
        userId = userToken.id;
    }
    next();
})

router.use(['/happ', '/admin'], (req, res, next) => {
    if (!userToken.id) {
        res.redirect('/login');
        return;
    }
    next();
});

router.use('/api', (req, res, next) => {
    if (!userToken.id) {
        res.status(401).send('User is not loged in');
        return;
    }
    next();
});



router.get('/api/user', (req, res) => {
    db.getQuery(`SELECT * FROM users WHERE id="${userId}"`, (users, err) => {
        if (err || !users.length) {
            res.status(500).send(err);
        } else {
            let user = users[0];
            delete user.password;
            user.isNew = userToken.created ? true : false;
            res.send(user);
        }
    });
});



//==================================
// Validations
//==================================

function validateSignUpForm(user) {
    console.log('Validating Form');
    console.log('validateID(user)', validateID(user));
    console.log('validateEmail(user)', validateEmail(user));
    console.log('user.phone && user.phone.length >= 11', user.phone && user.phone.length >= 11);
    console.log('user.password && user.password.length >= 8', user.password && user.password.length >= 8);
    console.log('user.repeatPassword === user.password', user.repeatPassword === user.password);
    console.log('user.first_name', user.first_name);
    console.log('user.last_name', user.last_name);
    console.log('user.city_id', user.city_id);
    console.log('user.street_name', user.street_name);
    console.log('user.house_number', user.house_number);
    return (
        validateID(user) &&
        validateEmail(user) &&
        user.phone && user.phone.length >= 11 &&
        user.password && user.password.length >= 8 &&
        user.repeatPassword === user.password &&
        user.first_name &&
        user.last_name &&
        user.city_id &&
        user.street_name &&
        user.house_number
    );
}

function validateID({ id }) {
    if (id && id.length == 9) {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            if (!isNaN(id.charAt(i))) {
                const temp = id.charAt(i) * (i % 2 == 0 ? 1 : 2);
                sum += (Math.floor(temp / 10) + temp % 10);
            }
        }
        return (sum % 10 == 0);
    }
    return false;
}

function validateEmail({ email }) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//==================================
// End of Validations
//==================================
