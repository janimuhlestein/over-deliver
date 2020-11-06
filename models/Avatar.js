const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Avatar extends Model {}

Avatar.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isImage(value){
                value = value.toUpper().split('.');
                if(value[1]!=='JPG' || value[1]!=='JPEG' || value[1]!== 'PNG' || value[1]!=='GIF') {
                    throw new Error('Only JPEG, PNG, or GIF files are accepted.');
                }
            }
        }

    },
    path: {
        type: DataTypes.STRING,
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
        modelName: 'avatar'

});

module.exports = Avatar;