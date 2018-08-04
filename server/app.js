const express = require('express');
const path = require('path');
const cors = require('cors');

const login = require('./login');

const app = express();
const PORT = 8080;
const root = path.join(__dirname, '../', 'dist/shop-it');

app.use(cors());
app.use(express.static(root));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(login);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
});

app.listen(PORT, () => {
    console.log(`Port ${PORT} is ready`);
});