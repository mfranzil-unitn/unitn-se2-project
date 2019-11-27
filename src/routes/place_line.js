const { Router } = require('express');

const PlaceLineService = require('@app/services/place_line');

const route = Router();

module.exports = async function(routes) {
  routes.use('/line', route);

  route.post('/', async (req, res, next) => {

    try {
        await PlaceLineService.place(req.query);
        res.status(200).json();
    } catch (e) {
        const error = new Error('Wrong line info: ' + e.message);
        error.httpStatusCode = 400;
        next(error);
    }

  });
};
