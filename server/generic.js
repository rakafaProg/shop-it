const express = require('express');
const db = require('./db');

const router = express.Router();

module.exports = router;

router.get('/api/categories', (req, res) => {
    db.getQuery('SELECT * FROM categories ORDER BY orderPriority', (categories, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(categories);
        }
    });
});

router.post('/api/newProduct', (req, res) => {
    console.log('Got new data for products');
    console.log(req.body);

    const { product, categories } = req.body;
    const { imageUrl, code, details, name, price } = product;

    db.insertQuery(
        'products',
        { imageUrl, code, details, name },
        { price },
        (data, err) => {
            if (!err && data.success) {
                for (let cat in categories) {
                    if (categories[cat] == true) {
                        db.insertQuery('categoriesToProducts', { product: code }, { category: cat }, dt => console.log(dt));
                    }
                }
                res.send({ success: true, toUrl: '/happ' });
            } else {
                console.log(err);
                res.status(500).send({ success: false, msg: 'Product Creating Failed.' });
            }
        });
});