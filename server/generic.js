const express = require('express');
const db = require('./db');

const router = express.Router();

const { userToken } = require('./login');

let userId;

module.exports = router;

router.use((req, res, next) => {
    userId = userToken.id;
    next();
});


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

router.get('/api/products/all', (req, res) => {
    db.getQuery(
        `SELECT code, name, details, imageUrl, price
        FROM products`,
        (products, err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(products);
            }
        }
    )
});

router.put('/api/updateProduct/:code', (req, res) => {
    const { product, categories } = req.body;
    const { imageUrl, code, details, name, price } = product;
    updateQuery = `
        UPDATE products SET 
        code="${code}", name="${name}", details="${details}", price="${price}", imageUrl="${imageUrl}"
        WHERE code="${req.params.code}";

        
    `;

    db.getQuery(
        updateQuery,
        (result, err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false, msg: 'Product Updating Failed.' });
            } else {
                db.getQuery(`DELETE FROM categoriestoproducts WHERE product="${req.params.code}";`, d => { });
                for (let cat in categories) {
                    if (categories[cat] == true) {
                        db.insertQuery('categoriesToProducts', { product: code }, { category: cat }, dt => console.log(dt));
                    }
                }
                res.send({ success: true, msg: 'Updated Successfully' });
            }
        }
    )
});

router.get('/api/product/:code', (req, res) => {
    db.getQuery(
        `SELECT code, name, details, imageUrl, price
        FROM products WHERE code=${req.params.code}`,
        (product, err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                db.getQuery(`SELECT * FROM categoriestoproducts WHERE product="${req.params.code}"`, (categories, err2) => {
                    if (err2) {
                        res.status(500).send(err2);
                    } else {
                        res.send({ product: product[0], categories });
                    }
                });
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
    emptyCart(
        () => getCart(res),
        err => res.status(500).send(err)
    );
});

function emptyCart(successCallback, errorCallback) {
    const deleteQuery = `DELETE FROM carts WHERE user_id='${userId}'`;
    db.getQuery(
        deleteQuery,
        (data, err) => {
            if (err && typeof errorCallback == "function") {
                errorCallback(err);
            } else if (!err && typeof successCallback == "function") {
                successCallback(data);
            }
        }
    );
}


router.post('/api/cartItem', (req, res) => {
    const { code, amount } = req.body;

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
                res.send({ success: true });
            } else {
                console.log(err);
                res.status(500).send({ success: false, msg: 'Product Creating Failed.' });
            }
        });
});


// ===============================
//  Place Order
// ===============================

router.get('/api/takenDates', (req, res) => {
    const takenDatesSQL = `
        SELECT 
        DATE_FORMAT(delivery_date, '%Y-%m-%d') delivery_date 
        FROM orders 
        WHERE delivery_date >= CURDATE() 
        GROUP BY delivery_date 
        HAVING COUNT(delivery_date) > 2`;

    db.getQuery(
        takenDatesSQL,
        (data, err) => {
            if (err) {
                res.status(500).send("Error");
            } else {
                res.send(data);
            }
        }
    );
})

router.post('/api/placeOrder', (req, res) => {

    createOrder({ ...req.body, user_id: userId },
        orderId => {
            if (orderId > 0) {
                moveCartToOrder(
                    orderId,
                    () => getLastOrder(res), // success callback
                    err => res.status(500).send(err) // error callback
                );
            } else {
                res.status(500).send("Could not create new order");
            }
        }
    );
});

function createOrder({ user_id, street, credit_card, order_date, delivery_date, city }, callback) {
    db.insertQuery(
        'orders',
        { user_id, street, credit_card, order_date, delivery_date },
        { city },
        (data, err) => {
            if (!err && data.success) {
                callback(data.insertedId);
                return;
            }
            callback(-1);
        });
}

function moveCartToOrder(orderId, successCallback, errorCallback) {
    const insertQuery = `
        INSERT INTO orders_products (order_id, product_id, amount)
        SELECT ${orderId}, product_id, amount
        FROM carts
        WHERE user_id=${userId}`;

    db.getQuery(
        insertQuery,
        (data, err) => {
            if (err && typeof errorCallback == "function") {
                errorCallback(err);
            } else if (!err) {
                emptyCart(successCallback, errorCallback);
            }
        }
    );
}

router.get("/api/lastOrder", (req, res) => {
    getLastOrder(res);
});


function getLastOrder(res) {
    const selectOne = `
    SELECT id,user_id,city,street,credit_card,
    DATE_FORMAT(order_date, '%Y-%m-%d') order_date,
    DATE_FORMAT(delivery_date, '%Y-%m-%d') delivery_date,
    cities.name cityName FROM orders 
    LEFT JOIN cities
    ON orders.city = cities.value
    WHERE user_id=${userId}
    ORDER BY orders.id DESC LIMIT 1`

    db.getQuery(
        selectOne,
        (order, err) => {
            if (err || !order.length) {
                res.send({ order: {}, data: [] });
            } else {
                order = order[0];
                const getCartQuery = "SELECT product_id, amount, p.`name`, `price`, `code` , `amount` * `price` AS `total`" +
                    " FROM orders_products op " +
                    "INNER JOIN `products` p ON p.`code` = op.`product_id` " +
                    "WHERE op.order_id = " + order.id;

                db.getQuery(
                    getCartQuery,
                    (data, err) => {
                        if (err || !data.length) {
                            res.status(500).send({ order: {}, data: [] });
                        } else {
                            res.send({ order, data });
                        }
                    }
                );
            }
        }
    );




}


