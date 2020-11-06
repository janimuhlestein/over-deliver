const User = require('./User');
const Review = require('./Review');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Provider = require('./Provider');
const Rating = require('./Rating');

//create associations

User.hasMany(Review);

Review.belongsTo(User);


User.hasMany(Rating);

Review.belongsToMany(User, {
    through: Vote,
    foreignKey: 'post_id'
});

Vote.belongsTo(User);

Vote.belongsTo(Review);

Review.hasMany(Vote);

Comment.belongsTo(User);

Comment.belongsTo(Review);

User.hasMany(Comment);

Provider.hasMany(Review);

Provider.hasMany(Rating);


module.exports = { User, Review, Vote, Comment, Provider, Rating};
