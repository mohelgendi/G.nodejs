const authContainer = require('../authContainer');
let authLogic = require('../logics/authLogic.js');

module.exports = function (app) {
    app.post('/addUser', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let relatedProject = req.body.relatedProject;

        authLogic.addUser(username, password, relatedProject, function(thenData){
            res.status(200).send({ user: thenData});
        },function(err){
            res.status(400).send({ error: err});
        })
    });

    app.get('/getAllUsers', (req, res) => {
        authContainer.verify(req, res, function () {
            authLogic.getAllUsers(function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    });

    app.delete('/removeUser', (req, res) => {
        authContainer.verify(req, res, function () {
            let id = req.body.id;
            authLogic.removeUser(id, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    });
}