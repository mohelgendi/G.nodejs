/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('worksOn', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		developerId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'developer',
				key: 'id'
			},
			field: 'developer_id'
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
		devCommunicationScore: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			field: 'dev_communication_score'
		},
		devTechSkillsScore: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			field: 'dev_tech_skills_score'
		},
		devTeamworkScore: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			field: 'dev_teamwork_score'
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'comment'
		}
	}, {
		tableName: 'works_on'
	});
};
