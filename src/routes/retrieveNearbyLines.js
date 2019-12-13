const { Router } = require('express');

const RetrieveService = require('@app/services/retrieveNearbyLines');
const HTTPError = require('@app/utils').HTTPError;

const route = Router();

module.exports = async function (routes) {
    routes.use('/retrieve', route);

    route.get('/', async (req, res, next) => {
        try {
            const result = await RetrieveService.retrieve(req.query);
            res.status(200).json(result);
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Wrong retrieving info: ' + e.message);
            next(error);
        }
    });
};

