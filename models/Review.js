const { Model, DataTypes } = require('sequelize');
const { Provider } = require('.');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    average: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quality: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    speed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accuracy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    safety: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    });

module.exports = Review;