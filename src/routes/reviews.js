const { Router } = require('express');

const ReviewService = require('@app/services/reviews');

const route = Router();

module.exports = async function (routes) {
    routes.use('/review', route);

    route.get('/*', async (req, res, next) => {
        try {
          let result;
          if (req.path === '/') {
            result = await ReviewService.getAll();
          } else {
            result = await ReviewService.read(req.path.replace('/', ''));
            if (!result) {
              throw Error('Invalid id');
            }
          }
          res.status(200).json(result);
        } catch (e) {
            let error = new Error('Error while returning the review: ' + e.message);
          if (e.constructor === ReviewService.MissingReviewError) {
            error.status = 404;
          } else {
            error.status = 400;
          }
          next(error);
        }
    });

    route.post('/', async (req, res, next) => {
        try {
            let result = await ReviewService.write(req.query);
            res.status(201).json('Added review with id: ' + result);
        } catch (e) {
          let error = new Error('Error while getting Review: ' + e.message);
          next(error);
        }

    });
};
