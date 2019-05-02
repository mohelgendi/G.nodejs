const models = require('../models');

module.exports = function (router, upload) {
    /**
     * Create a developer.
     */
    router.post('/developers', upload.single('image'), (req, res) => {
        models.Developer.create({
            name: req.body.name,
            position: req.body.position,
            image: 'undefined' !== typeof req.file ? req.file.path : 'uploads/User.png'
        }).then(created => res.send({ data: created }));
    });

    /**
     * Get a developer by id.
     */
    router.get('/developers/:id', (req, res) => {
        models.Developer.findOne({
            where: {
                id: req.params.id
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

    /**
     * Get all developers.
     */
    router.get('/developers', (req, res) => {
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

    /**
     * Delete a developer by id.
     */
    router.delete('/developers/:id', (req, res) => {
        models.Developer.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => res.send({ data: data }));
    });

    /**
     *
     */
    router.post('/developer/:id/assign', (req, res) => {
        models.WorksOn.create({
            developerId: req.body.developerId,
            projectId: req.body.projectId,
        }).then(created => res.send({ data: created }));
    });

    /**
     *
     */
    router.delete('/developers/:id/unassign/:projectId', (req, res) => {
        models.WorksOn.destroy({
            where: {
                developerId: req.params.id,
                projectId: req.params.projectId,
            }
        }).then(data => res.send({ data: data }))
    });

    return router;
};