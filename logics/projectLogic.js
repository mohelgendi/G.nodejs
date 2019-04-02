let projectLogic = {
    addProject: function (name, client, startDate, endDate, image, thenFunc, errFunc) {
        let newproj = new InsertModel();
        newproj.table = 'project';
        newproj.object = {
            name: name,
            client: client,
            startDate: startDate,
            endDate: endDate,
            image: image == undefined ? 'https://pbs.twimg.com/profile_images/824249686919958529/kxPhe7Kk.jpg' : image
        };
        newproj.then = function (thenData) {
            return thenFunc(thenData);
        };
        newproj.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Insert(newproj);
    },
    getProjectById: function (projId, thenFunc, errFunc) {
        let findQuery = new QueryJSONModel();
        findQuery.table = 'project';
        findQuery.JSONFilter = { id: { [ormContainer.Op.eq]: projId } };
        findQuery.then = function (data) {
            return thenFunc(data);
        };
        findQuery.err = function(err){
            return errFunc(err);
        }
        return ormContainer.SelectByJSONOperands(findQuery);
    },
    getAllProjects: function (thenFunc, errFunc) {
        let findQuery = new QueryJSONModel();
        findQuery.table = 'project';
        findQuery.then = function (data) {
            return thenFunc(data);
        };
        findQuery.err = function(err){
            return errFunc(err);
        }
        return ormContainer.SelectByJSONOperands(findQuery);
    },
    getProjectScreen: function (id, thenFunc, errFunc) {
        let viewQuery = new ViewQueryModel();
        viewQuery.view = "project_screen";
        viewQuery.JSONFilter = { project_id: { [ormContainer.Op.eq]: id } };
        viewQuery.then = function(thenData){
            return thenFunc(thenData);
        };
        viewQuery.err = function(err){
            return errFunc(err);
        };
        return ormContainer.SelectViewByQuery(viewQuery)
    },
    removeProject: function (id, thenFunc, errFunc) {
        let deleteQuery = new DeleteModel();
        deleteQuery.table = 'project';
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
module.exports = projectLogic;