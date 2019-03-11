let authLogic = {
    addUser: function (username, password, relatedProject, thenFunc, errFunc) {
        let User = new InsertModel();
        User.table = 'user';
        User.object = {
            name: username,
            password: password,
            relatedProject: relatedProject == undefined ? null : relatedProject
        };
        User.then = function (thenData) {
            return thenFunc(thenData);
        };
        User.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Insert(User);
    },
    getAllUsers: function (thenFunc, errFunc) {
        let findQuery = new QueryJSONModel();
        findQuery.table = 'user';
        findQuery.then = function (data) {
            return thenFunc(data);
        };
        findQuery.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.SelectByJSONOperands(findQuery);
    },
    removeUser: function (id, thenFunc, errFunc) {
        let deleteQuery = new DeleteModel();
        deleteQuery.table = 'user';
        deleteQuery.where = { id: { [ormContainer.Op.eq]: id } };
        deleteQuery.then = function (data) {
            return thenFunc(data);
        };
        deleteQuery.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.Delete(deleteQuery);
    }
};
module.exports = authLogic;