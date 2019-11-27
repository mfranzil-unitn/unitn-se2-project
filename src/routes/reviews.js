const { Router } = require('express');

const ReviewService = require('@app/services/reviews');

const route = Router();

module.exports = async function(routes) {
  routes.use('/review', route);

  route.post('/', async (req, res, next) => {

    try {
      await ReviewService.write(req.query);
      res.status(200).json();
    } catch (e) {
      const error = new Error('Wrong line info: ' + e.message);
      error.httpStatusCode = 400;
      next(error);
    }

  });
};
