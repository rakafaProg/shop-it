const express = require('express');
const db = require('./db');

const router = express.Router();

const userId = '123456782';

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

router.get('/api/products/category/:category', (req, res) => {
    const cat = req.params.category;
    db.getQuery(
        'SELECT * FROM `products` INNER JOIN `categoriestoproducts` ON `code`=`product` WHERE `category`=' + cat,
        (product, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(product);
            }
        }
    )
});

router.get('/api/products/search/:text', (req, res) => {
    const text = req.params.text;
    db.getQuery(
        `SELECT DISTINCT
        p.code, p.name, p.details, p.imageUrl, p.price
        FROM 
        products p INNER JOIN categoriestoproducts cp ` +
        ' ON `code`=`product` INNER JOIN categories c ON c.id = cp.category ' +
        `WHERE 
            p.name LIKE '%${text}%' OR
            p.details LIKE '%${text}%' OR
            c.name LIKE '%${text}%'
        `,
        (product, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(product);
            }
        }
    )
});

// ===============================
//  Cart API
// ===============================

function getCart(res) {
    const getCartQuery = "SELECT `imageUrl`, p.`name`, `amount`, `price`, `code`, `details` ,  " +
        "`amount` * `price` AS `total` " +
        "FROM `carts` c " +
        "INNER JOIN `products` p ON " +
        "p.`code` = c.`product_id` " +
        "WHERE c.`user_id` = '" + userId + "'";
    db.getQuery(
        getCartQuery,
        (cart, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(cart);
            }
        }
    );
}




function updateCart(res, { code, amount }) {
    const updateQuery = `UPDATE carts SET amount=${amount} WHERE product_id='${code}' AND user_id = '${userId}'`;

    db.getQuery(
        updateQuery,
        (data, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                getCart(res);
            }
        }
    );
}

router.get('/api/cart', (req, res) => {
    getCart(res);
});

router.delete('/api/cartItem/:code', (req, res) => {
    const deleteQuery = `DELETE FROM carts WHERE product_id='${req.params.code}' AND user_id='${userId}'`;
    db.getQuery(
        deleteQuery,
        (data, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                getCart(res);
            }
        }
    );
});

router.delete('/api/cart', (req, res) => {
    const deleteQuery = `DELETE FROM carts WHERE user_id='${userId}'`;
    db.getQuery(
        deleteQuery,
        (data, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                getCart(res);
            }
        }
    );
});


router.post('/api/cartItem', (req, res) => {
    const { code, amount } = req.body;
    const updateQuery = `INSERT INTO carts(user_id, product_id, amount) VALUES ('${userId}','${code}',${amount})`;

    db.insertQuery(
        'carts',
        { user_id: userId, product_id: code },
        { amount },
        (data, err) => {
            if (!err && data.success) {
                getCart(res);
            } else {
                updateCart(res, { code, amount: 'amount + ' + amount });
            }
        });

});




router.put('/api/cartItem', (req, res) => {
    updateCart(res, req.body);
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