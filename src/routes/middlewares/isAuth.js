const jwt = require('jsonwebtoken');
const Logger = require('@app/loaders/logger');
const HTTPError = require('@app/utils').HTTPError;

// Auth using cookies
const isAuth = req => {
    // Get the cookies from the request
    const token = req.cookies.token;
    // If token not defined, you are not logged yet
    if (!token) {
        return undefined;
    }
    let payload;
    try {
        // Check if token is correct
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (e) {
        // If not correct, it might be corrupted / expired
        throw new HTTPError("Wrong authorization token", 422);
    }
    return payload.username;
}

// Middleware to handle user login
module.exports = async function (routes) {
    routes.use(async (req, res, next) => {
        try {
            const authName = isAuth(req);

            // If there are no token you are not logged
            if (authName == undefined) {
                const error = new HTTPError(401, 'Please Login first');
                next(error);
            } else {
                Logger.info("Logged with UserID: " + authName);
                req.query.logged_user_id = authName;
            }
        } catch (e) {
            const error = new Error(e.message);
            // If LoginError -> expired or wrong token
            error.status = e.code || 500;
            next(error);
        }
        next();
    });
};

