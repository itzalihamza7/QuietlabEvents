
const sequelize = require('../../../../db/sequelize/sequelize');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const Pagination = require('../../../../helpers/pagination');
const { request } = require('../../../../app');

/* DB Instances */


/**
 * 
 * @param {*} data contains user data which will ne inserted in db
 * @returns inserted record
 */
const requestCreateUser = async (data) => {
    try {
        let userInstance = new sequelize.db(sequelize.models.users);

        return await userInstance.create(data);
    }
    catch (error) { return (error); }
}





/**
 * 
 * @param {*} email to find in db
 * @returns user if record exist else null
 */
const getUserWithEmail = async (email) => {
    try {
        let userInstance = new sequelize.db(sequelize.models.users);

        return await userInstance.findOne({
            where: { email: email }
        });
    } catch (error) { return (error); }
}



/**
 * 
 * @param {*} id to find in db 
 * @returns user if record exist else null
 */
const getUserWithId = async (user_id) => {
    try {
        let userInstance = new sequelize.db(sequelize.models.users);

        return await userInstance.findOne({
            where: { id: user_id }
        });

    } catch (error) { return (error); }
}

const requestDeleteUser = async (user_id) => {
    try {
        let userInstance = new sequelize.db(sequelize.models.users);

        return await userInstance.destroy({
            where: { id: user_id }
        });
    } catch (error) { return (error); }
}


const requestUpdateUser = async (user_id, data) => {
    try {
        let userInstance = new sequelize.db(sequelize.models.users);

        return await userInstance.update(data, {
            where: { id: user_id }
        });
    } catch (error) { return (error); }
}

const generateAuthorization = async (user_id) => {
    try {
        let authorizationInstance = new sequelize.db(sequelize.models.authorizations);

        return await authorizationInstance.create({
            user_id: user_id,
            access_token: "access_token",
            refresh_token: "refresh_token",
            expires_at: new Date()
        });
    } catch (error) { return (error); }
}
    

module.exports = {
    requestCreateUser,
    getUserWithEmail,
    generateAuthorization,
    requestUpdateUser,
    requestDeleteUser,
    getUserWithId
}