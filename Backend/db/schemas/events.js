const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const Events = sequelize.define("events", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        store_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'stores',
                key: 'id'
            }
        },
        offer_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        offer_url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        offer_template: {
            type: Sequelize.STRING,
            allowNull: false
        },
        visited: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        purchased: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        purchase_value: {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        upsell: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        upsell_value: {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        }
    }, {
        tableName: "events",
        underscored: true
    });

    return Events;
};
