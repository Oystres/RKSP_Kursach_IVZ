const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Teachers = sequelize.define('Teachers', {
  teacher_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teacher_login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher_name: {
    type: DataTypes.STRING,
  },
  teacher_patronymic: {
    type: DataTypes.STRING,
  },
  teacher_surname: {
    type: DataTypes.STRING,
  },
  teacher_department: {
    type: DataTypes.STRING,
  }
});

module.exports = Teachers;

