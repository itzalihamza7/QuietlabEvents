const express = require("express");
const event = require("../controllers/event");
const eventRules = require('../validations/intro')
const Validation = require('../validations/validation')

//--//
let routes = function () {
    let routes = express.Router({ mergeParams: true });


    routes.route("/createStore").post(eventRules.rule('createStore'), Validation.validate, event.createStore);
    routes.route("/createEvent").post(eventRules.rule('createEvent'), Validation.validate, event.createEvent);
    routes.route("/calculateMetrics").get(eventRules.rule('calculateMetrics'), Validation.validate, event.calculateMetrics);
    routes.route("/getAllStores").get(event.getAllStores);
    routes.route("/updateEvent").put(eventRules.rule('updateEvent'), Validation.validate, event.updateEvent);
   

    return routes;
};
//--//
module.exports = routes;
