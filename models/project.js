'use strict';

module.exports = function(sequelize, DataTypes) {
	const Project = sequelize.define('Project', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		start_date: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		end_date: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		tableName: 'project',
		timestamps: false,
		underscored: true,
	});

	Project.associate = (models) => {
		Project.belongsToMany(models.Developer, {
			through: models.WorksOn,
			as: 'developers',
			foreignKey: 'project_id',
			timestamps: false,
		});
		Project.hasOne(models.ProjectEvaluation, {
			as: 'projectEvaluation',
			foreignKey: 'project_id',
			timestamps: false,
		});
	};

	return Project;
};
