const constants = require('../constants/constants');
const authContainer = require('../authContainer');
let developerLogic = require('../logics/developerLogic.js');

let HttpStatus = constants.HttpStatus;

var app;
module.exports = function (application) {
    app = application;
    app.post('/addDeveloper', (req, res) => {
        authContainer.verify(req, res, function () {
            console.log(JSON.stringify(req.body));
            let newDev = req.body;
            developerLogic.addDeveloper(newDev, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.get('/getDeveloperById', (req, res) => {
        authContainer.verify(req, res, function () {
            let developerId = req.query.id;
            developerLogic.getDeveloperById(developerId, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.get('/getAllDevelopers', (req, res) => {
        authContainer.verify(req, res, function () {
            developerLogic.getAllDevelopers(function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.delete('/removeDeveloper', (req, res) => {
        authContainer.verify(req, res, function () {
            let id = req.body.id;
            developerLogic.removeDeveloper(id, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.post('/assignDeveloper', (req, res) => {
        authContainer.verify(req, res, function () {
            console.log(JSON.stringify(req.body));
            let assignment = req.body;
            developerLogic.assignDeveloper(assignment, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.delete('/removeAssignment', (req, res) => {
        authContainer.verify(req, res, function () {
            let developerId = req.body.developerId;
            let projectId = req.body.projectId;
            developerLogic.removeAssignment(developerId, projectId, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
}