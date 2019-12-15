const { Router } = require('express');

const PlaceLineService = require('@app/services/lines');
const UserService = require('@app/services/users');
const { HTTPError } = require('@app/errors');

const route = Router();

module.exports = async function (routes) {
    routes.use('/lines', route);

    route.post('/', async (req, res, next) => {
        try {
            let result = await PlaceLineService.place(req.query);
            await UserService.increaseInteractions(req.query.logged_user_id);
            res.status(201).json(result);
        } catch (e) {
            const error = new Error('Wrong line info: ' + e.message);
            error.status = e.code || 500;
            next(error);
        }
    });

    route.get('/*', async (req, res, next) => {
        let result;

        if (req.path === "/") {
            try {
                result = await PlaceLineService.getAll(req.query);
                await UserService.increaseInteractions(req.query.logged_user_id);
                res.status(200).json(result);
            } catch (e) {
                const error = new Error( 'Error while getting Lines: ' + e.message);
                error.status = e.code || 500;
                next(error);
            }
        }
        else {
            try {
                result = await PlaceLineService.get(req.path.replace('/', ''));
                await UserService.increaseInteractions(req.query.logged_user_id);
                res.status(200).json(result);
            } catch (e) {
                const error = new Error('Error while getting Line: ' + e.message);
                error.status = e.code || 500;
                next(error);
            }
        }
    });
};

