/*******************************************************/
// Importing Npm Module.
/*******************************************************/
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');
const pushNotificationService =0;
// const pushNotificationService = require('../src/modules/cronjobs/services/push_notifications');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Optional: Add more Firebase configuration options if needed
});
/*******************************************************/
// Implementing Push Notification.
/*******************************************************/

// this will send the push to a user or a topic for some specific token
const sendIndividual = (user_id, user_token, push_data) => {
    try {
        if (user_id && user_token) {


            createPushBody(user_token, push_data).then(message => {

                admin.messaging().send(message).then(async (response) => {

                    // Find the index of "message/" in the string
                    const startIndex = response.indexOf("message/");
                    let result_id = null;
                    if (startIndex !== -1) {
                        // Extract the value after "message/"
                        result_id = response.substring(startIndex + "message/".length);
                    }
                    let mPushData = { user_id, result_id, title: push_data.title, message: push_data.body, campain_type: push_data.campain_type };
                    let result = await pushNotificationService.requestLogPushes(mPushData)
                    console.log('result:', result);
                    console.log('campaign :', push_data.campain_type);
                    console.log('Successfully sent message:', response);

                    // return result;
                    return response;
                }).catch((error) => {
                    console.error('Error sending message:', error);
                    return error;
                });
            }).catch(error => {
                console.error(error); // Output: Error: Operation failed
                return next(error);
            });


        } else {
            return ("user_id/user_token required.")
        }

    } catch (error) {
        return (error);

    }

}
const createPushBody = async function (user_token, push_data) {
    return new Promise(async (resolve, reject) => {
        try {
            switch (push_data.platform) {
                case "android":

                    resolve({ //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                        token: user_token,
                        // collapse_key: 'your_collapse_key',

                        notification: {
                            title: push_data?.title ? push_data.title : 'ReckDeck',
                            body: push_data?.body ? push_data.body : 'Welcome to ReckDeck.'
                        },

                        data: {  //you can send only notification or only data(or include both)
                            type: push_data.type,
                            category: push_data.category
                        },
                        android: {
                            notification: {
                                channel_id: push_data.channel_id // Use the same channel ID here
                            }
                        },
                    });

                    break;

                case "ios":


                    resolve({
                        "token": "your_ios_device_token",
                        "apns": {
                            "payload": {
                                "aps": {
                                    "alert": {
                                        "title": "Notification Title",
                                        "body": "Notification Body"
                                    }
                                }
                            }
                        }
                    })



                    break;

                case "web":

                    resolve({
                        "token": "your_web_device_token",
                        "webpush": {
                            "notification": {
                                "title": "Notification Title",
                                "body": "Notification Body",
                                "icon": "icon_url.png",
                                "click_action": "https://your-website.com"
                            }
                        }
                    })


                    break;
            }

        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    sendIndividual
}