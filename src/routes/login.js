const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function (routes) {
    routes.use('/login', route);

    route.post('/', async (req, res, next) => {
        try {
            await UserService.authenticate(req.query);
            res.status(200).json();
        } catch (e) {
            const error = new Error('Failed to login: ' + e.message);
            error.httpStatusCode = 400;
            next(error);
        }

    });
};
