const { check } = require('express-validator');
const constants = require("../../../../config/constants.json");

const ValidationRules = {};

ValidationRules.rule = (method) => {
    switch (method) {
        case 'createEvent': {
            return [
              check('store_id').notEmpty().withMessage("required").isInt().withMessage("invalid_value"),
              check('offer_name').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
              check('offer_url').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
              check('offer_template').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('visited').optional().isBoolean().withMessage("invalid_value"),
                check('purchased').optional().isBoolean().withMessage("invalid_value"),
                check('purchase_value').optional().isFloat().withMessage("invalid_value"),
                check('upsell').optional().isBoolean().withMessage("invalid_value"),
                check('upsell_value').optional().isFloat().withMessage("invalid_value"),
                check('order_id').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('line_items').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('user_id').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
            ];
        }
        case 'createStore': {
            return [
                check('name').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('country').notEmpty().withMessage("required").isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
            ];
        }

        case 'calculateMetrics': {
            return [
            check('store_id').notEmpty().withMessage("required"),
            check('start_date').notEmpty().withMessage("required").isDate().withMessage("invalid_value"),
            check('end_date').notEmpty().withMessage("required").isDate().withMessage("invalid_value"),
            ];
        }

        case 'updateEvent': {
            return [
                check('store_id').optional().isInt().withMessage("invalid_value"),
                check('offer_name').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('offer_url').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('offer_template').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('visited').optional().isBoolean().withMessage("invalid_value"),
                check('purchased').optional().isBoolean().withMessage("invalid_value"),
                check('purchase_value').optional().isFloat().withMessage("invalid_value"),
                check('upsell').optional().isBoolean().withMessage("invalid_value"),
                check('upsell_value').optional().isFloat().withMessage("invalid_value"),
                check('order_id').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('line_items').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
                check('user_id').optional().isString().trim().withMessage("invalid_value").isLength({ max: 255 }).withMessage('Length Limit exceeded'),
            ];
        }
    }
};

module.exports = ValidationRules;
