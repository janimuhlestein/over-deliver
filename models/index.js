const User = require('./User');
const Review = require('./Review');
const Vote = require('./Vote');
const Comment = require('./Comment');

//create associations

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Review, {
    through: Vote,
    foreignKey: 'user_id'
});

Review.belongsToMany(User, {
    through: Vote,
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Review, {
    foreignKey: 'review_id'
});

Review.hasMany(Vote, {
    foreignKey: 'review_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

User.hasMany(Comment, {
    foreignKey: 'review_id'
});

module.exports = { User, Review, Vote, Comment};
