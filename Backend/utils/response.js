// const server_config = require("./../config/server");
var config = require('../config/config.json')

//--//
module.exports = class {
    constructor() {
        this.status = null;
        this.statusCode = null;
        this.message = null;
        this.data = null;
        this.error = null;
    };
    setSuccess(data, message, statusCode) {
        this.status = "success";
        this.statusCode = statusCode || 200;
        this.message = message || "OK";
        this.data = data;
        this.error = null;
        // console.log('success', this);
        return this;
    };
    setError(error, message, statusCode) {
        this.status = "error";
        this.statusCode = statusCode || 500;
        this.message = message || "Error";
        this.data = {};
        this.error = error;
        return this;
    };
    sendRes(req, res) {
        let result = {
            status: this.status,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            error: this.error,
            // UID: req.UID
        };
        // console.log(result);
        if (req.statusMessage && req.statusMessage !== "") { result.message = req.statusMessage; }
       
        // console.log('before', this);
        return res.status(this.statusCode).json(result);
    }
};
