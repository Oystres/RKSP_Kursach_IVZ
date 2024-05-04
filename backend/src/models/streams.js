const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Streams = sequelize.define('Streams', {
  stream_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  stud_group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discipline_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'disciplines',
      key: 'disciplineId'
    }
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teachers',
      key: 'teacherId'
    }
  }
});

module.exports = Streams;
