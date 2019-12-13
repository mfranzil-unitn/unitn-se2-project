const { Router } = require('express');

const UserService = require('@app/services/users');
const HTTPError = require('@app/utils').HTTPError;

const route = Router();

module.exports = async function (routes) {
    routes.use('/signup', route);

    route.post('/', async (req, res, next) => {
        try {
            await UserService.create(req.query);
            res.status(201).json();
            UserService.increaseInteractions(req.query.logged_user_id);
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Failed to create new user: ' + e.message);
            next(error);
        }
    });
};

