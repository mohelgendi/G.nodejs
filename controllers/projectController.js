const authContainer = require('../authContainer');
const models = require('../models');

module.exports = (app, upload) => {
    /*
     * Create projects.
    */
    app.post('/project', upload.single('image'), (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.create({
                name: req.body.name,
                client: req.body.client,
                start_date: req.body.startDate,
                end_date: req.body.endDate,
                image: "undefined" !== typeof req.file ? req.file.path : undefined
            }).then(created => {
                models.ProjectEvaluation.create({ projectId: created.id });
                res.send({ data: created });
            });
        });
    });

    /*
     * Get all projects.
    */
    app.get('/projects', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.findAll({
                include: [{
                    model: models.Developer,
                    as: 'developers',
                    through: {
                        attributes: [
                            'dev_tech_skills_score',
                            'dev_teamwork_score',
                            'dev_communication_score',
                        ]
                    }
                },
                {
                    model: models.ProjectEvaluation,
                    as: 'projectEvaluation',
                    attributes: [
                        'inHouseEvaluation',
                        'clientEvaluation'
                    ]
                }]
            }).then(data => res.send({ data: data }));
        });
    });

    /*
     * Get a project by id.
    */
    app.get('/project', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.findOne({
                where: {
                    id: req.query.id
                },
                include: [{
                    model: models.Developer,
                    as: 'developers',
                    through: {
                        attributes: [
                            'dev_tech_skills_score',
                            'dev_teamwork_score',
                            'dev_communication_score',
                        ]
                    }
                },
                {
                    model: models.ProjectEvaluation,
                    as: 'projectEvaluation',
                    attributes: [
                        'inHouseEvaluation',
                        'clientEvaluation'
                    ]
                }]
            }).then(data => res.send({ data: data }));
        });
    });

    /*
     * Delete a project by id.
    */
    app.delete('/project', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.destroy({
                where: {
                    id: req.query.id
                }
            }).then(data => res.send({ data: data }))
        });
    });
};