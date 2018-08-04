const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shop_it_happ'
});

con.connect(err => {
    if (err) {
        console.log('Cannot connect to the database');
        console.log(err);
    } else {
        console.log('Connected to databse successfully');
    }
})

exports.getQuery = (query, callback) => {
    con.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            callback(null, 'Err: could not get your data');
        } else {
            callback(rows);
        }
    })
}