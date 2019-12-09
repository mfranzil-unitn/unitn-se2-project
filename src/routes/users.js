const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function (routes) {
    routes.use('/users', route);

    route.get('/', async (req, res, next) => {
        let query = req.query;
        console.log(query);

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
        console.log(query);

        try {
            const users = await UserService.find(query);
            res.status(200).json(users);
        } catch (e) {
            const error = new Error('Failed to retrieve users: ' + e.message);
            error.httpStatusCode = 400;
            next(error);
        }
    });
};
