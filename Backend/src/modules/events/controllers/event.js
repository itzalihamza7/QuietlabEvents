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
const instSrvcuser = require("../services/event");
const { Op, fn, col, literal } = require('sequelize');
const { query } = require("express");

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



// Create Store
const createStore = async (req, res, next) => {
    try {

        const { name, country } = req.body;

        // Create the store
        const store = await sequelize.models.stores.create({
            name,
            country
        });

        // Send success response
        return res.status(201).json(store);
    } catch (error) {
        // Handle errors
        return next(error);
    }
};


const createEvent = async (req, res, next) => {
    try {
        const { store_id, offer_name, offer_url, offer_template, visited, purchased, purchase_value, upsell, upsell_value, order_id, line_items, user_id } = req.body;

        // Check if store exists
        const store = await sequelize.models.stores.findByPk(store_id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // Check if an event with the same order_id already exists
        const existingEvent = await sequelize.models.events.findOne({
            where: { order_id }
        });

        if (existingEvent) {
            return res.status(400).json({ message: 'An event with this Order ID already exists' });
        }

        // Create the event
        const event = await sequelize.models.events.create({
            store_id,
            offer_name,
            offer_url,
            offer_template,
            visited: visited || false,
            purchased: purchased || false,
            purchase_value: purchase_value || 0.0,
            upsell: upsell || false,
            upsell_value: upsell_value || 0.0,
            order_id,
            line_items,
            user_id
        });

        // Send success response
        return res.status(201).json(event);
    } catch (error) {
        // Handle errors
        return next(error);
    }
};


const calculateMetrics = async (req, res, next) => {
    try {
        let { store_id, offer_url, offer_template, start_date, end_date } = req.query;

        // Validate required parameters
        if (!store_id) {
            return res.status(400).json({ message: 'Store ID is required' });
        }

        if (!start_date || !end_date) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        // Add time component to start_date and end_date
        start_date = new Date(start_date);
        start_date.setHours(0, 0, 0, 0); // Set time to 00:00:00

        end_date = new Date(end_date);
        end_date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

        // Define filters
        const whereClause = {
            store_id: store_id,
            createdAt: {
                [Op.between]: [start_date, end_date]
            }
        };

        if (offer_url) {
            whereClause.offer_url = offer_url;
        }

        if (offer_template) {
            whereClause.offer_template = offer_template;
        }

        // Calculate metrics
        const metrics = await sequelize.models.events.findAll({
            attributes: [
                'offer_url',
                'offer_template',
                [fn('SUM', literal('CASE WHEN visited = true THEN 1 ELSE 0 END')), 'totalVisits'],
                [fn('SUM', literal('CASE WHEN purchased = true THEN 1 ELSE 0 END')), 'totalPurchases'],
                [fn('SUM', literal('CASE WHEN upsell = true THEN 1 ELSE 0 END')), 'totalUpsell'],
                [fn('SUM', literal('COALESCE(purchase_value, 0)')), 'totalPurchaseValue'],
                [fn('SUM', literal('COALESCE(upsell_value, 0)')), 'totalUpsellValue'],
                [fn('SUM', literal('COALESCE(purchase_value, 0) + COALESCE(upsell_value, 0)')), 'totalValue'],
                [fn('AVG', literal('CASE WHEN purchased = true THEN COALESCE(purchase_value, 0) ELSE NULL END')), 'averageOrderValue'], 
            ],
            where: whereClause,
            group: ['offer_url', 'offer_template'],
            order: [['offer_url', 'ASC'], ['offer_template', 'ASC']]
        });

        // Post-process to calculate conversion rate and average order value
        const processedMetrics = metrics.map(metric => {
            const totalPurchases = metric.get('totalPurchases') || 0;
            const totalVisits = metric.get('totalVisits') || 0;
            const totalValue = metric.get('totalValue') || 0;

            return {
                ...metric.get(),
                averageOrderValue: totalPurchases ? (totalValue / totalPurchases) : 0,
                conversionRate: totalVisits ? (totalPurchases / totalVisits) : 0
            };
        });

        // Send response
        return res.status(200).json(processedMetrics);
    } catch (error) {
        return next(error);
    }
};

const getAllStores = async (req, res, next) => {
    try {
        // Fetch all stores from the database
        const stores = await sequelize.models.stores.findAll({
            attributes: ['id', 'name', 'country'],
            order: [['name', 'ASC']] // Optional: Sort by store name in ascending order
        });

        // Send success response
        return res.status(200).json(stores);
    } catch (error) {
        // Handle errors
        return next(error);
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const { order_id } = req.query; 
        const updates = req.body; 

        // Validate that order_id is provided
        if (!order_id) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        // Find the event with the specified order_id
        const event = await sequelize.models.events.findOne({
            where: { order_id }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Update the event with new values
        const updatedEvent = await event.update(updates);

        // Send success response
        return res.status(200).json(updatedEvent);
    } catch (error) {
        // Handle errors
        return next(error);
    }
};

    

module.exports = {
    createEvent,
    createStore,
    calculateMetrics,
    getAllStores,
    updateEvent
};

