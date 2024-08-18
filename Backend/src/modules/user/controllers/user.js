const crypto = require("../../../../utils/crypto");
const keys_length = require("../../../../config/config.json").keys_length;
const base_encoder = require('../../../../utils/base_encoder');
const { generateRandomString } = require("../../../../utils/strings");
const customException = require("../../../../utils/custom_exceptions.json");
const configJSON = require("../../../../config/config.json");
const constants = require("../../../../config/constants.json");
const Pagination = require("../../../../helpers/pagination");
const common = require('../../../../helpers/common');
const moment = require('moment');
const fs = require("fs");
const sequelize = require('../../../../db/sequelize/sequelize');
const instSrvcuser = require("../services/user");

const filter_ids = function (ids) {
    ids = String(ids).trim().toLowerCase();
    ids = ids.split(' ').join('').split(',');
    if (ids && ids.length > 0) {
        ids = ids.map((n) => { return (!isNaN(n)) ? parseInt(n) : 0; });
        ids = ids.filter(function (e, p) { return e > 0 && ids.indexOf(e) === p; });
        ids.sort();
    }
    return ids;
};



// Create User
const createUser = async function (req, res, next) {
    try {
        let { name, email, phone, password, address, dob, gender, language } = req.body;

        // Check if user already exists
        let [isUserExist, u_err] = await instSrvcuser.getUserWithEmail(email);
        if (u_err) return next(u_err); // Handle error and stop execution

        if (isUserExist) {
            let err = new TypeError(`email_already_exist`);
            console.log("Error", err);
            return next(err); // Stop execution and pass error to next middleware
        }

        const is_verified_account = "0";
        const mCreateUser = { name, email, phone, password_hash: password, address, dob, gender, is_verified_account, language };

        // Create user
        let [userIs, c_err] = await instSrvcuser.requestCreateUser(mCreateUser);
        if (c_err) return next(c_err); // Handle error and stop execution

        // Send success response
        return res.status(201).json(userIs);
    } catch (error) {
        return res.next(error);
    }
};


// Get User by ID
const getUserById = async function (req, res, next) {
    try {
        console.log("userId", req.appUser);
        const userId = req.body.id;

        let [user, err] = await instSrvcuser.getUserWithId(userId);
        if (err) return next(err);

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

// Update User
const updateUser = async function (req, res, next) {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        let [updatedUser, err] = await instSrvcuser.requestUpdateUser(userId, updateData);
        if (err) return next(err);

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
};

// Delete User
const deleteUser = async function (req, res, next) {
    try {
        const userId = req.params.id;

        let [deletedUser, err] = await instSrvcuser.requestDeleteUser(userId);
        if (err) return next(err);

        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

// User Login
const login = async function (req, res, next) {
    try {
        let { email, password, language } = req.body;

        // Check user exists
        let [isValidUser, err] = await instSrvcuser.getUserWithEmail(email);
        if (err) return next(err);
        if (!isValidUser) return res.status(404).json({ message: "User not found" });

        // Validate password
        if (!isValidUser.validatePassword(password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check approval status for non-admin roles
        if (isValidUser.role_id !== '1' && isValidUser.approved === '0') {
            return res.status(403).json({ message: "User not approved" });
        }

        // Generate authorization token
        let [authorization, aError] = await instSrvcuser.generateAuthorization(isValidUser.id, req);
        if (aError) return next(aError);

        const access_token = authorization.access_token;
        const refresh_token = authorization.refresh_token;

        let response = {
            user: isValidUser,
            access_token,
            refresh_token
        };

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};


const logout = async function (req, res, next) {

    const authorizationHeader = req.authorization.access_token;
    try {
    const authorization = await sequelize.models.authorizations.findOne({
        where: { access_token: authorizationHeader }
    });

    if (!authorization) {
        return res.status(404).json({ message: "Authorization token not found" });
    }

    await authorization.destroy();

    return res.status(200).json({ message: "Logout successful" });
} catch (error) {
    return next(error); // Handle the error appropriately
}
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login,
    logout
};
