const { check } = require('express-validator');
const constants = require("../../../../config/constants.json");

const ValidationRules = {};

ValidationRules.rule = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                check('name').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('email').notEmpty().withMessage("required").isEmail().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('password').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ min: 8, max: 100 }).withMessage('Length Limit exceeded'),            ];
        }
        case 'deleteUser': {
            return [
                check('password').notEmpty().withMessage('required').isString().trim().withMessage("invalid_value").isLength({ max: 100 }).withMessage('Length Limit exceeded'),
            ];
        }
        case 'getUser': {
            return [
                check('id').notEmpty().withMessage('required').isInt().withMessage('invalid_id'),
            ];
        }
        case 'updateUser': {
            return [
                check('name').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('email').optional().isEmail().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('password').optional().isString().trim().withMessage("invalid_value").isLength({ min: 8, max: 100 }).withMessage('Length Limit exceeded'),
                check('role').optional().isIn(['admin', 'user']).withMessage("invalid_role"),
                check('is_verified_account').optional().isIn(['1', '0']).withMessage("invalid_value"),
                check('approved').optional().isIn(['1', '0']).withMessage("invalid_value"),
            ];
        }
        case 'login': {
            return [
                check('email').notEmpty().withMessage("required").isEmail().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('password').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ min: 8, max: 100 }).withMessage('Length Limit exceeded'),
            ];
        }
        case 'forgotPassword': {
            return check('email').notEmpty().withMessage('required').isEmail().withMessage('invalid_email');
        }
        case 'resetPassword': {
            return [
                check('password').notEmpty().trim().withMessage('required'),
                check('reset_password_token').notEmpty().trim().withMessage('required')
            ];
        }
        case 'updatePassword': {
            return [
                check('password').notEmpty().trim().withMessage('required'),
                check('password_old').notEmpty().trim().withMessage('required')
            ];
        }
        case 'verifyEmail': {
            return [
                check('verify_link').notEmpty().trim().withMessage('required')
            ];
        }
        case 'generateAccessToken': {
            return [
                check('refresh_token').notEmpty().trim().withMessage('required')
            ];
        }
    }
};

module.exports = ValidationRules;
