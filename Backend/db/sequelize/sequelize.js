const event = require("../schemas/events");
const store = require("../schemas/stores");
let { config, sequelize, connection } = require("./connection");
//--//
let models = {
    users: (require("./../schemas/users"))(connection, sequelize),
    authorizations: (require("../schemas/authorizations"))(connection, sequelize),
    stores: (require("../schemas/stores"))(connection, sequelize),
    events: (require("../schemas/events"))(connection, sequelize)
};
//--//
(require("./hooks"))(models);
(require("./scopes"))(models);
(require("./associations"))(models);
//--//
let instance = require("./instance");
module.exports = {
    config,
    sequelize,
    connection,
    models,
    db: instance
};
