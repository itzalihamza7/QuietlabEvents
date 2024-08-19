let axios = require('axios')
var nodemailer = require('nodemailer');
const aws = require("@aws-sdk/client-ses");
const instSrvcuser = global.srvcuser;
const constants = require('../config/constants.json');

const fs = require("fs");

const internalRequest = async function (url, data, headers) {
    try {
        const response = await axios.post(url, data, { headers: headers });
        if (!response.data.data)
            return next(404);
        return response.data.data
    }
    catch (error) { return (error); }
}

// trigger event to do some update
const webhook = function (url, data, headers) {
    try {
        console.log("url is :", url);
        axios.post(url, data, { headers: headers }).then(result => {
            // console.log('got response');
        });
    }
    catch (error) { console.log(error); }
}


// set req language
const languageSet = async function (req, res, next) {
    try {
        req.language = req.body.USER_AUTH?.language ? req.body.USER_AUTH.language : 'en';
        next()
    }
    catch (error) { return next(error) }
}


const transporter = nodemailer.createTransport({
    service: 'gmail', // For Gmail; change this to your email provider
    auth: {
        user: 'alihamzaali44@gmail.com', // Your email address
        pass: 'nwim aqtm vfky exas' // Your email password or application-specific password
    }
});


const sendEmailNodeMailer = async function (subject, debug, email_extras) {
    try {
        let options = {
            to: email_extras.email,
            subject: subject,
            text: email_extras.body,
            from: 'alihamzaali44@gmail.com'
        };
        if (debug && debug === true) {
            console.log("Mail Options", {
                to: options.to,
                from: options.from,
                subject: options.subject
            });
        }

        let userId = email_extras.user_id;
        let type = email_extras.type;
        let email = email_extras.email;
        let body = email_extras.body;
        let message = email_extras.message;
        // let isEmailBlacklist = email_extras.is_email_blacklist;
        // let response = "User is not authorized to receive any promotional emails";
        let sent_status = "failed";

        transporter.sendMail(options, async function (error, success) {
            if (error) {
                response = JSON.stringify(error);
                if (debug && debug === true) {
                    console.log("error is:", error);
                }
                console.log(error);

                // create log of email atempt
                const mSendEmail = { user_id: userId, email: email, message: message, body: body, response: response, status: sent_status, type: type };
                const [sendEmail, e_err] = await instSrvcuser.requestlogSentEmail(mSendEmail);
                if (e_err) { console.log(e_err); return next(e_err) }
                return (sendEmail);
            }
            else {
                response = JSON.stringify(success);
                sent_status = "sent";
                if (debug && debug === true) {
                    console.log(success);
                }

                // create log of email atempt
                const mSendEmail = { user_id: userId, email: email, message: message, body: body, response: response, status: sent_status, type: type };
                const [sendEmail, e_err] = await instSrvcuser.requestlogSentEmail(mSendEmail);
                if (e_err) { console.log(e_err); return next(e_err) }
                return (sendEmail);

            }



        });
    }
    catch (error) { return (error) }
}
// const functionCodeList = require('../utils/function_code_list.json');

// check route exist
const checkRouteExist = function (key) {
    // Load the JSON file
    const filePath = 'utils/function_code_list.json'; 
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const functionCodeList = JSON.parse(jsonData);
    // console.log("functionCodeList :", functionCodeList);
    const url = new URL(key, 'http://example.com'); // Use a dummy base URL
    const cleanPath = url.pathname;
    // Check if the key exists in the JSON object
    for (const obj of functionCodeList) {
        if (obj.route_path === cleanPath) {
          return obj;
        }
      }
      // If no match is found, return null or handle as needed
      return null;
}
module.exports = { internalRequest, webhook, languageSet, sendEmailNodeMailer, checkRouteExist }
