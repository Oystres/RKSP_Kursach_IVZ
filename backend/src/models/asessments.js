const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Assessments = sequelize.define('Assessments', {
  assessment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students',
      key: 'studentId'
    }
  },
  discipline_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'disciplines',
      key: 'disciplineId'
    }
  },
  assessment_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Assessments;
