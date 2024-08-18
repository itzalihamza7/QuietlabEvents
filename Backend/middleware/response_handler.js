const multer = require("multer");
const responseH = require("./../utils/response");
const Exception = require("./../utils/exceptions");
const custom_exceptions = require("./../utils/custom_exceptions.json");
const sequelize = require('./../db/sequelize/sequelize');

const uc_words = str => String(str).trim().toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase());
const setField = field => String(field || "").trim().replace(/_/g, " ");
const setErrorMessage = error => {
    if (error && error["validatorKey"]) {
        let key = String(error["validatorKey"]);
        let path = uc_words(setField(error.path));
        let value = String(error["value"]);
        switch (key) {
            case "min":
                return `Please enter positive integer value for ${path}`;
            case "isIn":
                return `Please enter valid value for ${path}`;
            case "isInt":
                return `Please enter valid integer value for ${path}`;
            case "isDate":
                return `Please enter valid date for ${path}`;
            case "notNull":
                return `${path} is required, and cannot be empty`;
            case "isEmail":
                return `Please enter valid email address for ${path}`;
            case "isUnique":
                return `${path} '${value}' is already taken`;
            case "notEmpty":
                return `${path} cannot be empty`;
            default:
                return error.message;
        }
    }
    return error.message;
};

module.exports = async function (data, req, res, next) {
    
    console.log('I was here response handler', data )


    let console_error = true;
    let response = new responseH();
    let language = req?.body?.appUser?.language || "en";

    if (typeof data === 'number' && !isNaN(data)) {
        response.setError(data, Exception(language, data), data);
        console_error = false;
    } else if (data && data.errors && Array.isArray(data.errors)) {
        let error = data.errors[0];
        response.setError(error, Exception(language, 422), 422);
        response.message = setErrorMessage(error);
    } else if (data && data.message) {
        if (data.message.includes("ValidationError")) {
            response.setError(data, Exception(language, 422), 422);
        } else if (data.message.includes("DatabaseError")) {
            response.setError(data, Exception(language, 400), 400);
        } else if (data.message.includes("InstanceError")) {
            response.setError(data, Exception(language, 400), 400);
        } else if (data.message.includes("MulterError")) {
            response.setError(data, Exception(language, 411), 411);
        } else {
            response.setError(data.message, Exception(language, 500), 500);
        }
    } else if (data instanceof TypeError) {
        let message = custom_exceptions[language]?.[data.message] || data.message;
        let code = custom_exceptions.codes?.[data.message] || 412;
        response.setError(code, message, code);
    } else if (data instanceof Error) {
        response.setError(data.message, Exception(language, 500), 500);
    } else {
        response.setSuccess(data, Exception(language, req.statusCode), req.statusCode);
        console_error = false;
    }

    if (response.status === "error" && console_error) {
        console.log(data);
    }

    response.sendRes(req, res);
    if (res) return next();
};
