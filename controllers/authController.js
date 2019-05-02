const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = function (router) {
    router.post('/login', (req, res) => {
        models.User.findOne({
            where: {name: req.body.username, password: req.body.password}
        }).then(user => {
            if (null === user) {
                res.status(401).json({
                    error: {
                        message: 'Wrong username or password!'
                    }
                });
            } else {
                res.json({
                    user,
                    jwt: jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, { expiresIn: '365d' })
                });
            }
        }).catch(e => console.log(e));
    });

    return router;
};