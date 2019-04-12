'use strict';

const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);
const db        = {};
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:PostgresAmatis1!@136.144.222.3:5432/glee');

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;