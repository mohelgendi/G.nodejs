const constants = require('../constants/constants');
const authContainer = require('../authContainer');
let projectLogic = require('../logics/projectLogic.js');
let HttpStatus = constants.HttpStatus;

var app;
module.exports = function (application) {
    app = application;
    app.post('/addProject', (req, res) => {
        authContainer.verify(req, res, function () {
            let newproj = req.body;
            projectLogic.addProject(newproj, function (thenData) {
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
            let id = req.query.id;
            projectLogic.removeProject(id, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
}