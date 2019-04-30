const authContainer = require('../authContainer');
const models = require('../models');

module.exports = function (app, upload) {

    app.post('/developer', upload.single('image'), (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.create({
                name: req.body.name,
                position: req.body.position,
                image: 'undefined' !== typeof req.file ? req.file.path : 'uploads/User.png'
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
                            'devCommunicationScore',
                            'devTechSkillsScore',
                            'devTeamworkScore'
                        ]
                    }
                }]
            }).then(data => res.send({ data: data }));
        });
    });

    app.get('/developers', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.findAll({
                include: [{
                    model: models.Project,
                    as: 'projects',
                    through: {
                        attributes: [
                            'devCommunicationScore',
                            'devTechSkillsScore',
                            'devTeamworkScore',
                        ]
                    }
                }]
            }).then(data => res.send({ data: data }));
        });
    });

    app.delete('/developer', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Developer.destroy({
                where: {
                    id: req.body.id
                }
            }).then(data => res.send({ data: data }))
        });
    });

    app.post('/assignDeveloper', (req, res) => {
        authContainer.verify(req, res, () => {
            models.WorksOn.create({
                developerId: req.body.developerId,
                projectId: req.body.projectId,
            }).then(created => res.send({ data: created }));
        });
    });

    app.delete('/removeAssignment', (req, res) => {
        authContainer.verify(req, res, () => {
            models.WorksOn.destroy({
                where: {
                    developerId: req.body.developerId,
                    projectId: req.body.projectId,
                }
            }).then(data => res.send({ data: data }))
        });
    });

}