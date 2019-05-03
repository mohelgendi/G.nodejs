const models = require('../models');

module.exports = (app) => {
    app.post('/addUser', (req, res) => {
        models.User.create({
            name: req.body.username,
            password: req.body.password,
            relatedProject: req.body.relatedProject
        }).then(data => res.send({ data: data }));
    });

    app.get('/getAllUsers', (req, res) => {
        models.User.findAll({}).then(data => res.send({ data: data }));
    });

    app.delete('/removeUser/:id', (req, res) => {
        models.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => res.send({ data: data }))
    });

    return app
}