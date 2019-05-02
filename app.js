#!/usr/bin/env node

require('dotenv').config();
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();

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

/**
 * First check all request starts with /api and check if the requested user has been authenticated.
 */
app.use('/api', require('./middlewares/auth.js'));

/**
 * These api endpoints are secured. You need to defined auth token to the request headers.
 */
app.use('/api', require('./controllers/projectController.js')(router, upload));


/**
 * We don't want to use auth. methods here for the public endpoints.
 */
app.use('/', require('./controllers/authController')(router));


/**
 * Start our application.
 */
app.listen(3000, () => console.log(`Example app listening on port 3000!`));