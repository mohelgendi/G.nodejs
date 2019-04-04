const jwt = require('jsonwebtoken');

let returnObject = {};

returnObject.sign = function (username, password, errFunc, thenFunc) {
    let authQuery = new QueryJSONModel();
    authQuery.table = 'user';
    authQuery.JSONFilter = { [ormContainer.Op.and]: [{ name: { [ormContainer.Op.eq]: username } }, { password: { [ormContainer.Op.eq]: password } }] };
    authQuery.page = 0;
    authQuery.pageSize = 5;
    authQuery.then = function (data) {
        if (data.length == 1 && data[0].name == username && data[0].password == password) {
            let authObj = { username, password };
            jwt.sign(authObj, 'secretkey', { expiresIn: "5d" }, (err, token) => {
                if (err) {
                    return errFunc(err);
                } else {
                    return thenFunc(token,data[0].relatedProject);
                }
            });
        } else {
            return errFunc("user doesnt exist");
        }
    };
    return ormContainer.SelectByJSONOperands(authQuery);
}
returnObject.verify = function (req, res, thenFunc) {
    let reqToken = req.headers['authorization'];
    jwt.verify(reqToken, 'secretkey', (err, authData) => {
        if (err) {
            res.status(401).send({ error: 'unautherized', message: err });
        } else {
            console.log("\n\n Token: "+JSON.stringify(authData)+"\n\n");
            let authQuery = new QueryJSONModel();
            authQuery.table = 'user';
            authQuery.JSONFilter = { [ormContainer.Op.and]: [{ name: { [ormContainer.Op.eq]: authData.username } }, { password: { [ormContainer.Op.eq]: authData.password } }] };
            authQuery.page = 0;
            authQuery.pageSize = 5;
            authQuery.then = function (data) {
                if (data.length == 1) {
                    return thenFunc(authData);
                } else {
                    res.status(401).send({ error: 'unautherized', message: "user doesnt exist" });
                }
            };
            return ormContainer.SelectByJSONOperands(authQuery);
        }
    });
}
returnObject.test = function () {
    console.log('\ntest from authContainer\n');
}

module.exports = returnObject;