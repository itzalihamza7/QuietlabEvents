'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('events', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
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
            },
            order_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            line_items: {
                type: Sequelize.STRING, // Change to Sequelize.JSONB if supported
                allowNull: true
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        }, {
            tableName: 'events',
            underscored: true
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('events');
    }
};
