const jwt = require('jsonwebtoken');

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

module.exports = {
    isAuth,
    LoginError
}