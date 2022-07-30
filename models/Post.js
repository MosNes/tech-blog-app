const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create post model
class Post extends Model {

}

// create fields and columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id : {
            type: DataTypes.INTEGER,
            //allowNull is true in case user gets deleted
            allowNull: true,
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
        modelName: 'post'
    }
)