const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false
});

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  }
});

const Car = sequelize.define('Car', {
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  mileage: { type: DataTypes.INTEGER, allowNull: false },
  transmission: { type: DataTypes.STRING },
  fuel: { type: DataTypes.STRING },
  color: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  images: { type: DataTypes.TEXT }, // JSON stringified array of URLs
  status: { type: DataTypes.ENUM('available', 'sold'), defaultValue: 'available' }
});

module.exports = { sequelize, User, Car };
