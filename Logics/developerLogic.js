let developerLogic = {
    addDeveloper: function (developer, thenFunc, errFunc) {
        let newDev = new InsertModel();
        newDev.table = 'developer';
        newDev.object = {
            name: developer.name,
            image: developer.image == undefined ? "https://agrimachinery.nic.in/Images/User/User.png" : developer.image,
            position: developer.position == undefined ? "Developer" : developer.position
        };
        newDev.then = function (thenData) {
            return thenFunc(thenData);
        };
        newDev.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Insert(newDev);
    },
    getDeveloperById: function (developerId, thenFunc, errFunc) {
        let findQuery = new QueryJSONModel();
        findQuery.table = 'developer';
        findQuery.JSONFilter = { id: { [ormContainer.Op.eq]: developerId } };
        findQuery.then = function (data) {
            return thenFunc(data);
        };
        findQuery.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.SelectByJSONOperands(findQuery);
    },
    getAllDevelopers: function (thenFunc, errFunc) {
        let findQuery = new QueryJSONModel();
        findQuery.table = 'developer';
        findQuery.then = function (data) {
            return thenFunc(data);
        };
        findQuery.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.SelectByJSONOperands(findQuery);
    },
    removeDeveloper: function (id, thenFunc, errFunc) {
        let deleteQuery = new DeleteModel();
        deleteQuery.table = 'developer';
        deleteQuery.where = { id: { [ormContainer.Op.eq]: id } };
        deleteQuery.then = function (data) {
            return thenFunc(data);
        };
        deleteQuery.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.Delete(deleteQuery);
    },
    assignDeveloper: function (assignment, thenFunc, errFunc) {
        let newAssign = new InsertModel();
        newAssign.table = 'works_on';
        newAssign.object = {
            developerId: assignment.developerId,
            projectId: assignment.projectId
        };
        newAssign.then = function (thenData) {
            return thenFunc(thenData);
        }
        newAssign.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.Insert(newAssign);
    },
    removeAssignment: function (developerId, projectId, thenFunc, errFunc) {
        let deleteQuery = new DeleteModel();
        deleteQuery.table = 'works_on';
        deleteQuery.where = { [ormContainer.Op.and]: [{ developerId: { [ormContainer.Op.eq]: developerId } }, { projectId: { [ormContainer.Op.eq]: projectId } }] };
        deleteQuery.then = function (data) {
            return thenFunc(data);
        };
        deleteQuery.err = function (err) {
            return errFunc(err);
        }
        return ormContainer.Delete(deleteQuery);
    },
};
module.exports = developerLogic;