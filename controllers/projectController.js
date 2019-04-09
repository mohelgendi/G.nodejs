const constants = require('../constants/constants');
const authContainer = require('../authContainer');
let projectLogic = require('../logics/projectLogic.js');
let HttpStatus = constants.HttpStatus;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:PostgresAmatis1!@136.144.222.3:5432/glee');

class Project extends Sequelize.Model {}
class Developer extends Sequelize.Model {}
class WorksOn extends Sequelize.Model {}

var app;
module.exports = function (application, upload) {
    app = application;
    app.post('/addProject', upload.single('image'), (req, res) => {
        authContainer.verify(req, res, function () {
            let image = req.file.path || undefined;
            let name = req.body.projectName;
            let client = req.body.clientName;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;

            projectLogic.addProject(name, client, startDate, endDate, image, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.get('/getProjectById', (req, res) => {
        authContainer.verify(req, res, function () {
            let projID = req.query.id;
            projectLogic.getProjectById(projID, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })

    app.get('/getAllProjects', (req, res) => {
        authContainer.verify(req, res, function () {
            projectLogic.getAllProjects( function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.get('/getProjectScreen', (req, res) => {
        authContainer.verify(req, res, function () {
            projectLogic.getProjectScreen(req.query.id,  function (thenData) {
                debugger
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.get('/getAllProjectsScreens', (req, res) => {
        authContainer.verify(req, res, function () {
            projectLogic.getAllProjectsScreens(function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
    app.get('/get-projects', (req, res) => {
        Developer.init({
            name: Sequelize.STRING,
            overall_score: Sequelize.FLOAT,
            image: Sequelize.STRING,
            position: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'developer',
            timestamps: false
        });

        Project.init({
            name: Sequelize.STRING,
            client: Sequelize.STRING,
            image: Sequelize.STRING,
            start_date: Sequelize.DATE,
            end_date: Sequelize.DATE,
        }, {
            sequelize,
            tableName: 'project',
            timestamps: false
        });

        WorksOn.init({
            developer_id: Sequelize.BIGINT,
            project_id: Sequelize.BIGINT,
            dev_communication_score: Sequelize.FLOAT,
            dev_tech_skills_score: Sequelize.FLOAT,
            dev_teamwork_score: Sequelize.FLOAT,
        }, {
            sequelize,
            tableName: 'works_on',
            timestamps: false
        });

        Project.belongsToMany(Developer, {
            through: 'works_on',
            as: 'developers',
            foreignKey: 'project_id',
            timestamps: false
        });

        Developer.belongsToMany(Project, {
            through: 'works_on',
            as: 'projects',
            foreignKey: 'developer_id',
            timestamps: false
        });

        console.log(Project.findAll({
            include: [{
                model: Developer,
                as: 'developers'
            }]
        }).then((data) => {
            res.status(200).send({ data: data });
        }));
    })
    app.delete('/removeProject', (req, res) => {
        authContainer.verify(req, res, function () {
            let id = req.body.id;
            projectLogic.removeProject(id, function (thenData) {
                res.status(200).send({ data: thenData });
            }, function (err) {
                res.status(400).send({ error: err });
            });
        });
    })
}