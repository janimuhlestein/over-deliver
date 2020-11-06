const User = require('./User');
const Review = require('./Review');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Provider = require('./Provider');
const Rating = require('./Rating');
const Avatar = require('./Avatar');
const Image = require('./Image');

//create associations

User.hasMany(Review);

User.hasOne(Avatar);

User.hasMany(Rating);

Avatar.belongsTo(User);

User.hasMany(Image);

Image.belongsTo(User);

Review.belongsTo(User);

User.hasMany(Rating);

Review.belongsTo(User);

Vote.belongsTo(User);

Vote.belongsTo(Review);

Review.hasMany(Vote);

Comment.belongsTo(User);

Comment.belongsTo(Review);

Review.hasMany(Comment);

User.hasMany(Comment);

Provider.hasMany(Review);

Provider.hasMany(Rating);

Provider.hasMany(Image);


module.exports = { User, Review, Vote, Comment, Provider, Rating, Avatar, Image};
