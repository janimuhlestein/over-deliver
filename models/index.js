const User = require('./User');
const Review = require('./Review');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Avatar = require('./Avatar');
const Image = require('./Image');

//create associations

User.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Comment);
Review.hasMany(Comment);
Comment.belongsTo(Review);
User.hasMany(Vote);
Review.hasMany(Vote);
Vote.belongsTo(Review);
Vote.belongsTo(User);
//Avatar.belongsTo(User);
User.hasOne(Avatar);
User.hasMany(Image);
//Image.belongsTo(Review);
//Review.hasMany(Image);

module.exports = { User, Review, Comment, Vote };