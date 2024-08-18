//--//
const common = require('./../../helpers/common')
const configJSON = require('./../../config/config.json')

//--//
const toLowerCase = function (str) {
    return String(str).toLowerCase();
};
const webhook = async function (data) {
    // divide url into parts and than concat
    // let url = configJSON.services_base_urls[`${process.env.NODE_ENV}`].api_gateway + configJSON.api_gateway_service.eventual_consistency;
    // let headers = { 'content-type': 'application/json' }
    // common.webhook(url, data, headers)
    let url = configJSON.webHook.eventualConsistency[`${process.env.NODE_ENV}`].TopicArn
    common.pushToQueueWebHook(url, data)
};

//--//
module.exports = function (db) {
    //--//
    db.users.addHook("beforeSave", function (instance) {
        instance.email = toLowerCase(instance.email);
    });
    db.users.addHook("beforeCreate", function (instance) {
        if (instance.changed("password_hash")) {
            instance.hashPassword();
        }
    });

    db.authorizations.addHook("beforeCreate", function (instance) {
        instance.generateAccessToken();
        instance.generatePasswordToken();
    });
    db.users.addHook("beforeUpdate", function (instance) {
        if (instance.changed("password_hash")) {
            instance.hashPassword();
         }
    });

};
