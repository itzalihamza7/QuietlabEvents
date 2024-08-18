'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('events', {
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
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('events');
    }
};
