'use strict';

module.exports = function (sequelize, DataTypes) {
    const WorksOn = sequelize.define('WorksOn', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        developer_id: {
            type: DataTypes.BIGINT,
            field: 'developer_id',
            allowNull: false,
            references: {
                model: 'Developer',
                key: 'id'
            },
        },
        project_id: {
            type: DataTypes.BIGINT,
            field: 'project_id',
            allowNull: false,
            references: {
                model: 'Project',
                key: 'id'
            },
        },
        dev_communication_score: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        dev_tech_skills_score: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        dev_teamwork_score: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'works_on',
        underscored: true,
        timestamps: false,
    });

    return WorksOn;
};
