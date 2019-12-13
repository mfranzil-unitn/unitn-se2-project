const { Router } = require('express');

const PlaceLineService = require('@app/services/lines');

const route = Router();

module.exports = async function (routes) {
    routes.use('/lines', route);

    route.post('/', async (req, res, next) => {
        try {
            let result = await PlaceLineService.place(req.query);
            res.status(201).json('Added review with id: ' + result);
        } catch (e) {
            const error = new Error('Wrong line info: ' + e.message);
            console.log(e);
            error.status = e.code;
            next(error);
        }
    });

    route.get('/*', async (req, res, next) => {
        let result;

        if (req.path === "/") {
            try {
                result = await PlaceLineService.getAll(req.query);
                res.status(200).json(result);
            } catch (e) {
                const error = new Error('Error while getting Lines: ' + e.message);
                if (e.constructor === PlaceLineService.MissingLineError) {
                    error.status = e.code;
                } else {
                    error.status = e.code;
                }
                next(error);
            }
        }
        else {
            try {
                result = await PlaceLineService.get(req.path.replace('/', ''));
                res.status(200).json(result);
            } catch (e) {
                const error = new Error('Error while getting Line: ' + e.message);
                if (e.constructor === PlaceLineService.MissingLineError) {
                    error.status = e.code;
                } else {
                    error.status = e.code;
                }
                next(error);
            }
        }
    });
};
