const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
},
text: {
    type: DataTypes.TEXT,
    allowNull: false
},
user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
        model: 'user',
        key: 'id'
    }
},
review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
        model: 'review',
        key: 'id'
    }
}
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'

});

module.exports = Comment;