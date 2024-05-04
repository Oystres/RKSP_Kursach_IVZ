const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Disciplines = sequelize.define('Disciplines', {
  discipline_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  discipline_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
  },
  assessment_form: {
    type: DataTypes.STRING,
  }
});

module.exports = Disciplines;