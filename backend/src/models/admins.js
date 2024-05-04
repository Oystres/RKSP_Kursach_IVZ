const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Admins = sequelize.define('Admins', {
  admin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  admin_login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin_password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Admins;