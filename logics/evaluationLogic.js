let evaluationLogic = {
    evaluateDeveloperOnProject: function (projectId, developerId, communication, techSkill, teamwork, thenFunc, errFunc) {
        let update = new UpdateModel();
        update.table = 'works_on';
        update.where = { [ormContainer.Op.and]: [{ developerId: { [ormContainer.Op.eq]: developerId } }, { projectId: { [ormContainer.Op.eq]: projectId } }] };
        let obj = {};
        if (communication != undefined) {
            obj.devCommunicationScore = communication;
        }
        if (teamwork != undefined) {
            obj.devTeamworkScore = teamwork;
        }
        if (techSkill != undefined) {
            obj.devTechSkillsScore = techSkill;
        }
        update.object = obj;
        update.then = function (thenData) {
            return thenFunc(thenData);
        }
        update.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Update(update);
    },
    evaluateDeveloperOverallscore: function (developerId, overallScore, thenFunc, errFunc) {
        let update = new UpdateModel();
        update.table = 'developer';
        update.where = { id: { [ormContainer.Op.eq]: developerId } };
        update.object = { overallScore };
        update.then = function (thenData) {
            return thenFunc(thenData);
        }
        update.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Update(update);
    },
    evaluateProjectUpdate: function (evaluationScore, evaluationType, projectId, thenFunc, errFunc) {
        let update = new UpdateModel();
        let obj = {};
        update.table = 'project_evaluation';
        update.where = { projectId: { [ormContainer.Op.eq]: projectId } };
        if (evaluationType == 1) {
            obj.inHouseEvaluation = evaluationScore;
        } else if (evaluationType == 2) {
            obj.clientEvaluation = evaluationScore;
        }
        update.object = obj;
        update.then = function (thenData) {
            return thenFunc(thenData);
        }
        update.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Update(update);
    },
    evaluateProject: function (inHouseEvaluation, clientEvaluation, projectId, thenFunc, errFunc) {
        let insert = new InsertModel();
        insert.table = 'project_evaluation';
        insert.object = {
            projectId,
            inHouseEvaluation,
            clientEvaluation
        };
        insert.then = function (thenData) {
            return thenFunc(thenData);
        }
        insert.err = function (err) {
            return errFunc(err);
        };
        return ormContainer.Insert(insert);
    }
};
module.exports = evaluationLogic;