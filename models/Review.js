const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        review_id: body.review_id
      }).then(() => {
        return Review.findOne({
          where: {
            id: body.review_id
          },
          attributes: [
            'id',
            'review_text',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  };
  
Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
       rating_id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           references: {
               model: 'rating',
               key: 'id'
           }
       },
        title: {
                type: DataTypes.STRING,
                allowNull: true
            },
        review_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        provider_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'provider',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
       image: {
            type: DataTypes.STRING,
            allowNull: true,
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
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
);

module.exports = Review;