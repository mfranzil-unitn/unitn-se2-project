const { Router } = require('express');

const UserService = require('@app/services/users');
const HTTPError = require('@app/utils').HTTPError;

const route = Router();

module.exports = async function (routes) {
    routes.use('/signup', route);

    route.post('/', async (req, res, next) => {
        try {
            await UserService.create(req.query);
            await UserService.increaseInteractions(req.query.user_id);
            res.status(201).json();
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Failed to create new user: ' + e.message);
            next(error);
        }
    });
};

