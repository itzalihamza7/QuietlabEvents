const sequelize = require('./../db/sequelize/sequelize');
const keys_length = require("./../config/constants.json").keys_length;
const base_encoder = require('./../utils/base_encoder');
const config = require('../config/constants.json');
const common = require('./../helpers/common');

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = String(req.get("authorization", "")).trim();

        // Check if route exists
        const ifRouteExist = common.checkRouteExist(req.originalUrl);

        // Route does not exist
        if (!ifRouteExist) {
            req.statusMessage = `This route doesn't exist: ${req.originalUrl}`;
            return res.status(404).json({ error: req.statusMessage });
        }

        // Route requires authentication
        if (ifRouteExist.auth_required === '1') {
          


            const authorization = await sequelize.models.authorizations.findOne({
                where: { access_token: authorizationHeader }
            });

            if (!authorization) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            
            req.appUser = authorization.user_id;
            req.authorization = authorization;


            next();

        } else if (ifRouteExist.auth_required === '0') {
            req.appUser = null;
            req.authorization = null;
            return next();
        }



        // If route exists and does not need authentication, proceed
       
    } catch (error) {
        // Forward any errors to the global error handler
        return next(error);
    }
};
