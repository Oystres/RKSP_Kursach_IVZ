const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Students = sequelize.define('Students', {
  student_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  student_login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  patronymic: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  stud_group: {
    type: DataTypes.STRING,
  }
});

module.exports = Students;
