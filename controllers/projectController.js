const constants = require('../constants/constants');
const authContainer = require('../authContainer');
let projectLogic = require('../logics/projectLogic.js');
let HttpStatus = constants.HttpStatus;

var app;
module.exports = function (application, upload) {
    app = application;
    app.post('/addProject', upload.single('image'), (req, res) => {
        authContainer.verify(req, res, function () {
            let image;
            const file = req.file
            if(!file){
                image = undefined;
            }else{
                image ="myhost/"+file.originalname;
            }
            let name = req.body.projectName;
            let client = req.body.clientName;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            projectLogic.addProject(name, client, startDate, endDate, image, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.get('/getProjectById', (req, res) => {
        authContainer.verify(req, res, function () {
            let projID = req.query.id;
            projectLogic.getProjectById(projID, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.get('/getAllProjects', (req, res) => {
        authContainer.verify(req, res, function () {
            projectLogic.getAllProjects( function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.get('/getProjectScreen', (req, res) => {
        authContainer.verify(req, res, function () {
            projectLogic.getProjectScreen(req.query.id,  function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.delete('/removeProject', (req, res) => {
        authContainer.verify(req, res, function () {
            let id = req.body.id;
            projectLogic.removeProject(id, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
}