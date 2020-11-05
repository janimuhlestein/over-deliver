const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//user model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isImage(value) {
                    value.split('.');
                    if(value[1]!='jpg' || value[1] != 'png' || value[1]!= 'gif') {
                        throw new Error('Only JPG, PNG or GIF files accepted');
                    }
                }
            }    
        }
    },
    {
            //table configuration options go here
            hooks: {
                    async beforeCreate(newUserData){
                        newUserData.password = await bcrypt.hash(newUserData.password, 10);
                        return newUserData;
                    },
                    async beforeUpdate(updatedUserData){
                        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                        return updatedUserData;
                    }
            },
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'user'
    });

    module.exports = User;