const authContainer = require('../authContainer');
const models = require('../models');

module.exports = function (app) {

    app.put('/evaluateDeveloperOnProject', (req, res) => {
        authContainer.verify(req, res, () => {
            models.WorksOn.update({
                project_id: req.body.projectId,
                developer_id: req.body.developerId,
                dev_communication_score: req.body.communication,
                dev_tech_skills_score: req.body.techSkill,
                dev_teamwork_score: req.body.teamwork
            },
                {
                    where:
                    {
                        project_id: req.body.projectId,
                        developer_id: req.body.developerId,
                    }
                }).then(created => res.send({ data: created }));
        });
    });

    app.put('/evaluateProject', (req, res) => {
        authContainer.verify(req, res, () => {
            console.log('INN')
            models.ProjectEvaluation.update({
                project_id: req.body.projectId,
                in_house_evaluation: req.body.inHouseEvaluation,
                client_evaluation: req.body.clientEvaluation,
            },
                {
                    where:
                    {
                        project_id: req.body.projectId
                    }
                }).then(created => res.send({ data: created }));
        });
    })

}