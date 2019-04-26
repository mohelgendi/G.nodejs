const authContainer = require('../authContainer');
const models = require('../models');

module.exports = function (app, upload) {

    app.post('/developer', upload.single('image'), (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.create({
                name: req.body.name,
                position: req.body.position,
                image: 'undefined' !== typeof req.file ? req.file.path : undefined
            }).then(created => res.send({ data: created }));
        });
    });

    app.get('/developer', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.findOne({
                where: {
                    id: req.query.id
                },
                include: [{
                    model: models.Project,
                    as: 'projects',
                    through: {
                        attributes: [
                            'dev_tech_skills_score',
                            'dev_teamwork_score',
                            'dev_communication_score',
                        ]
                    }
                }]
            }).then(data => res.send({ data: data }));
        });
    })

    /*app.get('/getDeveloperOverallScore', (req, res) => {
        authContainer.verify(req, res, function () {
            let developerId = req.query.id;
            developerLogic.getDeveloperOverallScore(developerId, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })*/

    app.get('/developers', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.findAll({
                include: [{
                    model: models.Project,
                    as: 'projects',
                    through: {
                        attributes: [
                            'dev_tech_skills_score',
                            'dev_teamwork_score',
                            'dev_communication_score',
                        ]
                    }
                }]
            }).then(data => res.send({ data: data }));
        });
    })

    app.delete('/developer', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.destroy({
                where: {
                    id: req.query.id
                }
            }).then(data => res.send({ data: data }))
        });
    })

    app.post('/assignDeveloper', (req, res) => {
        authContainer.verify(req, res, () => {
            models.WorksOn.create({
                developer_id: req.body.developerId,
                project_id: req.body.projectId,
            }).then(created => res.send({ data: created }));
        });
    })
    app.delete('/removeAssignment', (req, res) => {
        authContainer.verify(req, res, () => {
            models.WorksOn.destroy({
                where: {
                    developer_id: req.body.developerId,
                    project_id: req.body.projectId,
                }
            }).then(data => res.send({ data: data }))
        });
    })
}