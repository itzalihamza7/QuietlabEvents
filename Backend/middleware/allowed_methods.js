const allowed_methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];

module.exports = function(req, res, next) {
    req.statusMessage = null;
    req.req_start_time = new Date().toISOString();
    const method = String(req.method).trim().toUpperCase();

    // If the method is OPTIONS, allow it by default
    if (method === "OPTIONS") {
        return next(200);
    }
    
    // If the method is in the allowed_methods list, proceed
    if (allowed_methods.includes(method)) {
        return next();
    }

    // If the method is not allowed, respond with 405 Method Not Allowed
    return next(405);
};