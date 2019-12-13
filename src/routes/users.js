const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function (routes) {
    routes.use('/users', route);

    route.get('/', async (req, res, next) => {
        let query = req.query;

        if (!!query.user_id) {
            if (query.user_id.includes(",")) {
                try {
                    query = query.user_id.split(",");
                } catch (error) {
                    query = [];
                }
            } else {
                query = query.user_id;
            }
        }

        try {
            const users = await UserService.find(query);
            res.status(200).json(users);
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Failed to retrieve users: ' + e.message);
            next(error);
        }
    });
};

