#!/usr/bin/env node

require('dotenv').config();
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(express.static(__dirname + '/public'));

var storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

app.use(cors());

app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 500000
}));

app.use('/api', require('./middlewares/auth.js'));

app.use('/api', require('./controllers/projectController.js')(router, upload));

app.use('/', require('./controllers/authController')(router));

app.listen(3000, () => console.log(`Example app listening on port 3000!`));