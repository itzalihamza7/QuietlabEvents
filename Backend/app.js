const cors = require("cors");
const http = require('http');
const morgan = require("morgan");
const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer')();
const fs = require('fs');
const listEndpoints = require('express-list-endpoints');

require('dotenv').config();

const allowed_methods = require('./middleware/allowed_methods');
const not_found = require('./middleware/not_found.js');
const request_parser = require('./middleware/request_parser.js');
const request_getters = require('./middleware/request_getters.js');
const response_handler = require('./middleware/response_handler.js');
const common = require('./helpers/common');

//--//
//expose all module services classes here so that we don't need to create multiple instances in different controllers
const instSrvcuser = require('./src/modules/user/services/user.js');

// Expose the service class globally
global.srvcuser = instSrvcuser;
//--//


//------------------------------------//
const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.options("*", cors({ optionsSuccessStatus: 200 }));
//------------------------------------//
app.use(express.json({ limit: "50mb" }));
// Middleware to parse form data
app.use(multer.none());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//------------------------------------//
app.use("/uploads", express.static(__dirname + "/uploads"));
//------------------------------------//
// Run Templet Engine
// app.set('view engine', 'ejs');
//------------------------------------//
const console_stamp = require("console-stamp");
console_stamp(console, {
    pattern: "YYYY-MM-DD HH:mm:ss",
    formatter: function () { return moment().format("YYYY-MM-DD HH:mm:ss"); }
});
app.use(allowed_methods);

console.log(listEndpoints(app));

//------------------------------------//
morgan.token("date", function () {
    return moment().format("YYYY-MM-DD HH:mm:ss");
});
morgan.token("status", function (req, res) {
    const status = (typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent) ? res.statusCode : undefined;
    const color = status >= 500 ? 31 : status >= 400 ? 33 : status >= 300 ? 36 : status >= 200 ? 32 : 0;
    return `\x1b[${color}m${status}\x1b[0m`;
});
app.use(morgan("[:date] [:method] :url :status :res[content-length] - :response-time ms"));
//------------------------------------//

app.use(request_getters);
app.use(require("./middleware/authorization"));
app.use(request_parser);
//------------------------------------//

app.use("/api/", require("./src/modules/events/app")());
app.use("/api/", require("./src/modules/user/app")());
//------------------------------------//
app.use(not_found);
app.use(response_handler);

//------------------------------------//
const os = require("os");
//------------------------------------//
const sequelize = require('./db/sequelize/sequelize');
// const consumers = require("./helpers/topics_consumer");

console.log("Server host", os.hostname());
console.log("database host", sequelize.connection.config.host);
sequelize.connection.authenticate().then(function () {
    console.log("DB Connection Successful");
    const server = http.createServer(app);
    server.timeout = 200 * 1000; //set for 3 mins and 10 sec 

    server.listen(process.env.PORT, async function (error) {
        // register service on api-gateway
        // common.webhook(constants.services_base_urls[process.env.NODE_ENV].api_gateway + `${constants.api_gateway_service.register_service}`, { serviceRoutes: userRoutes, serviceName: 'users', host: constants.services_base_urls[process.env.NODE_ENV].users, port: 3001 }, { 'content-type': 'application/json' })

        if (error) { console.log("Server is not listening...", error); }
        else {
            console.log("Server is listening on HOST", os.hostname(), "on PORT", process.env.PORT);
            console.log(`Current server timeout: ${server.timeout} ms`);
        }
    });

}).catch(function (error) { console.log("Unable to connect to database", error); });
//------------------------------------//
module.exports = app;
