let evaluationLogic = require('../logics/evaluationLogic.js');
const authContainer = require('../authContainer');


var app;
module.exports = function (application) {
    app = application;
    app.post('/evaluateDeveloperOnProject', (req, res) => {
        authContainer.verify(req, res, function () {
            let projectId = req.body.projectId;
            let developerId = req.body.developerId;
            let communication = req.body.communication;
            let techSkill = req.body.techSkill;
            let teamwork = req.body.teamwork;
            evaluationLogic.evaluateDeveloperOnProject( projectId, developerId, communication, techSkill, teamwork, function (thenData) {
                res.status(200).send({ "updated rows": thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.post('/evaluateDeveloperOverallscore', (req, res) => {
        authContainer.verify(req, res, function () {
            let overallScore = req.body.overallScore;
            let developerId = req.body.developerId;
            evaluationLogic.evaluateDeveloperOverallscore(developerId, overallScore, function (thenData) {
                res.status(200).send({ "updated rows": thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.post('/evaluateProjectUpdate', (req, res) => {
        authContainer.verify(req, res, function () {
            let evaluationScore = req.body.evaluationScore;
            let evaluationType = req.body.evaluationType;
            let projectId = req.body.projectId;
            evaluationLogic.evaluateProjectUpdate(evaluationScore, evaluationType, projectId, function (thenData) {
                res.status(200).send({ "updated rows": thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.post('/evaluateProject', (req, res) => {
        authContainer.verify(req, res, function () {
            let inHouseEvaluation = req.body.inHouseEvaluation;
            let clientEvaluation = req.body.clientEvaluation;
            let projectId = req.body.projectId;
            evaluationLogic.evaluateProject(inHouseEvaluation, clientEvaluation, projectId, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
}