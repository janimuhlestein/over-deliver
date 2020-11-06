const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quality: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5
        }
    },
    accuracy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5
        }
    },
    speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5
        }
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5
        }
    },
    safety: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5
        }
    },
    average: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 5
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: id
        }
    },
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'review',
            key: id
        }

    },
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'provider',
            key: id
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