const { Router } = require('express');

const RetrieveService = require('@app/services/retrieve_nearby_lines');

const route = Router();

module.exports = async function(routes) {
    routes.use('/retrieve', route);
  
    route.post('/', async (req, res, next) => {
  
      try {
          await RetrieveService.place(req.query);
          res.status(200).json();
      } catch (e) {
          const error = new Error('Wrong retrieving info: ' + e.message);
          error.httpStatusCode = 400;
          next(error);
      }
    });
  };