const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    packaging: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'provider',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating'

});

module.exports = Rating;