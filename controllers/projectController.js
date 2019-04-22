const authContainer = require('../authContainer');
const models = require('../models');

module.exports = (app, upload) => {
    /**
     * Create projects.
     *
     * @todo attach / assign developers by given array
     */
    app.post('/project', upload.single('image'), (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.create({
                name: req.body.name,
                client: req.body.client,
                start_date: req.body.startDate,
                end_date: req.body.endDate,
                image: "undefined" !== typeof req.file ? req.file.path : undefined
            }).then(created => res.send({ data: created }));
        });
    });

    /**
     * Get all projects.
     */
    app.get('/projects', (req, res) => {
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
                },
            }],
        }).then(data => res.send({ data: data }));
    });

    /**
     * Get a project by id.
     */
    app.get('/project/:id', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.findOne({
                where: {
                    id: req.params.id
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
                    },
                }]
            }).then(data => res.send({ data: data }));
        });
    });

    /**
     * Delete a project by id.
     */
    app.delete('/project/:id', (req, res) => {
        authContainer.verify(req, res, () => {
            models.Project.destroy({
                where: {
                    id: req.params.id
                }
            }).then(data => res.send({data: data}))
        });
    });
};