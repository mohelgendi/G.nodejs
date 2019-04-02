/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('project', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name'
		},
		client: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'client'
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'image'
		},
		startDate: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'start_date'
		},
		endDate: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'end_date'
		}
	}, {
		tableName: 'project'
	});
};
