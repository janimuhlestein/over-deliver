const User = require('./User');
const Review = require('./Review');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Provider = require('./Provider');
const Rating = require('./Rating');
const Avatar = require('./Avatar');

//create associations

User.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Provider);
Provider.hasMany(Review);
User.hasMany(Rating);
User.hasMany(Comment);
Provider.hasMany(Rating);
Rating.hasOne(Review);
Review.hasMany(Comment);
Comment.belongsTo(Review);
Review.belongsTo(Rating);
User.hasMany(Vote);
Review.hasMany(Vote);
Vote.belongsTo(Review);
Vote.belongsTo(User);
Avatar.belongsTo(User);
User.hasOne(Avatar);

module.exports = { User, Provider, Review, Rating, Comment, Vote, Avatar};