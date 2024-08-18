const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const config = require('./../../config/config.json');
require('dotenv').config();

let connection = null;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: '127.0.0.1', // IP address without the port
    port: 3306, // Port number specified separately
    dialect: 'mysql', // Specify the dialect
    // Other Sequelize options...
});


// Apply timezone to DATE data type
Sequelize.DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format("YYYY-MM-DD HH:mm:ss");
};

if (!connection) {
    connection = sequelize;
}

module.exports = {
    config,
    sequelize,
    connection
};
