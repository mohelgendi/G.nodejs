const models = require('../models');

module.exports = function (app) {
    app.put('/evaluateDeveloperOnProject', (req, res) => {
        let newData = {
            devCommunicationScore: req.body.communication,
            devTechSkillsScore: req.body.techSkill,
            devTeamworkScore: req.body.teamwork
        };
        Object.keys(newData).forEach(function (key) {
            if (newData[key] === undefined) {
                delete newData[key];
            }
        });
        models.WorksOn.update(newData,
            {
                where:
                {
                    projectId: req.body.projectId,
                    developerId: req.body.developerId
                },
                returning: true
            }).then(created => res.send({ data: created }));
    });

    app.put('/evaluateProject', (req, res) => {
        let newData = {
            inHouseEvaluation: req.body.inHouseEvaluation,
            clientEvaluation: req.body.clientEvaluation
        };
        Object.keys(newData).forEach(function (key) {
            if (newData[key] === undefined) {
                delete newData[key];
            }
        });
        models.ProjectEvaluation.update(newData, {
            where: { project_id: req.body.projectId },
            returning: true
        })
        .then(created => {
            res.send({ data: created })
        })
    })
};