const express = require("express");
//--//
let routes = function () {
    let router = express();
    // let handler = function (req, res, next) {
    //     req.portalID = req.portalID || "commonPortal";
    //     return next();
    // };
    // router.use(handler);
    router.use("/", require("./routes/user")());
    return router;
};
//--//
module.exports = routes;
