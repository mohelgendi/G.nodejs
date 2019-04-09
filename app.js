#!/usr/bin/env node

require('dotenv').config();
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use('/uploads',express.static(__dirname + '/public/uploads'));
var storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:500000}));

global.InsertModel = require('./OrmModels/InsertModel.js');
global.DeleteModel = require('./OrmModels/DeleteModel.js');
global.UpdateModel = require('./OrmModels/UpdateModel.js');
global.ViewQueryModel = require('./OrmModels/ViewQueryModel.js');
global.InsertOrUpdateModel = require('./OrmModels/InsertOrUpdateModel.js');
global.QueryJSONModel = require('./OrmModels/QueryJSONModel.js');
global.QueryStringModel = require('./OrmModels/QueryStringModel.js');
global.ormContainer = require('./ormContainer')(
    'postgres',
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_HOST,
    process.env.DB_PORT
);

require('./controllers/developerController')(app, upload);
require('./controllers/projectController')(app, upload);
require('./controllers/evaluationController')(app);
require('./controllers/authController')(app);

app.listen(3000, () =>console.log(`Example app listening on port 3000!`));