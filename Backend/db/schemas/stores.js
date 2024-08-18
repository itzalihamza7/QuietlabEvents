const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const Stores = sequelize.define("stores", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: "stores",
        underscored: true
    });

    return Stores;
};
