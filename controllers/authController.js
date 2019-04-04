const authContainer = require('../authContainer');
let authLogic = require('../logics/authLogic.js');

var app;
module.exports = function (application) {
    app = application;
    app.get('/getToken', (req, res) => {
        let username = req.query.username;
        let password = req.query.password;
        authContainer.sign(username, password, function(err){
            res.status(401).send({ error: err});
        },function(token, relatedProject){
            res.status(200).send({ token, relatedProject});
        });
    })

    app.post('/addUser', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let relatedProject = req.body.relatedProject;
        authLogic.addUser(username, password, relatedProject, function(thenData){
            res.status(200).send({ user: thenData});
        },function(err){
            res.status(400).send({ error: err});
        })
    })
    app.get('/getAllUsers', (req, res) => {
        authContainer.verify(req, res, function () {
            authLogic.getAllUsers(function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.delete('/removeUser', (req, res) => {
        authContainer.verify(req, res, function () {
            let id = req.query.id;
            authLogic.removeUser(id, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
}