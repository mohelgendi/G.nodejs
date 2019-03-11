/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('developer', {
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
		overallScore: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			field: 'overall_score'
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'image'
		},
		position: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'position'
		}
	}, {
		tableName: 'developer'
	});
};
