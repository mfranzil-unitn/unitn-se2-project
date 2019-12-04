const { Router } = require('express');

const ReviewService = require('@app/services/reviews');

const route = Router();

module.exports = async function (routes) {
    routes.use('/review', route);

    route.get('/*', async (req, res, next) => {
        try {
          let result;
          if (req.path === "/") {
            result = await ReviewService.read(req.query);
          }
          else {
            result = await ReviewService.read('/', '');
          }
          res.status(200).json(result);
        } catch (e) {
            const error = new Error('Error while returning the review: ' + e.message);
            error.httpStatusCode = 400;
            next(error);
        }
    });

    route.post('/', async (req, res, next) => {
        try {
            const result = await ReviewService.write(req.query);
            res.status(201).json('Added review with id: ' + result);
        } catch (e) {
            const error = new Error('Wrong review info: ' + e.message);
            error.httpStatusCode = 400;
            next(error);
        }

    });
};
