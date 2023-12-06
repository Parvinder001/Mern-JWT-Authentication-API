const express = require('express');
const multer = require('multer');
const { model } = require('mongoose');
const router = express();


router.use(express.json());
const path = require('path');


const userController = require('../controllers/userController')
const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (request, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage })

router.post('/register', upload.single('image'), userController.userRegister)

module.exports = router;