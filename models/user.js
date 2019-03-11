/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'id',
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'name'
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'password'
		},
		relatedProject: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: 'project',
				key: 'id'
			},
			field: 'related_project'
		}
	}, {
		tableName: 'user'
	});
};
