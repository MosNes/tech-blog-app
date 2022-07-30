//this index collects all models into a single file to be easily imported into another file

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations
//Users and Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    //if user is deleted, retain their posts and set user_id on posts to Null
    onDelete: 'SET NULL'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

//Users and Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    //if user is deleted, retain their comments and set user_id on comments to null
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

//Comments and Posts
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    //if post is deleted, delete all associated commments
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };

