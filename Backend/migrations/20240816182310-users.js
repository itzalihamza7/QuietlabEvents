'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      image: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          notEmpty: true,
        },
      },
      is_verified_account: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '0',
      },
      approved: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '0',
      },
      reset_password_token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      reset_password_expires: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      otp_expires: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('users');
  },
};
