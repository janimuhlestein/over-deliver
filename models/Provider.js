const {DataTypes} = require('sequelize');
const { Review } = require('.');
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
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'review',
            key: rating
        }
    } 
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'provider'
    });

module.exports = Provider;