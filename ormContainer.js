
const constants = require('./constants/constants');

let HttpStatus = constants.HttpStatus;

module.exports = function(dialect, databaseName, userName, password, host, port, thenFunc) {
    let returnObject = {};
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize(databaseName, userName, password, {
        logging: console.log,
        dialect: dialect,
        host: host,
        port: port,
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },
        define: {
            timestamps: false
        }
    })
    sequelize
        .authenticate()
        .then(() => {
            console.log('Database connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    sequelize.query('SELECT table_name\n' +
        '  FROM information_schema.tables\n' +
        ' WHERE table_schema=\'public\'\n' +
        '   AND table_type=\'BASE TABLE\'').then(projects => {
        returnObject.tables = {};
        for(var i = 0; i < projects[0].length; i++){
            try{
                returnObject.tables[projects[0][i].table_name] = require('./models/' + projects[0][i].table_name)(sequelize, Sequelize);
            }catch (e) {
                console.log('error on table mapping by sequelize!', e);
            }
        }
        if(thenFunc != undefined)
            thenFunc();
    })


    const TableHints = Sequelize.TableHints;
    returnObject.SelectViewByQuery = function(viewQueryObject){
        //rowSelections
        let selectRows = '*';

        if(viewQueryObject.rowSelections != undefined && viewQueryObject.rowSelections != null && viewQueryObject.rowSelections.length > 0){
            selectRows = '';
            for(let q = 0; q < viewQueryObject.rowSelections.length; q++){
                selectRows += _.snakeCase(viewQueryObject.rowSelections[q]);
                if(q != viewQueryObject.rowSelections.length-1){
                    selectRows += ','
                }
            }
        }
        let wherepart = viewQueryObject.JSONFilter != undefined && viewQueryObject.JSONFilter != null ? ' where ' + sequelize.queryInterface.QueryGenerator.getWhereConditions(viewQueryObject.JSONFilter) : ' where 1=1 ';
        let query = 'Select '+ selectRows +' from ' + viewQueryObject.view + wherepart;
        if(viewQueryObject.page != undefined && viewQueryObject.pageSize != undefined){
            query += " LIMIT " + parseInt(viewQueryObject.pageSize)+" OFFSET "+(parseInt(viewQueryObject.page)* parseInt(viewQueryObject.pageSize)) + ";"
        }
        return sequelize.query(query).then(dataSet => {
            if(viewQueryObject.then != undefined){
                /*for(let q = 0; q < dataSet[0].length; q++){
                    replaceDates(dataSet[0][q]);
                }*/
                return viewQueryObject.then(dataSet[0],{ deep: true });
            }
            return true;
        })
    }
    returnObject.SelectByQuery = function(queryObject){
        let query = queryObject.query;
        let thenFunc = queryObject.then;
        let model = queryObject.model;
        if(model != undefined){
            return sequelize.query(query, { model: model }).then(data => {
                for(let i = 0; i < data.length; i++){
                    replaceDates(data[i]);
                }
                if(thenFunc != null) return thenFunc(data);
                return true;
            })
        }
        else{
            
            return sequelize.query(query).then(data => {
                let result = data != undefined && data != null && data.length != null && data.length !=undefined ? data[0] : data;
                for(let i = 0; i < result.length; i++){
                    replaceDates(result[i]);
                }
                if(thenFunc != null) return thenFunc(result);
                return true;
            })
        }
    }
    returnObject.sequelize = sequelize;
    returnObject.JSONOperands = Sequelize.Op;
    returnObject.Op = Sequelize.Op;
    returnObject.SelectByJSONOperands = function(queryObject){
        let tableName = queryObject.table;
        let thenFunc = queryObject.then;
        let JSONFilter = queryObject.JSONFilter;
        let page = queryObject.page;
        let pageSize = queryObject.pageSize;
        let orderBy = queryObject.orderBy;
        let offset = undefined;
        let limit = undefined;
        if(page != undefined && pageSize != undefined){
            offset = page * pageSize;
            limit = pageSize;
        }
        return returnObject.tables[tableName].findAll({where : JSONFilter, tableHint: TableHints.NOLOCK, offset: offset, limit: limit, order : orderBy}).then(data => {
            let resultData = [];
            if(data != null && data != undefined){
                data.forEach(function(val) {
                    resultData.push(val.dataValues);
                });
            }
            if(thenFunc != null) return thenFunc(resultData);
            return true;
        }
    );
    }

    returnObject.Transaction = function(transactionalFunc, thenFunc, exceptionFunc ){
        return sequelize.transaction({
            autocommit: false,
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        }, transactionalFunc).then((result) => {
            if(thenFunc != undefined )return thenFunc(result);
            return true;
            }
        ).catch((err)=>{
            if(exceptionFunc != undefined )return exceptionFunc(err);
            console.error(err)
            return false;
        });
    }

    returnObject.Insert = function(insertObj, tran){
        let tableName = insertObj.table;
        let object = insertObj.object;
        let thenFunc = insertObj.then;
        let errFunc = insertObj.err;
        let t = tran;
        return returnObject.tables[tableName].create(object, {transaction: t}).then(function (data) {
            if(thenFunc != null) return thenFunc(data.dataValues);
            return true;
        }).catch(err => {
            if(errFunc != undefined) errFunc(err.message, HttpStatus.BAD_REQUEST);
            throw err;
        });
    }

    returnObject.Update = function(updateObj, tran){
        let tableName = updateObj.table;
        let object = updateObj.object;
        let wherePart = updateObj.where;
        let thenFunc = updateObj.then;
        let errFunc= updateObj.err;
        let t = tran;
        return returnObject.tables[tableName].update(object, {where: wherePart, transaction: t}).then(function (data) {
            if(thenFunc != null) return thenFunc(data);
            return true;
        }).catch(err => {
            if(errFunc != undefined) errFunc(err.message, HttpStatus.BAD_REQUEST);
            throw err;
        });
    }

    returnObject.InsertOrUpdate = function(insertOrUpdateObj, tran){
        let tableName = insertOrUpdateObj.table;
        let object = insertOrUpdateObj.object;
        let JSONFilter = {id : {[Sequelize.Op.eq] : parseInt(insertOrUpdateObj.object.id)}}
        let wherePart = insertOrUpdateObj.object.id != undefined && insertOrUpdateObj.object.id > 0 ? JSONFilter : undefined;
        let thenFunc = insertOrUpdateObj.then;
        let errFunc = insertOrUpdateObj.err;
        let t = tran;
        if(insertOrUpdateObj.object.id != undefined && insertOrUpdateObj.object.id > 0){
            return returnObject.tables[tableName].update(object, {where: wherePart, transaction: t}).then(function (data) {
                return returnObject.tables[tableName].findAll({where : JSONFilter, tableHint: TableHints.NOLOCK}).then(data => {
                        let resultData = null;
                        if(data != null && data != undefined){
                            data.forEach(function(val) {
                                resultData = val.dataValues;
                            });
                        }
                        if(thenFunc != null) return thenFunc(resultData);
                        return true;
                    }
                )

            }).catch(err => {
                if(errFunc != undefined) errFunc(err.message, HttpStatus.BAD_REQUEST);
                throw err;
            });
        }
        return returnObject.tables[tableName].create(object, {transaction: t}).then(function (data) {
            if(thenFunc != null) return thenFunc(data.dataValues);
            return true;
        }).catch(err => {
            if(errFunc != undefined) errFunc(err.message, HttpStatus.BAD_REQUEST);
            throw err;
        });
    }

    returnObject.Delete = function(deleteObj, tran){
        let tableName = deleteObj.table;
        let wherePart = deleteObj.where;
        let thenFunc = deleteObj.then;
        let errFunc = deleteObj.err;
        let t = tran;
        return returnObject.tables[tableName].destroy({where: wherePart, transaction: t}).then(function (data) {
            if(thenFunc != null) return thenFunc(data);
            return true;
        }).catch(err => {
            console.log(err)
            if(errFunc != undefined) errFunc(err.message, HttpStatus.BAD_REQUEST);
            throw err;
        });
    }

    returnObject.BulkInsert = function (tableName, items, thenFunc, exceptionFunc, tran){
        var members = items;

        sequelize.transaction(tran != undefined ? tran : {
            autocommit: false,
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        },function (tran) {
            var promises = []
            for (var i = 0; i < members.length; i++) {
                var newPromise = returnObject.tables[tableName].create(members[i], {transaction: tran});
                promises.push(newPromise);
            };
            return Promise.all(promises).then((data)=>{
                console.log(data);
                return true;
            }).catch((err)=>{
                console.log(err);
                return false;
            });
        }).then(function (result) {
            if(thenFunc != undefined) return thenFunc(result);
        }).catch(function (err) {
            console.log("NO!!!");
            console.error(err)
            if(exceptionFunc != undefined) exceptionFunc(err);
            return false;
        });
    }
    
    return returnObject;
}

