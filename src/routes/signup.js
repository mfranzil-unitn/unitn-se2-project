const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function (routes) {
    routes.use('/signup', route);

    route.post('/', async (req, res, next) => {
        try {
            await UserService.create(req.query);
            res.status(201).json();
        } catch (e) {
            const error = new Error('Failed to create new user: ' + e.message);
            error.status = 400;
            next(error);
        }
    });
};
