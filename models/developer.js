'use strict';

module.exports = function(sequelize, DataTypes) {
	const Developer = sequelize.define('Developer', {
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
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		position: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		tableName: 'developer',
		timestamps: false,
		underscored: true,
	});

	Developer.associate = (models) => {
		Developer.belongsToMany(models.Project, {
			through: models.WorksOn,
			as: 'projects',
			foreignKey: 'developer_id',
			timestamps: false,
		});
	};

	return Developer;
};
