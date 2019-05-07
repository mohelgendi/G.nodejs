const models = require('../models');

module.exports = (router, upload) =>{
    /**
     * Create a developer.
     */
    router.post('/developers', upload.single('image'), (req, res) => {
        models.Developer.create({
            name: req.body.name,
            position: req.body.position,
            image: 'undefined' !== typeof req.file ? req.file.path : 'uploads/AmatisUserX.png'
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
     * update developer
     */
    router.put('/developers', upload.single('image'), (req, res) => {
        let newData = {
            name: req.body.name,
            position: req.body.position,
            image: 'undefined' !== typeof req.file ? req.file.path : 'uploads/AmatisUserX.png'
        };
        Object.keys(newData).forEach(function (key) {
            if (newData[key] === undefined || newData[key] === '') {
                delete newData[key];
            }
        });
        models.Developer.update(newData, {
            where: { id: req.body.developerId },
            returning: true
        })
        .then(created => {
            res.send({ data: created })
        })
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
     * Assign a developer to project
     */
    router.post('/developers/:developerId/assign/:projectId', (req, res) => {
        models.WorksOn.create({
            developerId: req.params.developerId,
            projectId: req.params.projectId,
        }).then(created => res.send({ data: created }));
    });

    /**
     * Unassign developer from project
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