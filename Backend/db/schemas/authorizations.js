const strings = require("../../utils/strings");
const constants = require("../../config/constants.json");
const { Sequelize } = require("sequelize");
// let keys_length = require("./../config/keys_length");
module.exports = function (sequelize, DataTypes) {
    let Model = sequelize.define("authorizations", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
                model: "users",
                key: "id"
            },
            validate: {
                notEmpty: { args: true },
                isInt: true,
                min: 1
            }
        },
        access_token: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: true
            }
        },
        refresh_token: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: true
            }
        }
  
    }, {
        tableName: "authorizations",
        underscored: true
    }, {
        instanceMethods: {
            generateAccessToken: function () {
                return this.access_token = strings.generateRandomString(constants.keys_length.access_token, constants.char_set);

            }
        }
    });
    //--//
    Model.prototype.generateAccessToken = function () {
        this.access_token = strings.generateRandomString(constants.keys_length.access_token, constants.char_set);
    };
    Model.prototype.generatePasswordToken = function () {
        this.refresh_token = strings.generateRandomString(constants.keys_length.refresh_token, constants.char_set);
    };
    return Model;
};
