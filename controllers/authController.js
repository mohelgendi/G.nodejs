const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = function (router) {
    router.get('/getToken', (req, res) => {
        models.User.findOne({
            where: {
                name: req.query.username,
                password: req.query.password
            }
        }).then(user => {
            if (null === user) {
                res.status(401).json({
                    error: {
                        message: 'Wrong username or password!'
                    }
                });
            } else {
                res.json({
                    relatedProject: user.relatedProject,
                    token: jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, { expiresIn: '5d' })
                });
            }
        }).catch(e => console.log(e));
    });

    return router;
};