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
            callback(null, err);
        } else {
            callback(rows);
        }
    });
}

exports.insertQuery = (table, textFields, numberFields, callback) => {

    let query =
        `INSERT INTO ${table}
            (${textFields && Object.keys(textFields).join(',')} 
            ${(numberFields && textFields) && ','} 
            ${numberFields && Object.keys(numberFields).join(',')})
        VALUES(${textFields && "'" + Object.values(textFields).join("','") + "'"} 
            ${(numberFields && textFields) && ','}
            ${numberFields && Object.values(numberFields).join(",")} )
        `;

    console.log('using insert query');

    con.query(query, (err, data) => {
        if (err || !data.affectedRows) {
            callback(null, err);
        } else {
            callback({ success: true, insertedId: data.insertedId });
        }
    });
}