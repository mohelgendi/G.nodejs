/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('projectEvaluation', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		projectId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'project',
				key: 'id'
			},
			field: 'project_id'
		},
		inHouseEvaluation: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			field: 'in_house_evaluation'
		},
		clientEvaluation: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			field: 'client_evaluation'
		}
	}, {
		tableName: 'project_evaluation'
	});
};
