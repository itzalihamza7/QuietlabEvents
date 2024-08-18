const express = require("express");
const user = require("../controllers/user");
const userRules = require('../validations/intro')
const Validation = require('../validations/validation')

//--//
let routes = function () {
    let routes = express.Router({ mergeParams: true });
    //--//
    routes.route("/createUser").post(userRules.rule('createUser'), Validation.validate, user.createUser);
    routes.route("/login").post(userRules.rule('login'), Validation.validate, user.login);
    routes.route("/getUser").get(userRules.rule('getUser'), Validation.validate, user.getUserById);
    routes.route("/deleteUser").delete(userRules.rule('deleteUser'), Validation.validate, user.deleteUser);
    routes.route("/updateUser").put(userRules.rule('updateUser'), Validation.validate, user.updateUser);
    routes.route("/logout").delete(user.logout);
    
    return routes;
};
//--//
module.exports = routes;
