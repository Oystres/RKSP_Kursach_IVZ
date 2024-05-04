const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Debts = sequelize.define('Debts', {
  debt_id: {
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
  }
});

module.exports = Debts;
