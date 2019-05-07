const models = require('../models');

module.exports = (router, upload) => {
    /*
     * Create projects.
    */
    router.post('/projects', upload.single('image'), (req, res) => {
        models.Project.create({
            name: req.body.name,
            client: req.body.client,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            image: "undefined" !== typeof req.file ? req.file.path : 'uploads/AmatisProjectX.jpg'
        }).then(data => {
            models.ProjectEvaluation.create({ projectId: data.id });
            res.send({ data });
        });
    });

    /**
     * update project
     */
    router.put('/projects', upload.single('image'), (req, res) => {
        let newData = {
            name: req.body.name,
            client: req.body.client,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            image: "undefined" !== typeof req.file ? req.file.path : 'uploads/AmatisProjectX.jpg'
        };
        Object.keys(newData).forEach(function (key) {
            if (newData[key] === undefined) {
                delete newData[key];
            }
        });
        models.Project.update(newData, {
            where: { id: req.body.projectId },
            returning: true
        })
        .then(created => {
            res.send({ data: created })
        })
    });

    /*
     * Get all projects.
    */
    router.get('/projects', (req, res) => {
        models.Project.findAll({
            include: [{
                model: models.Developer,
                as: 'developers',
                through: {
                    attributes: [
                        'devCommunicationScore',
                        'devTechSkillsScore',
                        'devTeamworkScore',
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
        }).then(data => res.send({ data }));
    });

    /*
     * Get a project by id.
    */
    router.get('/projects/:id', (req, res) => {
        models.Project.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.Developer,
                as: 'developers',
                through: {
                    attributes: [
                        'devCommunicationScore',
                        'devTechSkillsScore',
                        'devTeamworkScore',
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
        }).then(data => res.send({ data }));
    });

    /*
     * Delete a project by id.
    */
    router.delete('/projects/:id', (req, res) => {
        models.Project.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => res.send({ data }))
    });

    return router;
};