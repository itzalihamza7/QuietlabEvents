"use strict";
let CryptoJS = require("node-cryptojs-aes").CryptoJS;
var crypto = require('crypto')
//--//
function md5(input) {
    return CryptoJS.MD5(input).toString();
    //console.log("password ", password);
    //return password;
}
function encrypt(input, password) {
    try {
        return CryptoJS.AES.encrypt(input, password).toString().trim() || "{}";
        //console.log("encrypted", encrypted);
        //return encrypted;
    }
    catch (e) { return "{}"; }
}
function decrypt(input, password) {
    try {
        return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(input, password)).toString().trim() || "";
        //console.log("decrypted", decrypted);
        //return decrypted;
    }
    catch (e) { return "{}"; }
}

function randomBytes(length) {
    try {
        return crypto.randomBytes(length).toString('hex');
    }
    catch (e) { return "{}"; }
}

//--//
module.exports = {
    encrypt,
    decrypt,
    randomBytes
};
