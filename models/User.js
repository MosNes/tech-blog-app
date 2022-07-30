const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//creates user model

class User extends Model {

    //set up method to run on instance data (per user) to check password
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    }
}

User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            //NOT NULL
            allowNull: false,
            //set as primary key
            primaryKey: true,
            //turn on auto-increment
            autoIncrement: true
        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //must be at least 8 chars long
                len: [8]
            }
        }
    },
    {
        //table config goes here https://sequelize.org/v5/manual/models-definition.html#configuration

        //enable hooks, functions that are called whenever data is manipulated in this table
        hooks : {
            //runs before a user is created in the db
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            // runs when a user is updated, requires { individualHooks: true } to be added to the function that handles the update in the PUT route
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },

        //pass in imported sequelize connection
        sequelize,
        //don't auto create timestamps
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camelCase
        underscored: true,
        //force model name to stay lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;