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
    res.send({success: false, toUrl: '/happ'});
});


