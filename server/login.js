const express = require('express');
const db = require('./db');

const router = express.Router();

module.exports = router;

router.get('/api/cities', (req, res) => {
    db.getQuery('SELECT * FROM cities ORDER BY name', (cities, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(cities);
        }
    });
});

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
                if (data.success) {
                    res.send({ success: true, toUrl: '/happ' });
                }
            })
    } else {
        res.send({ success: false });
    }
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
