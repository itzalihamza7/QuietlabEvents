const crypto = require("crypto");
const { Sequelize } = require("sequelize");
const strings = require("../../utils/strings");
const constants = require("../../config/constants.json");

module.exports = function (sequelize, DataTypes) {
    let isUnique = function (field) {
        return function (value, next) {
            let Model = sequelize.models.users;
            let query = {};
            query[field] = value;
            Model.findOne({
                where: query,
                attributes: ["id"]
            }).then(function (obj) {
                if (obj && obj.id) { next(field + ": '" + value + "' is already taken"); }
                else { next(); }
            });
        };
    };

    let Model = sequelize.define("users", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        role: {
            type: Sequelize.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        image: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        name: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        email: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: null
        },
        password_hash: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null,
            validate: {
                notEmpty: true
            }
        },
        is_verified_account: {
            type: Sequelize.BIGINT,
            values: ['1', '0'],
            defaultValue: '0'
        },
        approved: {
            type: Sequelize.BIGINT,
            values: ['1', '0'],
            defaultValue: '0'
        },
        reset_password_token: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        reset_password_expires: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        otp: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        otp_expires: {
            type: Sequelize.BIGINT,
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: "users",
        underscored: true,
    });

    Model.prototype.toJSON = function (options) {
        let attributes = Object.assign({}, this.get());
        delete attributes.otp;
        delete attributes.otp_expires;
        delete attributes.reset_password_token;
        delete attributes.reset_password_expires;
        delete attributes.password_hash;
        delete attributes.created_at;
        delete attributes.updated_at;
        return attributes;
    };

    Model.prototype.generateOtp = function () {
        this.otp = Math.floor(100000 + Math.random() * 900000);
        this.otp_expires = Date.now() + 60 * 1000;
    }

    Model.prototype.generatePasswordToken = function () {
        this.reset_password_token = strings.generateRandomString(constants.keys_length.reset_password_token, constants.char_set);
        this.reset_password_expires = Date.now() + 60 * 1000;
    }

    Model.prototype.hashPassword = function () {
        if (this.password_hash) {
            this.password_hash = crypto.createHash("sha1").update(this.password_hash).digest("hex");
        }
    };

    Model.prototype.validatePassword = function (password_hash) {
        password_hash = String(password_hash).trim();
        let passwordHash = crypto.createHash("sha1").update(password_hash).digest("hex");
        let hashedPassword = String(this.password_hash).trim();
        return (passwordHash === hashedPassword);
    };

    return Model;
};
