const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

module.exports = router;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image');

router.post('/fileupload', (req, res) => {
    upload(req, res, (err, newFile) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error uploading file.");
        }
        console.log('The filename is ' + res.req.file.filename);
        res.end(JSON.stringify(res.req.file.filename));
    });
});

router.use('/images', express.static(path.join(__dirname, '../', 'uploads')))
