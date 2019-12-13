const jwt = require('jsonwebtoken');
const Logger = require('@app/loaders/logger');

class LoginError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, LoginError)
    }
}

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
        throw new LoginError("Wrong authorization token");
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
                const error = new Error('Please Login first');
                error.status = 401;
                next(error);
            } else {
                Logger.info("Logged with UserID: " + authNmae);
                req.query.logged_user_id = authName;
            }
        }
        catch (e) {
            const error = new Error(e.message);

            // If LoginError -> expired or wrong token
            if (e.constructor === LoginError) {
                error.status = 403;
            }
            next(error);
        }
        next();
    });
};