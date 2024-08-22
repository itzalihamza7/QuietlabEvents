const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Events = sequelize.define("events", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        store_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'stores',
                key: 'id'
            }
        },
        offer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        offer_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        offer_template: {
            type: DataTypes.STRING,
            allowNull: false
        },
        visited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        purchased: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        purchase_value: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        upsell: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        upsell_value: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        order_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        line_items: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "events",
        underscored: true
    });

    return Events;
};
