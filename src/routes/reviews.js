const { Router } = require('express');

const ReviewService = require('@app/services/reviews');

const route = Router();

module.exports = async function (routes) {
    routes.use('/review', route);

    route.get('/*', async (req, res, next) => {
        try {
          let result;
          if (req.path === "/") {
            let param = req.query;
            if (!param.review_id) {
              throw Error('review_id parameter required.');
            }
            result = await ReviewService.read(param.review_id);
          }
          else {
            console.log(req.path.replace('/', ''));
            result = await ReviewService.read(req.path.replace('/', ''));
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
            let result = await ReviewService.write(req.query);
            res.status(201).json('Added review with id: ' + result);
        } catch (e) {
            const error = new Error('Wrong review info: ' + e.message);
            error.httpStatusCode = 400;
            next(error);
        }

    });
};
