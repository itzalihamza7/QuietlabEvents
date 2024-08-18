'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authorizations', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      access_token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true,
        },
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true,
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authorizations');
  },
};
