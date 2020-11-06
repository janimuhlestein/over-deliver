const {Model, DataTypes} = require('sequelize');
const { Review } = require('./Review');
const sequelize = require('../config/connection');

class Provider extends Model {}

Provider.init(
    {
    id: {
        type: DataTypes.INTEGER,
        alllowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'provider'
    });

module.exports = Provider;